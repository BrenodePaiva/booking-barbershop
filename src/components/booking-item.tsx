"use client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";

import { Dialog, DialogClose, DialogContent, DialogFooter } from "./ui/dialog";

import { useState } from "react";
import BookingSummary from "./booking-summary";
import {
  barberShopServiceTable,
  barberTable,
  bookingTable,
  userTable,
} from "@/db/schema";
import { getBadgeVariant } from "@/app/helpers/get-badge-variant";

interface BookingItemProps {
  booking: typeof bookingTable.$inferSelect & {
    service: typeof barberShopServiceTable.$inferSelect;
    barber: typeof barberTable.$inferSelect & {
      user: typeof userTable.$inferSelect;
    };
  };
  width?: string;
}

const BookingItem = ({ booking, width = "min-w-full" }: BookingItemProps) => {
  const [isSheepOpen, setIsSheetOpen] = useState(false);

  const { barber, service } = booking;

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };
  return (
    <Sheet open={isSheepOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className={`${width}`}>
        <Card className="w-full p-0">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge variant={getBadgeVariant(booking.status)}>
                {booking.status}
              </Badge>
              <h3>Serviço: {service.name}</h3>

              {barber.imageUrl && (
                <div className="flex flex-col items-start">
                  <h2 className="text-sm text-gray-400">Barbeiro: </h2>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={barber.imageUrl} />
                    </Avatar>
                    <p className="text-sm">{barber.user.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-3 w-full rounded-xl py-3">
            {barber.imageUrl && (
              <CardContent className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={barber.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barber.user.name}</h3>
                  <p className="text-xs">Endereço da Barbearia</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="mt-6 px-5">
          <Badge variant={getBadgeVariant(booking.status)}>
            {booking.status}
          </Badge>

          {booking.status === "Cancelado" && (
            <div className="mt-4 flex items-center gap-3">
              <h2 className="text-sm text-gray-400">Motivo</h2>
              <p className="text-justify text-sm hyphens-auto">
                {booking.cancelReason}
              </p>
            </div>
          )}

          <div className="mt-3 mb-6">
            <BookingSummary
              service={booking.service}
              barber={{ name: barber.user.name }}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            <PhoneItem phone="78665658976" />
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full flex-1">
                Voltar
              </Button>
            </SheetClose>

            <Dialog>
              <DialogContent>
                <DialogFooter className="flex flex-row items-center gap-3">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full flex-1">
                      Voltar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
