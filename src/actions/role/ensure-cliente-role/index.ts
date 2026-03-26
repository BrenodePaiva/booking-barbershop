"use server";
import { actionClient } from "@/lib/safe-action";
import { ensureClienteRoleSchema } from "./schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { rolesTable, userRolesTable } from "@/db/schema";

export const ensureClienteRole = actionClient
  .inputSchema(ensureClienteRoleSchema)
  .action(async ({ parsedInput: { userId } }) => {
    await db.transaction(async (trx) => {
      const clienteRole = await trx.query.rolesTable.findFirst({
        where: eq(rolesTable.name, "cliente"),
      });

      if (clienteRole) {
        const userRole = await trx.query.userRolesTable.findFirst({
          where: eq(userRolesTable.userId, userId),
        });

        if (!userRole) {
          await db.insert(userRolesTable).values({
            userId,
            roleId: clienteRole.id,
          });
        }
      }
    });
  });
