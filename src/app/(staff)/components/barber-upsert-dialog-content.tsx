"use client";
import { upsertBarber } from "@/actions/barber/upsert-barber";
import {
  upsertBarberSchema,
  UpsertBarberSchema,
} from "@/actions/barber/upsert-barber/schema";
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
import { Dispatch, SetStateAction, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserUpdateDialogContentProps {
  defaultValues: UpsertBarberSchema;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  addRole?: () => void;
}

const BarberUpsertDialogContent = ({
  defaultValues,
  setOpenDialog,
  addRole,
}: UserUpdateDialogContentProps) => {
  const form = useForm<UpsertBarberSchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      upsertBarberSchema,
    ) as unknown as Resolver<UpsertBarberSchema>,
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...defaultValues,
        imageUrl: undefined,
      });
    }
  }, [defaultValues, form]);

  const { execute: executeUpsertBarber, status } = useAction(upsertBarber, {
    onSuccess: () => {
      setOpenDialog(false);
      addRole?.();
      toast.success("Perfil atualizado");
    },
    onError: () => {
      toast.error("Erro ao atualizar o perfil");
    },
  });

  const onSubmitForm = (data: UpsertBarberSchema) => {
    executeUpsertBarber({
      ...data,
      id: defaultValues.id,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil do Barbeiro</DialogTitle>
        <DialogDescription>Preencha as informações abaixo</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmitForm)}>
          <FormField
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bio do barbeiro..."
                    {...field}
                    value={field.value ?? ""}
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

export default BarberUpsertDialogContent;
