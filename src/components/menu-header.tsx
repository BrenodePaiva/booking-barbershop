// "use client";
// import {
//   CalendarDays,
//   LayoutDashboard,
//   Ruler,
//   Scissors,
//   Users,
// } from "lucide-react";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "./ui/sidebar";
// import { usePathname } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { getUserRoles } from "@/actions/role/get-user-roles";
// import { useEffect, useState } from "react";

// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//     allowedRoles: ["admin", "gerente"],
//   },
//   {
//     title: "Serviços",
//     url: "/barbershop-service",
//     icon: Ruler,
//     allowedRoles: ["admin", "gerente"],
//   },
//   {
//     title: "Barbeiros",
//     url: "/barber-list",
//     icon: Scissors,
//     allowedRoles: ["admin", "gerente"],
//   },
//   {
//     title: "Agendamentos",
//     url: "/booking-list",
//     icon: CalendarDays,
//     allowedRoles: ["admin", "gerente", "barbeiro"],
//   },
//   {
//     title: "usuários",
//     url: "/user-list",
//     icon: Users,
//     allowedRoles: ["admin", "gerente"],
//   },
// ];

// export function MenuHeader() {
//   const pathname = usePathname();
//   const { toggleSidebar, isMobile } = useSidebar();
//   const { data: session } = authClient.useSession();
//   const [userRoles, setUserRoles] = useState<string[]>([]);

//   const handleSidebarToggle = () => {
//     return isMobile && toggleSidebar();
//   };

//   useEffect(() => {
//     const feach = async () => {
//       if (!session) return;
//       const roles = await getUserRoles(session.user.id);
//       setUserRoles(roles);
//     };
//     feach();
//   }, [session]);

//   const visibleItems = items.filter((item) =>
//     item.allowedRoles.some((role) => userRoles.includes(role)),
//   );

//   return (
//     <SidebarMenu>
//       {visibleItems.map((item) => (
//         <SidebarMenuItem key={item.title}>
//           <SidebarMenuButton
//             asChild
//             onClick={handleSidebarToggle}
//             isActive={pathname === item.url}
//           >
//             <a href={item.url}>
//               <item.icon />
//               <span>{item.title}</span>
//             </a>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       ))}
//     </SidebarMenu>
//   );
// }

// MenuHeaderClient.tsx
"use client";

import {
  CalendarDays,
  LayoutDashboard,
  Ruler,
  Scissors,
  Users,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["admin", "gerente"],
  },
  {
    title: "Serviços",
    url: "/barbershop-service",
    icon: Ruler,
    allowedRoles: ["admin", "gerente"],
  },
  {
    title: "Barbeiros",
    url: "/barber-list",
    icon: Scissors,
    allowedRoles: ["admin", "gerente"],
  },
  {
    title: "Agendamentos",
    url: "/booking-list",
    icon: CalendarDays,
    allowedRoles: ["admin", "gerente", "barbeiro"],
  },
  {
    title: "Usuários",
    url: "/user-list",
    icon: Users,
    allowedRoles: ["admin", "gerente"],
  },
];

interface MenuHeaderProps {
  userRoles: string[];
}

const MenuHeader = ({ userRoles }: MenuHeaderProps) => {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();

  const handleSidebarToggle = () => {
    return isMobile && toggleSidebar();
  };

  const visibleItems = items.filter((item) =>
    item.allowedRoles.some((role) => userRoles.includes(role)),
  );

  return (
    <SidebarMenu>
      {visibleItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            onClick={handleSidebarToggle}
            isActive={pathname === item.url}
          >
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default MenuHeader;
