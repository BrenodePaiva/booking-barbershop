import z from "zod";

export const upsertBarberBlockSchema = z.object({
  barberId: z.uuid(),
  rangeStart: z.date(), // ou z.string().datetime() se vier como ISO
  rangeEnd: z.date(),
  reason: z.string(),
});

export type UpsertBarberBlocksSchema = z.infer<typeof upsertBarberBlockSchema>;

const dataRangeSchema = z.object(
  {
    from: z.date(),
    to: z.date(),
  },
  "Selecione pelo menos um dia",
);

export const formBarberBlocksSchema = z.object({
  barberId: z.uuid(),
  range: dataRangeSchema,
  startTime: z.string().min(1, "A hora do início é obrigatório"), // HH:mm
  endTime: z.string().min(1, "A hora do fim é obrigatório"), // HH:mm
  reason: z.string().min(1, "O motivo é obrigatório"),
});

export type FormBarberBlocksSchema = z.infer<typeof formBarberBlocksSchema>;
