import "server-only";
import { db } from "@/db";

export const getUsers = async () => {
  const users = await db.query.userTable.findMany({
    with: {
      roles: { with: { userRole: true } },
      barber: true,
    },
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  });
  return users;
};
