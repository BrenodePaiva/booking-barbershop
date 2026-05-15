"use client";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LoadingSpinner } from "./loading-spinner";

export const LogOutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <LoadingSpinner />}
      <Button
        className="w-full justify-start p-0"
        variant="ghost"
        onClick={handleLogoutClick}
      >
        <LogOutIcon size={18} />
        Sair da conta
      </Button>
    </>
  );
};
