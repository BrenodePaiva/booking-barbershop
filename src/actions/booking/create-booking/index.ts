"use server";
import { actionClient } from "@/lib/safe-action";
import { createBookingSchema } from "./schema";
import { db } from "@/db";
import { barberTable, bookingTable } from "@/db/schema";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { dateAndTime } from "@/app/helpers/date-and-time";
import { sendBookingEmail } from "@/app/helpers/send-booking-email";

export const createBooking = actionClient
  .inputSchema(createBookingSchema)
  .action(async ({ parsedInput: { barberId, serviceId, date } }) => {
    const session = await checkUserSession();

    try {
      await db.transaction(async (trx) => {
        await trx
          .insert(bookingTable)
          .values({ userId: session.user.id, barberId, serviceId, date });

        const barber = await trx.query.barberTable.findFirst({
          where: eq(barberTable.id, barberId),
          with: { user: true },
        });

        if (!barber) throw new Error("Barber not found");

        const bookingDate = dateAndTime(new Date(date));
        const message = `Olá ${barber.user.name}, você tem um novo agendamento.`;
        const link = `${process.env.BETTER_AUTH_URL}/booking-list`;

        await sendBookingEmail({
          message,
          data: bookingDate.date,
          hora: bookingDate.time,
          link,
          email: barber.user.email,
          subject: "Novo agendamento para confirmar",
        });

        revalidatePath("/barbershops/[id]", "page");
        revalidatePath("/bookings");
        revalidatePath("/booking-list");
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  });
