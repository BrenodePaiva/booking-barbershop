"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  barberAvailabilityTable,
  barberBlocksTable,
  barberTable,
  userTable,
} from "@/db/schema";
import Image from "next/image";
import BarberDropdownMenu from "./barber-dropdown-menu";

export type Barbers = typeof barberTable.$inferSelect & {
  user: typeof userTable.$inferSelect;
  availability: (typeof barberAvailabilityTable.$inferSelect)[];
  blocks: typeof barberBlocksTable.$inferSelect;
};

export const columns: ColumnDef<Barbers>[] = [
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: (row) => {
      const image = row.row.original.imageUrl;
      const update = row.row.original.updatedAt;
      const name = row.row.original.user.name;

      return image ? (
        <div className="h-auto w-32">
          <Image
            src={`${image}?t=${update.getTime()}`}
            alt={`Imagem do barbeiro ${name}`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      ) : (
        <div className="h-12 w-12 rounded-md bg-neutral-400"></div>
      );
    },
  },

  {
    accessorKey: "user.name",
    header: "Nome",
  },

  {
    accessorKey: "user.email",
    header: "E-mail",
  },

  {
    accessorKey: "bio",
    header: "Bio",
    cell: (row) => {
      const bio = row.row.original.bio;

      return <p className="max-w-xs truncate text-sm text-gray-700">{bio}</p>;
    },
  },

  {
    id: "actions",
    cell: (row) => {
      const barber = row.row.original;

      return <BarberDropdownMenu barber={barber} />;
    },
  },
];
