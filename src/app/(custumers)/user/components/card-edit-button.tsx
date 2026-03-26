"use client";
import { updateUser } from "@/actions/barber/upsert-barber";
import {
  UpdateUserSchema,
  updateUserSchema,
} from "@/actions/barber/upsert-barber/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CardEditButtonProps {
  defaultValues: UpdateUserSchema;
}

const CardEditButton = ({ defaultValues }: CardEditButtonProps) => {
  const form = useForm<UpdateUserSchema>({
    shouldUnregister: true,
    resolver: zodResolver(
      updateUserSchema,
    ) as unknown as Resolver<UpdateUserSchema>,
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
  const [openDialog, setOpenDialog] = useState(false);

  const { execute: executeUpdateUser, status } = useAction(updateUser, {
    onSuccess: () => {
      toast.success("Perfil atualizado");

      setOpenDialog(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar o perfil");
    },
  });

  const onSubmitForm = async (data: UpdateUserSchema) => {
    // executeUpdateUser({ ...data, id: defaultValues.id });
    await executeUpdateUser({
      ...data,
      id: defaultValues.id,
    });
    // console.log(data);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button className="w-full" asChild>
        <DialogTrigger>Editar</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmitForm)}
          >
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
    </Dialog>
  );
};

export default CardEditButton;
