import z from "zod";

export const updateBookingStatusSchema = z
  .object({
    id: z.uuid(),
    status: z.enum(["Pendente", "Confirmado", "Cancelado", "Concluído"]),
    cancelReason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status == "Cancelado" && !data.cancelReason) {
      ctx.addIssue({
        path: ["cancelReason"],
        code: "custom",
        message: "Precisa ter um motivo",
      });
    }
  });

export type UpdateBookingStatusSchema = z.infer<
  typeof updateBookingStatusSchema
>;
