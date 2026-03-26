"use server";
import { actionClient } from "@/lib/safe-action";
import { upsertBarberAvailabilitySchema } from "./schema";
import { db } from "@/db";
import { barberAvailabilityTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";

export const upsertBarberAvailability = actionClient
  .inputSchema(upsertBarberAvailabilitySchema)
  .action(async ({ parsedInput: { barberId, availability } }) => {
    const session = await checkUserSession();

    const canUpsertBarberAvailability = await hasAnyRole(session.user.id, [
      "admin",
      "gerente",
    ]);
    if (!canUpsertBarberAvailability) throw new Error("Unauthorized");

    await db
      .insert(barberAvailabilityTable)
      .values(
        availability.map((slot) => ({
          barberId,
          dayOfWeek: slot.dayOfWeek,
          slotType: slot.slotType,
          start: slot.start,
          end: slot.end,
        })),
      )
      .onConflictDoUpdate({
        target: [
          barberAvailabilityTable.barberId,
          barberAvailabilityTable.dayOfWeek,
          barberAvailabilityTable.slotType,
        ],
        set: {
          start: sql`excluded.start`,
          end: sql`excluded.end`,
        },
      });

    revalidatePath("/barber-list");
  });
