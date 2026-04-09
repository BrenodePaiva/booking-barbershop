"use client";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function CustomTriggerHeader() {
  const { toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
    toggleSidebar();
  };

  return (
    <>
      <div className="fixed left-0 z-10 md:hidden">
        <Button
          onClick={handleToggle}
          variant="ghost"
          className="m-1 bg-white shadow-md"
        >
          <PanelLeft size={20} /> Menu
        </Button>
      </div>

      <SidebarHeader
        onClick={handleToggle}
        className="hover:bg-sidebar-accent z-10 mb-4 hidden max-w-fit flex-row items-center gap-2 overflow-hidden rounded-md p-[5px] text-sm hover:cursor-pointer md:flex"
      >
        <div>
          <PanelLeft size={20} />
        </div>
        <span>Menu</span>
      </SidebarHeader>
    </>
  );
}
