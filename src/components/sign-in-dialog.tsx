import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LoadingSpinner } from "./loading-spinner";

const SignInDialog = () => {
  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <LoadingSpinner />}
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <div className="text-muted-foreground text-[13px]">
        <p>Administrador:</p>
        <p>E-mail: admin.demo7@gmail.com</p>
        <p>Senha: 12345678ad</p>
      </div>

      <Button
        variant="outline"
        className="font-bold"
        onClick={handleSignInWithGoogle}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
