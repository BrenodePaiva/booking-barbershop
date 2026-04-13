"use client";
import SidebarSheet from "@/components/sidebar-sheet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

const MobileButton = () => {
  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        className="absolute top-4 left-4"
        asChild
      >
        <Link href="/">
          <ChevronLeftIcon />
        </Link>
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SidebarSheet />
      </Sheet>
    </>
  );
};

export default MobileButton;
