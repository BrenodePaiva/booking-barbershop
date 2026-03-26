import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import CardEditButton from "./components/card-edit-button";

const User = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
    with: { barber: true },
  });
  return (
    <>
      {user && (
        <Card className="m-auto w-fit">
          <CardHeader>
            <CardTitle>Suas informações</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-3">
            {user.barber?.imageUrl ? (
              <div className="w-[300px]">
                <Image
                  src={`${user.barber?.imageUrl}?t=${user.barber.updatedAt.getTime()}`}
                  alt="Sua image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <div className="h-[400px] w-[300px] bg-amber-200"></div>
            )}

            <p>{user.name}</p>

            <CardFooter className="w-full">
              <CardEditButton
                defaultValues={{
                  id: user.id,
                  name: user.name,
                }}
              />
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default User;
