"use server";
import { db } from "@/db";
import { rolesTable } from "@/db/schema";

export const getAllRoles = async () => {
  return await db.select().from(rolesTable);
};
