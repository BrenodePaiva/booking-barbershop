"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CopyCheck, CopyX } from "lucide-react";
import { barberShopServiceTable } from "@/db/schema";
import ServiceDropdownMenu from "./service-dropdown-menu";
import { formatCentsToBRL } from "@/app/helpers/money";
import Image from "next/image";

export type Services = typeof barberShopServiceTable.$inferSelect;
export type ServiceForm = {
  name: string;
  id: string;
  isRecommended: boolean;
  description: string | null;
  priceCents: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Services>[] = [
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: (row) => {
      const image = row.row.original.imageUrl;
      const update = row.row.original.updatedAt;
      const name = row.row.original.name;

      return image ? (
        <div className="h-auto w-28">
          <Image
            src={`${image}?t=${update.getTime()}`}
            alt={`Imagem do serviço ${name}`}
            width={0}
            height={0}
            sizes="100vw"
            className="my-auto h-auto w-full"
          />
        </div>
      ) : (
        <div className="h-12 w-12 rounded-md bg-neutral-400"></div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "priceCents",
    header: "Preço",
    cell: (row) => {
      const price = row.row.original.priceCents;

      return <p>{formatCentsToBRL(price)}</p>;
    },
  },
  {
    accessorKey: "isRecommended",
    header: "Recomendado",
    cell: (row) => {
      const isRocomend = row.row.original.isRecommended;

      return (
        <div className="flex items-center">
          {isRocomend ? (
            <CopyCheck color="#26a269" />
          ) : (
            <CopyX color="hsl(0 84.2% 60.2%)" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: (row) => {
      const description = row.row.original.description;

      return (
        <p className="max-w-xs truncate text-sm text-gray-700">{description}</p>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const service = row.row.original;

      return <ServiceDropdownMenu service={service} />;
    },
  },
];
