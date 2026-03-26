import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const checkUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
};
