"use server";
import { db } from "@/db";
import { bookingTable } from "@/db/schema";
import { endOfDay, startOfDay } from "date-fns";
import { between } from "drizzle-orm";

interface GetBookingsProps {
  date: Date;
}

export const getBookingsByDate = async ({ date }: GetBookingsProps) => {
  return await db
    .select()
    .from(bookingTable)
    .where(between(bookingTable.date, startOfDay(date), endOfDay(date)));
};
