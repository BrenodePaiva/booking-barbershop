import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  upsertBarbershopServiceSchema,
  UpsertBarbershopServiceSchema,
} from "@/actions/barbeshop-service/upsert-service/schema";
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
import { NumericFormat } from "react-number-format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { upsertBarbershopService } from "@/actions/barbeshop-service/upsert-service";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServiceUpsertContentProps {
  defaultValues?: UpsertBarbershopServiceSchema;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const ServiceUpsertContent = ({
  defaultValues,
  setDialogOpen,
}: ServiceUpsertContentProps) => {
  const form = useForm<UpsertBarbershopServiceSchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      upsertBarbershopServiceSchema,
    ) as unknown as Resolver<UpsertBarbershopServiceSchema>,
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          priceCents: defaultValues.priceCents / 100,
          imageUrl: null,
        }
      : {
          id: "",
          name: "",
          isRecommended: false,
          description: "",
          imageUrl: null,
        },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...defaultValues,
        priceCents: defaultValues.priceCents / 100,
        imageUrl: null,
      });
    }
  }, [defaultValues, form]);

  const { execute: executeUpsertService, status } = useAction(
    upsertBarbershopService,
    {
      onSuccess: (result) => {
        if (result?.data) {
          toast.error(result.data?.message);
          return;
        }
        toast.success(
          `Serviço ${defaultValues ? "Atualizado" : "Criado"} com sucesso`,
        );

        setDialogOpen(false);
      },
      onError: () => {
        toast.error("Ocorreu um Erro na comunicação com o servidor.");
      },
    },
  );

  const onSubmit = (data: UpsertBarbershopServiceSchema) => {
    executeUpsertService({ ...data, id: defaultValues?.id });
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
              {defaultValues ? "Editar" : "Criar"} Serviço
              <DialogDescription>
                Preencha as informações do serviço
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do serviço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="R$ 00,00"
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(value) => field.onChange(value.floatValue)}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRecommended"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-6">
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                      <Checkbox
                        id="recomend"
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium capitalize">
                          Recomenda esse serviço
                        </p>
                      </div>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descrição do serviço..."
                    {...field}
                    value={field.value ?? ""}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
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

export default ServiceUpsertContent;
