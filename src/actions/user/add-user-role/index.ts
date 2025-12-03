"use server";
import { actionClient } from "@/lib/safe-action";
import { addUserRoleSchema } from "./schema";
import { db } from "@/db";
import { userRolesTable } from "@/db/schema";

export const addUserRole = actionClient
  .inputSchema(addUserRoleSchema)
  .action(async ({ parsedInput }) => {
    await db.insert(userRolesTable).values({
      userId: parsedInput.userId,
      roleId: parsedInput.roleId,
    });
  });
