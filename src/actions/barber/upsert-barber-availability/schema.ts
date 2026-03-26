import z from "zod";

const availabilityItemSchema = z
  .object({
    dayOfWeek: z.number().min(0).max(6),
    slotType: z.enum(["morning", "afternoon"]),
    start: z.string().optional().nullable(),
    end: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.start && data.end) {
        return data.start < data.end;
      }
      return true;
    },
    {
      message: "Horário de início deve ser menor que o horário de fim",
      path: ["end"],
    },
  );

export const upsertBarberAvailabilitySchema = z.object({
  barberId: z.uuid(),
  availability: z.array(availabilityItemSchema),
});

export type UpsertBarberAvailabilitySchema = z.infer<
  typeof upsertBarberAvailabilitySchema
>;
