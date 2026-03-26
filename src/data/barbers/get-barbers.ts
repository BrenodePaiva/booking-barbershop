import "server-only";
import { db } from "@/db";

export const getBarbers = async () => {
  const barbers = await db.query.barberTable.findMany({
    with: { user: true, availability: true, blocks: true },
  });

  return barbers;
};
