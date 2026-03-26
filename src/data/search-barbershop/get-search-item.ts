import "server-only";
import { db } from "@/db";
import { barberShopServiceTable } from "@/db/schema";
import { ilike } from "drizzle-orm";

interface GetSearchItemProps {
  barber?: string;
}

export const getSearchItem = async ({ barber }: GetSearchItemProps) => {
  if (barber) {
    const barbers = await db.query.barberTable.findMany({
      with: { user: true },
    });

    const filtered = barbers.filter((b) =>
      b.user?.name.toLowerCase().includes(barber.toLowerCase()),
    );

    const foundServices = await db
      .select()
      .from(barberShopServiceTable)
      .where(ilike(barberShopServiceTable.name, `%${barber}%`));

    return {
      barbers: filtered,
      services: foundServices,
    };
  }
};
