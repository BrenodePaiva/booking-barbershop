"use client";
import { formatCentsToBRL } from "@/app/helpers/money";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Ranking = {
  name: string | null;
  cuts: number;
  revenue: number;
  image: string | null;
};

interface BarberRankingProps {
  barbersData: Ranking[];
}

const BarberRanking = ({ barbersData }: BarberRankingProps) => {
  return (
    <Card className="h-fit w-[280px]">
      <CardHeader>
        <CardTitle>Ranking dos Barbeiros</CardTitle>
        <CardDescription>Top desempenho</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-2">
          {barbersData
            .sort((a, b) => b.cuts - a.cuts)
            .map((barber) => (
              <li
                key={barber.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {barber.image && (
                    <Avatar className="mb-1.5">
                      <AvatarImage src={barber.image} />
                    </Avatar>
                  )}
                  <div className="leading-4">
                    <p className="w-28 truncate font-medium">{barber.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {formatCentsToBRL(Number(barber.revenue))}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {barber.cuts} corte(s)
                  </p>
                </div>
              </li>
            ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default BarberRanking;
