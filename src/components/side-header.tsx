import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MenuHeader } from "./menu-header";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CustomTriggerHeader } from "./custom-trigger-header";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/app/helpers/get-initials";
import { checkUserSession } from "@/app/helpers/check-user-session";
import { LogOutButton } from "./log-out-button";

export const SideHeader = async () => {
  const session = await checkUserSession();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <CustomTriggerHeader />

          <SidebarGroupContent className="mt-13 md:mt-auto">
            <MenuHeader />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {session && (
                  <SidebarMenuButton>
                    <div className="flex items-center gap-3">
                      {session.user.image && (
                        <Avatar>
                          <AvatarImage src={session.user.image} sizes="34px" />
                          <AvatarFallback>
                            {getInitials(session.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <p className="font-bold">{session.user.name}</p>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem asChild>
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
