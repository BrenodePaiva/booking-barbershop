import "server-only";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { db } from "@/db";
// import { getServerSession } from "next-auth"
// import { authOptions } from "../_lib/auth"
// import { db } from "../_lib/prisma"

export const getConcluedBookings = async () => {
  const session = await checkUserSession();
  if (!session?.user) return [];

  const bookings = db.query.bookingTable.findMany({
    where: (bookings, { eq, and }) =>
      and(
        eq(bookings.userId, session.user.id),
        eq(bookings.status, "Concluído"),
      ),
    with: { service: true, barber: { with: { user: true } } },
    orderBy: (bookings, { asc }) => [asc(bookings.date)],
  });

  return bookings;
};
