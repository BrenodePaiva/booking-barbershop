import z from "zod";

export const upsertBarbershopServiceSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "O nome do serviço é obrigatório"),
  priceCents: z
    .number("O preço não pode ser vazio")
    .min(0.01, "O preço do serviço deve ser maior que zero"),
  isRecommended: z.boolean(),
  imageUrl: z
    .instanceof(File)
    .refine((f) => f.size <= 5 * 1024 * 1024, "A imagem deve ser menor que 5MB")
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
});

export type UpsertBarbershopServiceSchema = z.infer<
  typeof upsertBarbershopServiceSchema
>;
