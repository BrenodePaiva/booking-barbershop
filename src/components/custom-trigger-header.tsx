"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
    <div className="fixed w-full bg-white">
      <Button onClick={handleToggle} variant="ghost" className="m-1">
        {open ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />} Menu
      </Button>
    </div>
  );
}
