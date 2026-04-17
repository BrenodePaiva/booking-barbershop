// side-header-client.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import { LogOutButton } from "./log-out-button";
import { getInitials } from "@/app/helpers/get-initials";

type Session = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
} | null;

interface SideHeaderDropdownMenuProps {
  session: Session;
}

const SideHeaderDropdownMenu = ({ session }: SideHeaderDropdownMenuProps) => {
  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="min-w-10">
          <div className="flex items-center gap-3">
            {session.user.image && (
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
            )}
            <p className="font-bold">{session.user.name}</p>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuItem asChild>
          <LogOutButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p className="text-muted-foreground text-sm">{session?.user.email}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SideHeaderDropdownMenu;
