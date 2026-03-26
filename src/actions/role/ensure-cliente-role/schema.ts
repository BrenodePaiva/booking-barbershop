import z from "zod";

export const ensureClienteRoleSchema = z.object({
  userId: z.string(),
});

export type EnsureClienteRoleSchema = z.infer<typeof ensureClienteRoleSchema>;
