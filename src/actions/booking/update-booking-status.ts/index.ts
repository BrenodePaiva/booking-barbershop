"use server";
import { actionClient } from "@/lib/safe-action";
import { updateBookingStatusSchema } from "./schema";
import { db } from "@/db";
import { bookingTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { hasAnyRole } from "@/app/helpers/has-any-role";
import { sendBookingEmail } from "@/app/helpers/send-booking-email";
import { dateAndTime } from "@/app/helpers/date-and-time";

export const updateBookingStatus = actionClient
  .inputSchema(updateBookingStatusSchema)
  .action(async ({ parsedInput: { id, status, cancelReason } }) => {
    const session = await checkUserSession();

    const canUpdateBookingStatus = await hasAnyRole(session.user.id, [
      "barbeiro",
    ]);
    if (!canUpdateBookingStatus) throw new Error("Unauthorized");

    try {
      await db.transaction(async (trx) => {
        await trx
          .update(bookingTable)
          .set({ status, cancelReason })
          .where(eq(bookingTable.id, id));

        const userBooking = await trx.query.bookingTable.findFirst({
          where: eq(bookingTable.id, id),
          with: { user: true },
        });

        if (!userBooking) throw new Error("Booking not found");

        const bookingDate = dateAndTime(new Date(userBooking.date));
        const message = `Olá ${userBooking.user.name}, seu agendamento foi ${userBooking.status}`;
        const link = `${process.env.BETTER_AUTH_URL}/bookings`;

        await sendBookingEmail({
          message,
          data: bookingDate.date,
          hora: bookingDate.time,
          link,
          email: userBooking.user.email,
          subject: "Seu agendamento",
        });

        revalidatePath("/barbershops/[id]", "page");
        revalidatePath("/bookings");
        revalidatePath("/booking-list");
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  });
