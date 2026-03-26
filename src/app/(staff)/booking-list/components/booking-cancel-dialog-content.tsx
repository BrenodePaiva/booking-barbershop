import { updateBookingStatus } from "@/actions/booking/update-booking-status.ts";
import {
  updateBookingStatusSchema,
  UpdateBookingStatusSchema,
} from "@/actions/booking/update-booking-status.ts/schema";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookingCancelDialogContentProps {
  defaultValues: UpdateBookingStatusSchema;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const BookingCancelDialogContent = ({
  defaultValues,
  setOpenDialog,
}: BookingCancelDialogContentProps) => {
  const form = useForm<UpdateBookingStatusSchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      updateBookingStatusSchema,
    ) as unknown as Resolver<UpdateBookingStatusSchema>,
    defaultValues,
  });

  const { execute: executeUpdateBookingStatus, status } = useAction(
    updateBookingStatus,
    {
      onSuccess: () => {
        toast.success("Status atualizado");
        setOpenDialog(false);
      },
      onError: () => {
        toast.error("Ocorreu um erro inesperado");
      },
    },
  );

  const onSubmit = (data: UpdateBookingStatusSchema) => {
    executeUpdateBookingStatus(data);
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>
              Cancelar Agendamento
              <DialogDescription>Motivo para o cancelamento</DialogDescription>
            </DialogTitle>
          </DialogHeader>

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} hidden disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} hidden disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cancelReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva o motivo..."
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={status === "executing"}>
              {status === "executing" && (
                <Loader2Icon className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default BookingCancelDialogContent;
