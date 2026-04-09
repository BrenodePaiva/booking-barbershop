import "server-only";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { barberShopServiceTable, bookingTable } from "@/db/schema";

export const getTotalRevenue = async () => {
  const result = await db
    .select({
      revenue: sql<number>`SUM(${barberShopServiceTable.priceCents})`,
    })
    .from(bookingTable)
    .leftJoin(
      barberShopServiceTable,
      eq(barberShopServiceTable.id, bookingTable.serviceId),
    )
    .where(eq(bookingTable.status, "Concluído"));

  return result[0].revenue ?? 0;
};
