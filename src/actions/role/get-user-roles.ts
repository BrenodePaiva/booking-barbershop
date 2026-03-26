"use server";
import { db } from "@/db";

export async function getUserRoles(userId: string) {
  const roles = await db.query.userRolesTable.findMany({
    where: (ur, { eq }) => eq(ur.userId, userId),
    with: { userRole: true },
  });

  return roles.map((ur) => ur.userRole.name);
}
