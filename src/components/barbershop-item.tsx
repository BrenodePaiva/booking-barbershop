"use client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

import Link from "next/link";
import { barberShopServiceTable, barberTable, userTable } from "@/db/schema";

import { formatCentsToBRL } from "@/app/helpers/money";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

interface BarbershopItemProps {
  service?: typeof barberShopServiceTable.$inferSelect;
  barber?: typeof barberTable.$inferSelect & {
    user: typeof userTable.$inferSelect;
  };
}

const BarbershopItem = ({ service, barber }: BarbershopItemProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/barbershop/${service?.id ?? barber?.id}`);
  };

  return (
    <Card className="relative max-w-[200px] min-w-[200px] rounded-2xl px-1 pt-1 pb-9">
      <CardContent className="min-w-[159px] p-0">
        <div className="relative h-[159px] w-full">
          {service?.imageUrl || barber?.imageUrl ? (
            <Image
              alt={service?.name ?? barber?.user.name ?? ""}
              src={`${service?.imageUrl ?? barber?.imageUrl ?? ""}?t=${
                service?.updatedAt
                  ? service?.updatedAt.getTime()
                  : barber?.updatedAt.getTime()
              }
                `}
              fill
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-500"></div>
          )}
        </div>

        <div className="mb-4 px-2 py-3">
          <h3 className="mb-2 font-semibold">
            {service?.name ?? barber?.user.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-400">
            {service?.description ?? barber?.bio}
          </p>
          {service?.priceCents && (
            <p className="mt-1 truncate text-sm text-gray-400">
              {formatCentsToBRL(service.priceCents)}
            </p>
          )}
        </div>

        <Button
          variant="secondary"
          className="absolute right-2 bottom-3 left-2 w-[calc(100%-1rem)]"
          onClick={handleClick}
        >
          Reservar
        </Button>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Spinner className="size-12 text-white" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
