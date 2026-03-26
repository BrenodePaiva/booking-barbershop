"use server";
import { actionClient } from "@/lib/safe-action";
import { deleteServiceSchema } from "./schema";
import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteImage } from "@/app/helpers/upload";
import { revalidatePath } from "next/cache";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";

export const deleteService = actionClient
  .inputSchema(deleteServiceSchema)
  .action(async ({ parsedInput }) => {
    const session = await checkUserSession();

    const canDeleteService = await hasAnyRole(session.user.id, [
      "admin",
      "gerente",
    ]);
    if (!canDeleteService) throw new Error("Unauthorized");

    await db
      .delete(barberShopServiceTable)
      .where(eq(barberShopServiceTable.id, parsedInput.id));
    await deleteImage(parsedInput.id, "services");

    revalidatePath("/barbershop-service");
  });
