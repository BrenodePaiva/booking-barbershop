import "server-only";
import { db } from "@/db";
import { checkUserSession } from "@/app/helpers/check-user-session";

export const getBarberBookings = async () => {
  const session = await checkUserSession();
  if (!session.user.id) return [];

  const barber = await db.query.barberTable.findFirst({
    where: (barber, { eq }) => eq(barber.userId, session.user.id),
  });

  if (!barber) return [];

  const barberBookings = await db.query.bookingTable.findMany({
    where: (bookings, { eq }) => eq(bookings.barberId, barber.id),
    with: { user: true, service: true },
    orderBy: (bookings, { asc }) => [asc(bookings.date)],
  });

  return barberBookings;
};
