"use server";
import { actionClient } from "@/lib/safe-action";
import { upsertBarberSchema } from "./schema";
import { db } from "@/db";
import { barberTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteImage, uploadImage } from "@/app/helpers/upload";
import { revalidatePath } from "next/cache";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";

export const upsertBarber = actionClient
  .inputSchema(upsertBarberSchema)
  .action(async ({ parsedInput: { id, imageUrl, name, bio } }) => {
    const session = await checkUserSession();

    const canUpsertBarber = await hasAnyRole(session.user.id, [
      "admin",
      "gerente",
    ]);
    if (!canUpsertBarber) throw new Error("Unauthorized");

    if (!id) throw new Error("Undefined id");

    try {
      await db.transaction(async (trx) => {
        await trx.update(userTable).set({ name }).where(eq(userTable.id, id));

        if (imageUrl) {
          const url = await uploadImage(imageUrl, id, "barbers");

          await trx
            .insert(barberTable)
            .values({ userId: id, imageUrl: url, bio })
            .onConflictDoUpdate({
              target: barberTable.userId,
              set: { imageUrl: url, bio },
            });
        }

        revalidatePath("/user-list");
        revalidatePath("/barber-list");
      });
    } catch (error) {
      if (imageUrl) {
        await deleteImage(id, "barbers");
      }

      throw error;
    }
  });
