import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { authClient } from "@/lib/auth-client";

const SignInDialog = () => {
  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

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
