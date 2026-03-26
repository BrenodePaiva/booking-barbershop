import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getRecomendedServices = async () => {
  const services = await db.query.barberShopServiceTable.findMany({
    where: eq(barberShopServiceTable.isRecommended, true),
  });

  return services;
};
