import { db } from "@/db";

export const getAllBookings = async () => {
  const allBookings = await db.query.bookingTable.findMany({
    with: { user: true, service: true, barber: { with: { user: true } } },
  });
  return allBookings;
};
