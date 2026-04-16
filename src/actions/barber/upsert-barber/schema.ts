import z from "zod";

export const upsertBarberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Você não pode deixar sem nome"),
  bio: z.string().nullable().optional(),
  imageUrl: z
    .instanceof(File)
    .refine((f) => f.size <= 5 * 1024 * 1024, "A imagem deve ser menor que 5MB")
    .optional(),
});

export type UpsertBarberSchema = z.infer<typeof upsertBarberSchema>;
