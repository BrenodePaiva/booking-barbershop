import z, { uuid } from "zod";

export const deleteServiceSchema = z.object({
  id: uuid(),
});

export type DeleteServiceSchema = z.infer<typeof deleteServiceSchema>;
