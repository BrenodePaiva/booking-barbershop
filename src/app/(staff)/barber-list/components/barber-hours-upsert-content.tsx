import { upsertBarberAvailability } from "@/actions/barber/upsert-barber-availability";
import {
  upsertBarberAvailabilitySchema,
  UpsertBarberAvailabilitySchema,
} from "@/actions/barber/upsert-barber-availability/schema";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BarberHoursUpsertContentProps {
  defaultValues?: UpsertBarberAvailabilitySchema;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const BarberHoursUpsertContent = ({
  defaultValues,
  setDialogOpen,
}: BarberHoursUpsertContentProps) => {
  const form = useForm<UpsertBarberAvailabilitySchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      upsertBarberAvailabilitySchema,
    ) as unknown as Resolver<UpsertBarberAvailabilitySchema>,
    defaultValues:
      defaultValues?.availability.length == 0
        ? {
            barberId: defaultValues.barberId,
            availability: [
              // Segunda-feira
              { dayOfWeek: 1, slotType: "morning", start: "", end: "" }, // antes do almoço
              { dayOfWeek: 1, slotType: "afternoon", start: "", end: "" }, // depois do almoço

              // Terça-feira
              { dayOfWeek: 2, slotType: "morning", start: "", end: "" },
              { dayOfWeek: 2, slotType: "afternoon", start: "", end: "" },

              // Quarta-feira
              { dayOfWeek: 3, slotType: "morning", start: "", end: "" },
              { dayOfWeek: 3, slotType: "afternoon", start: "", end: "" },

              // Quinta-feira
              { dayOfWeek: 4, slotType: "morning", start: "", end: "" },
              { dayOfWeek: 4, slotType: "afternoon", start: "", end: "" },

              // Sexta-feira
              { dayOfWeek: 5, slotType: "morning", start: "", end: "" },
              { dayOfWeek: 5, slotType: "afternoon", start: "", end: "" },

              // Sábado (opcional, pode deixar vazio se não trabalhar)
              { dayOfWeek: 6, slotType: "morning", start: "", end: "" },
              { dayOfWeek: 6, slotType: "afternoon", start: "", end: "" },
            ],
          }
        : defaultValues,
  });

  useEffect(() => {
    if (defaultValues?.availability.length !== 0) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const { execute: executeUpsertBarberAvailability, status } = useAction(
    upsertBarberAvailability,
    {
      onSuccess: () => {
        setDialogOpen(false);
        toast.success(`Horário(s) atualizados com sucesso`);
      },
      onError: () => {
        toast.error("Ocorreu um erro. Tente novamente mais tarde");
      },
    },
  );

  const onSubmit = (data: UpsertBarberAvailabilitySchema) => {
    executeUpsertBarberAvailability(data);
  };

  return (
    <DialogContent className="h-full overflow-y-scroll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>Disponibilidade</DialogTitle>
            <DialogDescription>
              Preencha as informações do horário
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

          {[1, 2, 3, 4, 5, 6].map((day, index) => (
            <div key={day} className="flex flex-col gap-4">
              <h3 className="font-bold">
                {
                  [
                    "",
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                  ][day]
                }
              </h3>

              <FormField
                control={form.control}
                name={`availability.${index * 2}.dayOfWeek`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} hidden disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availability.${index * 2}.slotType`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} hidden disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <span className="w-20 pt-3.5">Manhã</span>
                <FormField
                  control={form.control}
                  name={`availability.${index * 2}.start`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Início</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`availability.${index * 2}.end`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fim</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`availability.${index * 2 + 1}.dayOfWeek`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} hidden disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availability.${index * 2 + 1}.slotType`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} hidden disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <span className="w-20 pt-3.5">Tarde</span>
                <FormField
                  control={form.control}
                  name={`availability.${index * 2 + 1}.start`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Início</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`availability.${index * 2 + 1}.end`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fim</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

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

export default BarberHoursUpsertContent;
