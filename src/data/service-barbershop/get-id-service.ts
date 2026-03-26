import "server-only";
import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getIdService = async (serviceId: string) => {
  const service = await db.query.barberShopServiceTable.findFirst({
    where: eq(barberShopServiceTable.id, serviceId),
  });

  return service;
};
