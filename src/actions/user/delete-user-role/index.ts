"use server";
import { actionClient } from "@/lib/safe-action";
import { deleteUserRoleSchema } from "./schema";
import { db } from "@/db";
import { userRolesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const deleteUserRole = actionClient
  .inputSchema(deleteUserRoleSchema)
  .action(async ({ parsedInput }) => {
    await db
      .delete(userRolesTable)
      .where(
        and(
          eq(userRolesTable.userId, parsedInput.userId),
          eq(userRolesTable.roleId, parsedInput.roleId),
        ),
      );
  });
