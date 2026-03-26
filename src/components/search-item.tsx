"use client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { userTable } from "@/db/schema";

interface SearchItemProps {
  barbershopItem: {
    id: string;
    user?: typeof userTable.$inferSelect;
    imageUrl?: string | null;
    description?: string | null;
    bio?: string | null;
    price?: number | null;
  };
}

const SearchItem = ({ barbershopItem }: SearchItemProps) => {
  return (
    <Card className="relative min-w-[174px] rounded-2xl px-1 pt-1 pb-9">
      <CardContent className="min-w-[159px] p-0">
        <div className="relative h-[159px] w-full">
          {barbershopItem.imageUrl ? (
            <Image
              alt={barbershopItem.user?.name ?? "Teste"}
              src={barbershopItem.imageUrl}
              fill
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-500"></div>
          )}

          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-sm font-semibold">5,0</p>
          </Badge>
        </div>
        <div className="mb-4 px-2 py-3">
          <h3 className="truncate font-semibold">
            {barbershopItem.user?.name}
          </h3>
          <p className="truncate text-sm text-gray-400">
            {barbershopItem?.description}
          </p>
        </div>
        <Button
          variant="secondary"
          className="absolute right-2 bottom-3 left-2 w-[calc(100%-1rem)]"
          asChild
        >
          <Link href={`/barbershop/${barbershopItem.id}`}>Reservar</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchItem;
