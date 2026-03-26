import "server-only";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getPendingBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return [];

  const bookings = await db.query.bookingTable.findMany({
    where: (bookings, { eq, gte, and }) =>
      and(
        eq(bookings.userId, session.user.id),
        eq(bookings.status, "Pendente"),
        gte(bookings.date, new Date()),
      ),
    with: { service: true, barber: { with: { user: true } } },
    orderBy: (bookings, { asc }) => [asc(bookings.date)],
  });

  return bookings;
};
