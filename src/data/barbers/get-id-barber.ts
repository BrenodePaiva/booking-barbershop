import "server-only";
import { db } from "@/db";
import { barberTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getIdBarber = async (barberId: string) => {
  const barber = await db.query.barberTable.findFirst({
    with: { user: true, availability: true, blocks: true },
    where: eq(barberTable.id, barberId),
  });

  return barber;
};
