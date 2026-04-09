import { db } from "@/db";
import {
  barberShopServiceTable,
  barberTable,
  bookingTable,
  userTable,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import "server-only";

export const getBarberRanking = async () => {
  const ranking = await db
    .select({
      barberId: bookingTable.barberId,
      name: userTable.name,
      cuts: sql<number>`COUNT(${bookingTable.id})`,
      revenue: sql<number>`SUM(${barberShopServiceTable.priceCents})`,
      image: userTable.image,
    })
    .from(bookingTable)
    .leftJoin(barberTable, eq(bookingTable.barberId, barberTable.id))
    .leftJoin(userTable, eq(userTable.id, barberTable.userId))
    .leftJoin(
      barberShopServiceTable,
      eq(barberShopServiceTable.id, bookingTable.serviceId),
    )
    .where(eq(bookingTable.status, "Concluído"))
    .groupBy(bookingTable.barberId, userTable.name, userTable.image)
    .orderBy(desc(sql`COUNT(${bookingTable.id})`))
    .limit(5);

  return ranking;
};
