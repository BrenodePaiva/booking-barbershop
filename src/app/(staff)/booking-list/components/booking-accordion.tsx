"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { barberShopServiceTable, bookingTable, userTable } from "@/db/schema";
import { format } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { updateBookingStatus } from "@/actions/booking/update-booking-status.ts";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import BookingCancelDialogContent from "./booking-cancel-dialog-content";
import { formatCentsToBRL } from "@/app/helpers/money";

type BookingWithRelations = typeof bookingTable.$inferSelect & {
  user: typeof userTable.$inferSelect;
  service: typeof barberShopServiceTable.$inferSelect;
};

type BookingStatus = "Pendente" | "Confirmado" | "Cancelado" | "Concluído";

interface BookingAccordionProps {
  bookings: BookingWithRelations[];
}

const BookingAccordion = ({ bookings }: BookingAccordionProps) => {
  const grouped = {
    Pendente: bookings.filter((b) => b.status === "Pendente"),
    Confirmado: bookings.filter((b) => b.status === "Confirmado"),
    Cancelado: bookings.filter((b) => b.status === "Cancelado"),
    Concluído: bookings.filter((b) => b.status === "Concluído"),
  };

  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithRelations | null>(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const { execute: executeUpdateBookingStatus } = useAction(
    updateBookingStatus,
    {
      onSuccess: () => {
        toast.success("Status atualizado");
      },
      onError: () => {
        toast.error("Ocorreu um erro inesperado");
      },
    },
  );

  const onSubmitStatus = (bookingId: string, status: BookingStatus) => {
    executeUpdateBookingStatus({ id: bookingId, status });
  };

  const handleCancelClick = (booking: BookingWithRelations) => {
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  return (
    <Accordion type="single" collapsible className="block w-full">
      {Object.entries(grouped).map(([status, items]) => (
        <AccordionItem
          key={status}
          value={status}
          disabled={items.length === 0}
        >
          <AccordionTrigger>{status}</AccordionTrigger>
          <AccordionContent>
            {items.map((booking) => (
              <Card key={booking.id} className="mb-3">
                <CardHeader>
                  <p>Horário: {format(booking.date, "dd/MM/yyyy HH:mm")}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium">Cliente: {booking.user.name}</p>
                  <p className="text-muted-foreground text-sm">
                    Serviço: {booking.service.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Preço: {formatCentsToBRL(booking.service.priceCents)}
                  </p>
                  {status === "Cancelado" && (
                    <p className="font-medium">
                      Motivo: {booking.cancelReason}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  {status === "Pendente" && (
                    <>
                      <Button
                        onClick={() => onSubmitStatus(booking.id, "Confirmado")}
                      >
                        Confirmar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelClick(booking)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {status === "Confirmado" && (
                    <>
                      <Button
                        onClick={() => onSubmitStatus(booking.id, "Concluído")}
                      >
                        Concluir
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleCancelClick(booking)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
      <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        {selectedBooking && (
          <BookingCancelDialogContent
            defaultValues={{
              id: selectedBooking.id,
              status: "Cancelado",
              cancelReason: "",
            }}
            setOpenDialog={setOpenCancelDialog}
          />
        )}
      </Dialog>
    </Accordion>
  );
};

export default BookingAccordion;
