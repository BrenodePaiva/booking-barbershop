import "server-only";
import { db } from "@/db";

export const getNextBookings = async () => {
  const bookings = await db.query.bookingTable.findMany({
    where: (booking, { not, eq, gte, and }) =>
      and(not(eq(booking.status, "Concluído")), gte(booking.date, new Date())),
    with: { service: true, user: true },
    orderBy: (booking, { asc }) => [asc(booking.date)],
    limit: 5,
  });
  return bookings;
};
