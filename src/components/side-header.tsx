// "use client";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { MenuHeader } from "./menu-header";
// import { ChevronsUpDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { CustomTriggerHeader } from "./custom-trigger-header";

// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { getInitials } from "@/app/helpers/get-initials";
// import { LogOutButton } from "./log-out-button";
// import { authClient } from "@/lib/auth-client";

// export const SideHeader = () => {
//   const { data: session } = authClient.useSession();
//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <CustomTriggerHeader />

//           <SidebarGroupContent className="mt-13 md:mt-auto">
//             <MenuHeader />
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="px-0">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 {session && (
//                   <SidebarMenuButton className="min-w-10">
//                     <div className="flex items-center gap-3">
//                       {session.user.image && (
//                         <Avatar>
//                           <AvatarImage src={session.user.image} />
//                           <AvatarFallback>
//                             {getInitials(session.user.name)}
//                           </AvatarFallback>
//                         </Avatar>
//                       )}
//                       <p className="font-bold">{session.user.name}</p>
//                     </div>
//                     <ChevronsUpDown className="ml-auto" />
//                   </SidebarMenuButton>
//                 )}
//               </DropdownMenuTrigger>
//               <DropdownMenuContent side="top">
//                 <DropdownMenuItem asChild>
//                   <LogOutButton />
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <p className="text-muted-foreground text-sm">
//                     {session?.user.email}
//                   </p>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// };

// SideHeaderServer.tsx
"use server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { MenuHeader } from "./menu-header";
import MenuHeader from "./menu-header";
// import { CustomTriggerHeader } from "./custom-trigger-header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SideHeaderDropdownMenu from "./side-header-dropdown-menu";
import CustomTriggerHeader from "./custom-trigger-header";
import { getUserRoles } from "@/actions/role/get-user-roles";

const SideHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const roles = session ? await getUserRoles(session.user.id) : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <CustomTriggerHeader />
          <SidebarGroupContent className="mt-13 md:mt-auto">
            <MenuHeader userRoles={roles} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Passa a sessão para o Client Component */}
            {/* <SideHeaderClient session={session} /> */}
            <SideHeaderDropdownMenu session={session} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideHeader;
