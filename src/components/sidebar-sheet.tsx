"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { CalendarIcon, HomeIcon } from "lucide-react";

import { usePathname } from "next/navigation";

const SidebarSheet = () => {
  const pathname = usePathname();

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
    </SheetContent>
  );
};

export default SidebarSheet;
