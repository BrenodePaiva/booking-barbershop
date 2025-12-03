import { z } from "zod";

export const deleteUserRoleSchema = z.object({
  userId: z.string(),
  roleId: z.uuid(),
});

export type DeleteUserRoleSchema = z.infer<typeof deleteUserRoleSchema>;
