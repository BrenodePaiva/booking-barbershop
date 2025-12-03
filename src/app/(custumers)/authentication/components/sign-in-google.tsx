"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const SignInGoogle = () => {
  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleSignInWithGoogle}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          fill="#4285F4"
          d="M128 48c22 0 41 8 55 21l41-41C198 8 165 0 128 0 78 0 35 29 14 72l48 37c13-39 50-61 66-61z"
        />
        <path
          fill="#34A853"
          d="M14 72c-9 18-14 38-14 58s5 40 14 58l48-37c-6-18-6-38 0-56L14 72z"
        />
        <path
          fill="#FBBC05"
          d="M128 256c37 0 70-14 94-38l-48-38c-13 10-30 16-46 16-26 0-49-15-61-37l-48 37c21 43 64 72 114 72z"
        />
        <path
          fill="#EA4335"
          d="M222 128c0-9-1-18-3-26H128v52h53c-5 14-15 26-28 34l48 38c28-26 44-64 44-98z"
        />
      </svg>

      <p>Entrar com Google</p>
    </Button>
  );
};
