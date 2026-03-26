import { upsertBarberBlock } from "@/actions/barber/upsert-barber-block";
import {
  formBarberBlocksSchema,
  FormBarberBlocksSchema,
} from "@/actions/barber/upsert-barber-block/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BarberBlocksUpsertContentProps {
  defaultValues?: FormBarberBlocksSchema;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const BarberBlocksUpsertContent = ({
  defaultValues,
  setDialogOpen,
}: BarberBlocksUpsertContentProps) => {
  const form = useForm<FormBarberBlocksSchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      formBarberBlocksSchema,
    ) as unknown as Resolver<FormBarberBlocksSchema>,
    defaultValues:
      defaultValues?.range == undefined
        ? {
            barberId: defaultValues?.barberId,
            range: undefined,
            startTime: "",
            endTime: "",
            reason: "",
          }
        : {
            ...defaultValues,
          },
  });

  useEffect(() => {
    if (defaultValues?.range !== undefined) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const { execute: executeUpsertBarberBlock, status } = useAction(
    upsertBarberBlock,
    {
      onSuccess: () => {
        toast.success(`Horário(s) atualizados com sucesso`);
        setDialogOpen(false);
      },
      onError: () => {
        toast.error("Ocorreu um erro. Tente novamente mais tarde");
      },
    },
  );

  const onSubmit = async (data: FormBarberBlocksSchema) => {
    const startDate = new Date(data.range.from);
    const [startHour, startMinute] = data.startTime.split(":");
    startDate.setHours(Number(startHour), Number(startMinute));

    const endDate = new Date(data.range.to);
    const [endHour, endMinute] = data.endTime.split(":");
    endDate.setHours(Number(endHour), Number(endMinute));

    executeUpsertBarberBlock({
      barberId: data.barberId,
      rangeStart: startDate,
      rangeEnd: endDate,
      reason: data.reason,
    });
  };

  return (
    <DialogContent className="h-full overflow-y-scroll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>Bloquear Barbeiro</DialogTitle>
            <DialogDescription>
              Preencha as informações do bloqueio
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="barberId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} hidden disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seleção do range de datas */}
          <Card className="mx-auto w-fit">
            <CardContent>
              <FormField
                control={form.control}
                name="range"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="p-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora início</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora fim</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo do bloqueio</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex.: Férias" />
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

            <Button type="submit" disabled={status == "executing"}>
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

export default BarberBlocksUpsertContent;
