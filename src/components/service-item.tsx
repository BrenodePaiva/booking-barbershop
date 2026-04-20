"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
  add,
  addMinutes,
  format,
  isBefore,
  isToday,
  isWithinInterval,
  set,
} from "date-fns";
import { toast } from "sonner";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import { useRouter } from "next/navigation";
import {
  barberAvailabilityTable,
  barberBlocksTable,
  barberShopServiceTable,
  barberTable,
  bookingTable,
  userTable,
} from "@/db/schema";

import { authClient } from "@/lib/auth-client";
import { getBookingsByDate } from "@/actions/booking/get-bookings-by-date";
import { useAction } from "next-safe-action/hooks";
import { createBooking } from "@/actions/booking/create-booking";
import { Calendar } from "./ui/calendar";
import BookingSummary from "./booking-summary";
import { formatCentsToBRL } from "@/app/helpers/money";
import { Spinner } from "./ui/spinner";

type Availability = typeof barberAvailabilityTable.$inferSelect;
type Blocks = typeof barberBlocksTable.$inferSelect;
interface ServiceItemProps {
  barber: typeof barberTable.$inferSelect & {
    user: typeof userTable.$inferSelect;
    availability: Availability[];
    blocks: Blocks;
  };
  service: typeof barberShopServiceTable.$inferSelect;
  isService: boolean;
}

type Booking = typeof bookingTable.$inferSelect;
interface GetTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
  availability: Availability[];
  blocks: Blocks;
}

const generateAvailableTimes = (
  selectedDay: Date,
  availability: Availability[],
  blocks: Blocks,
  bookings: Booking[],
  intervalMinutes = 30,
) => {
  const dayOfWeek = selectedDay.getDay();
  const daySlots = availability.filter((a) => a.dayOfWeek == dayOfWeek);
  if (daySlots.length == 0) return [];

  const times: string[] = [];
  for (const slot of daySlots) {
    if (!slot.start || !slot.end) continue;

    const [startHour, startMinute] = slot.start.split(":").map(Number);
    const [endHour, endMinute] = slot.end.split(":").map(Number);

    let current = set(selectedDay, { hours: startHour, minutes: startMinute });
    const end = set(selectedDay, { hours: endHour, minutes: endMinute });

    while (isBefore(current, end)) {
      const hasBooking = bookings.some(
        (b) =>
          b.date.getHours() === current.getHours() &&
          b.date.getMinutes() === current.getMinutes(),
      );

      const isBlocked = isWithinInterval(current, {
        start: blocks?.start,
        end: blocks?.end,
      });

      if (!hasBooking && !isBlocked) {
        times.push(format(current, "HH:mm"));
      }

      current = addMinutes(current, intervalMinutes);
    }
  }

  return times;
};

const getTimeList = ({
  bookings,
  selectedDay,
  availability,
  blocks,
}: GetTimeListProps) => {
  const timeList = generateAvailableTimes(
    selectedDay,
    availability,
    blocks,
    bookings,
  );

  return timeList.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const now = new Date();
    const limit = add(now, { hours: 1 });

    const targetTime = set(selectedDay, {
      hours: hour,
      minutes,
      seconds: 0,
      milliseconds: 0,
    });

    if (isToday(selectedDay) && isBefore(targetTime, limit)) {
      return false;
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    );

    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ barber, service, isService }: ServiceItemProps) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  useEffect(() => {
    const feach = async () => {
      if (!selectedDay) return;
      const booking = await getBookingsByDate({
        date: selectedDay,
      });
      setDayBookings(booking);
    };
    feach();
  }, [selectedDay]);

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return;

    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    });
  }, [selectedDay, selectedTime]);

  const handleBookingClick = () => {
    if (session?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setSignInDialogIsOpen(true);
  };

  const handleBookingSheetOpenChange = () => {
    setBookingSheetIsOpen(false);
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/bookings");
  };

  const { execute: executeCreateBooking } = useAction(createBooking, {
    onSuccess: () => {
      toast.success("Reserva criada com sucesso.", {
        action: {
          label: "Ver agendamentos",
          onClick: handleClick,
        },
      });
    },
    onError: () => {
      toast.error("Erro ao criar reserva.");
    },
  });

  const handleCreateBooking = async () => {
    if (!selectedDate) return;

    executeCreateBooking({
      serviceId: service.id,
      barberId: barber.id,
      date: selectedDate,
    });
    handleBookingSheetOpenChange();
  };

  let timeListe: Array<string>;
  if (!selectedDay) {
    timeListe = [];
  } else {
    timeListe = getTimeList({
      bookings: dayBookings,
      selectedDay,
      availability: barber.availability,
      blocks: barber.blocks,
    });
  }

  return (
    <>
      <Card className="max-w-[443px] py-3 lg:items-stretch">
        <CardContent className="flex flex-1 items-center gap-3 px-3">
          <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              alt={isService ? service.name : barber.user.name}
              src={
                isService
                  ? `${service.imageUrl ?? ""}?t=${service.updatedAt.getTime()}`
                  : `${barber.imageUrl ?? ""}?t=${barber.updatedAt.getTime()}`
              }
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div>
            <h3 className="mb-1.5 font-semibold">
              {isService ? service.name : barber.user.name}
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">
                {isService ? service.description : barber.bio}
              </p>

              <div className="mt-2 flex items-center gap-5">
                {isService && (
                  <p className="text-primary text-sm font-bold">
                    {formatCentsToBRL(service.priceCents)}
                  </p>
                )}

                <Button
                  size="sm"
                  onClick={handleBookingClick}
                  variant="outline"
                >
                  Resevar
                </Button>

                {loading && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Spinner className="size-12 text-white" />
                  </div>
                )}
              </div>
            </div>
            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col items-center border-b border-solid pb-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDaySelect}
                    disabled={{ before: new Date() }}
                    className="w-full capitalize"
                  />
                </div>
                {selectedDay && (
                  <div>
                    <div className="scrollbar-vintage flex gap-3 overflow-x-auto px-5 pb-1">
                      {timeListe.length > 0 ? (
                        timeListe.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div className="border-t border-solid p-5">
                    <BookingSummary
                      service={service}
                      barber={{ name: barber.user.name }}
                      selectedDate={selectedDate}
                    />
                  </div>
                )}
                <SheetFooter>
                  <Button
                    type="submit"
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime}
                  >
                    Confirmar
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent>
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
