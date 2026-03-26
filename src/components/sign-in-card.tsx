"use client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const SignInCard = () => {
  const handleLoginWithGoogleClick = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="flex h-[calc(100vh-156px)] items-center justify-center">
      <Card className="w-[90%]">
        <CardContent className="flex flex-col items-center gap-1">
          <h3 className="text-lg leading-none font-semibold">
            Faça login na plataforma
          </h3>
          <p className="text-muted-foreground text-sm">
            Conecte-se usando sua conta do Google.
          </p>

          <Button
            variant="outline"
            className="mt-2 w-full font-bold"
            onClick={handleLoginWithGoogleClick}
          >
            <Image
              alt="Fazer login com o Google"
              src="/google.svg"
              width={18}
              height={18}
            />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInCard;
