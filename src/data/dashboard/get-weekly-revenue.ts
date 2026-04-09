import { db } from "@/db";
import { barberShopServiceTable, bookingTable } from "@/db/schema";
import { sql, eq, desc, gte, and } from "drizzle-orm";

export const getWeeklyRevenue = async () => {
  // pega a data de 6 semanas atrás
  const sixWeeksAgo = new Date();
  sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 7 * 6);

  const result = await db
    .select({
      week: sql<string>`DATE_TRUNC('week', ${bookingTable.date})`,
      revenue: sql<number>`SUM(${barberShopServiceTable.priceCents})`,
    })
    .from(bookingTable)
    .leftJoin(
      barberShopServiceTable,
      eq(barberShopServiceTable.id, bookingTable.serviceId),
    )
    .where(
      and(
        eq(bookingTable.status, "Concluído"),
        gte(bookingTable.date, sixWeeksAgo),
      ),
    )
    .groupBy(sql`DATE_TRUNC('week', ${bookingTable.date})`)
    .orderBy(desc(sql`DATE_TRUNC('week', ${bookingTable.date})`));

  return result;
};
