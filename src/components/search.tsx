"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  barber: z.string().trim().min(1, { message: "Digite algo para buscar." }),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barber: "",
    },
  });
  const route = useRouter();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    route.push(`/barbershop?barber=${data.barber}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="barber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Buscar barbeiro ou serviço" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
