import "server-only";
import { db } from "@/db";
import { bookingTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export const getBookingsByStatus = async () => {
  const result = await db
    .select({
      status: bookingTable.status,
      count: sql<number>`COUNT(${bookingTable.id})`,
    })
    .from(bookingTable)
    .groupBy(bookingTable.status)
    .limit(5);

  return result;
};
