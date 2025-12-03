import { z } from "zod";

export const addUserRoleSchema = z.object({
  userId: z.string(),
  roleId: z.uuid(),
});

export type AddUserRoleSchema = z.infer<typeof addUserRoleSchema>;
