import "server-only";
import { db } from "@/db";

export const getServices = async () => {
  const services = await db.query.barberShopServiceTable.findMany({
    orderBy: (services, { desc }) => [desc(services.createdAt)],
  });
  return services;
};
