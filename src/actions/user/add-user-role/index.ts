"use server";
import { actionClient } from "@/lib/safe-action";
import { addUserRoleSchema } from "./schema";
import { db } from "@/db";
import { userRolesTable } from "@/db/schema";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";
import { revalidatePath } from "next/cache";

export const addUserRole = actionClient
  .inputSchema(addUserRoleSchema)
  .action(async ({ parsedInput }) => {
    const session = await checkUserSession();

    const canAddRole = await hasAnyRole(session.user.id, ["admin", "gerente"]);
    if (!canAddRole) throw new Error("Unauthorized");

    await db.insert(userRolesTable).values({
      userId: parsedInput.userId,
      roleId: parsedInput.roleId,
    });

    revalidatePath("/barber-list");
    revalidatePath("/booking-list");
    revalidatePath("/user-list");
  });
