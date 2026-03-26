"use server";
import { actionClient } from "@/lib/safe-action";
import { upsertBarberBlockSchema } from "./schema";
import { db } from "@/db";
import { barberBlocksTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";

export const upsertBarberBlock = actionClient
  .inputSchema(upsertBarberBlockSchema)
  .action(
    async ({ parsedInput: { barberId, rangeStart, rangeEnd, reason } }) => {
      const session = await checkUserSession();

      const canUpsertBarberBlock = await hasAnyRole(session.user.id, [
        "admin",
        "gerente",
      ]);
      if (!canUpsertBarberBlock) throw new Error("Unauthorized");

      try {
        await db
          .insert(barberBlocksTable)
          .values({
            barberId,
            start: rangeStart,
            end: rangeEnd,
            reason,
          })
          .onConflictDoUpdate({
            target: barberBlocksTable.barberId, // garante 1 bloqueio por barbeiro
            set: {
              start: sql`excluded.start`,
              end: sql`excluded.end`,
              reason: sql`excluded.reason`,
              updatedAt: new Date(),
            },
          });
      } catch (error) {
        console.log(error);
      }
    },
    revalidatePath("/barber-list"),
  );
