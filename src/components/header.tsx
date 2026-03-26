"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRound, MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { authClient } from "@/lib/auth-client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignInDialog from "./sign-in-dialog";
import Search from "./search";
import { getInitials } from "@/app/helpers/get-initials";
import { LogOutButton } from "./log-out-button";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBarbershop =
    (pathname.startsWith("/barbershop/") &&
      Boolean(searchParams.get("service"))) ||
    Boolean(searchParams.get("barber"));

  const { data: session } = authClient.useSession();

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <Link href="/">
          <Image alt="FSW Barber" src="/Logo.svg" height={8} width={120} />
        </Link>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SidebarSheet />
          </Sheet>
        </div>

        <div className="hidden w-full items-center justify-end md:flex">
          <div
            className={`mr-12 ml-12 ${isBarbershop ? "block" : "hidden"} w-full`}
          >
            <Search />
          </div>
          <div className="flex items-center gap-3">
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

            {session?.user ? (
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-card">
                        <div className="flex items-center gap-3">
                          {session.user.image && (
                            <Avatar>
                              <AvatarImage
                                src={session.user.image}
                                sizes="34px"
                              />
                              <AvatarFallback>
                                {getInitials(session.user.name)}
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <p className="font-bold">{session.user.name}</p>
                        </div>
                      </NavigationMenuTrigger>

                      <NavigationMenuContent className="">
                        <NavigationMenuLink className="border-b border-solid">
                          {session.user.email}
                        </NavigationMenuLink>
                        <NavigationMenuLink className="p-0">
                          <LogOutButton />
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
