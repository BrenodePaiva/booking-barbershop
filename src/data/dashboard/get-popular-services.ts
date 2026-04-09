import { db } from "@/db";
import { barberShopServiceTable, bookingTable } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";

export const getPopularServices = async () => {
  const result = await db
    .select({
      serviceId: bookingTable.serviceId,
      name: barberShopServiceTable.name,
      count: sql<number>`COUNT(${bookingTable.id})`,
    })
    .from(bookingTable)
    .leftJoin(
      barberShopServiceTable,
      eq(barberShopServiceTable.id, bookingTable.serviceId),
    )
    .where(eq(bookingTable.status, "Concluído"))
    .groupBy(bookingTable.serviceId, barberShopServiceTable.name)
    .orderBy(desc(sql`COUNT(${bookingTable.id})`))
    .limit(6);

  return result;
};
