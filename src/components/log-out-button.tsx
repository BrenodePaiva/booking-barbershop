"use client";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export const LogOutButton = () => {
  const handleLogoutClick = async () => {
    await authClient.signOut();
    window.location.reload();
  };
  return (
    <Button
      className="justify-start p-0"
      variant="ghost"
      onClick={handleLogoutClick}
    >
      <LogOutIcon size={18} />
      Sair da conta
    </Button>
  );
};
