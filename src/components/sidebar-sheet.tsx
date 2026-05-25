"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { CalendarIcon, CircleUserRound, HomeIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import { LogOutButton } from "./log-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/app/helpers/get-initials";

const SidebarSheet = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-2 border-b border-solid px-5 pb-5">
        <SheetClose asChild>
          <Button
            className="justify-start"
            variant={pathname === "/" ? "default" : "ghost"}
            asChild
          >
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            className="justify-start"
            variant={pathname === "/bookings" ? "default" : "ghost"}
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={18} />
              Agendamento
            </Link>
          </Button>
        </SheetClose>
      </div>
      {/* <LogOutButton /> */}
      {session ? (
        <>
          <div className="flex items-center gap-3 pl-2">
            {session.user.image && (
              <Avatar>
                <AvatarImage src={session.user.image} sizes="34px" />
                <AvatarFallback>
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <p className="font-bold">{session.user.name}</p>
              <p className="text-accent-foreground text-xs">
                {session.user.email}
              </p>
            </div>
          </div>
          <SheetClose asChild>
            <LogOutButton />
          </SheetClose>
        </>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-none">
                <CircleUserRound size={18} />
                Entrar
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        </>
      )}
    </SheetContent>
  );
};

export default SidebarSheet;
