import "server-only";
import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { ilike } from "drizzle-orm";

interface GetSearchServiceProps {
  service?: string;
}

export const getSearchService = async ({ service }: GetSearchServiceProps) => {
  const services = await db
    .select()
    .from(barberShopServiceTable)
    .where(ilike(barberShopServiceTable.name, `%${service}%`));

  return services;
};
