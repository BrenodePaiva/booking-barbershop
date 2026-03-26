"use server";
import { actionClient } from "@/lib/safe-action";
import { deleteUserRoleSchema } from "./schema";
import { db } from "@/db";
import { barberTable, userRolesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";
import { revalidatePath } from "next/cache";

export const deleteUserRole = actionClient
  .inputSchema(deleteUserRoleSchema)
  .action(async ({ parsedInput }) => {
    const session = await checkUserSession();

    const canDeleteRole = await hasAnyRole(session.user.id, [
      "admin",
      "gerente",
    ]);

    if (!canDeleteRole) throw new Error("Unauthorized");

    if (
      parsedInput.userId === process.env.PROTECTED_USER_ID &&
      parsedInput.roleId === process.env.PROTECTED_ADMIN_ROLE_ID
    ) {
      throw new Error(
        'It is not possible to remove the "admin" permission from this user.',
      );
    }

    await db.transaction(async (trx) => {
      await trx
        .delete(userRolesTable)
        .where(
          and(
            eq(userRolesTable.userId, parsedInput.userId),
            eq(userRolesTable.roleId, parsedInput.roleId),
          ),
        );

      const barber = await trx.query.barberTable.findFirst({
        where: (baber, { eq }) => eq(baber.userId, parsedInput.userId),
      });

      if (barber) {
        await trx
          .delete(barberTable)
          .where(eq(barberTable.userId, parsedInput.userId));
      }
    });

    revalidatePath("/barber-list");
    revalidatePath("/booking-list");
    revalidatePath("/user-list");
  });
