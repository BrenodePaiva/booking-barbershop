import { z } from "zod";

export const createBookingSchema = z.object({
  barberId: z.string(),
  serviceId: z.string(),
  date: z.date(),
});

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
