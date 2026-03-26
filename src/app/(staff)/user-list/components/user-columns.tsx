"use client";

import { ColumnDef } from "@tanstack/react-table";
import { rolesTable, userRolesTable, userTable } from "@/db/schema";
import UserDropdownMenu from "./user-dropdown-menu";

type RoleWithName = typeof userRolesTable.$inferSelect & {
  userRole: typeof rolesTable.$inferSelect;
};

export type Users = typeof userTable.$inferSelect & {
  roles: RoleWithName[];
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "roles",
    header: "Permissões",
    cell: (row) => {
      const roles = row.row.original.roles;
      return (
        <div className="flex max-w-[150px] flex-wrap gap-2">
          {roles.map((r) => (
            <span
              key={r.roleId}
              className="rounded bg-gray-200 px-2 py-1 text-xs capitalize"
            >
              {r.userRole.name}
            </span>
          ))}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: (row) => {
      const user = row.row.original;

      return <UserDropdownMenu user={user} />;
    },
  },
];
