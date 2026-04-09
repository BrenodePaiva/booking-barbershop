"use client";
import { formatCentsToBRL } from "@/app/helpers/money";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  CircleStar,
  ClockFading,
  DollarSign,
  XCircle,
} from "lucide-react";

type StatusCard = {
  status: "Pendente" | "Confirmado" | "Cancelado" | "Concluído";
  count: number;
};
interface SummaryCardProps {
  revenue: number;
  statusCount: StatusCard[];
}

const SummaryCard = ({ revenue, statusCount }: SummaryCardProps) => {
  return (
    <>
      <Card className="mb-8 h-fit w-full max-w-72 p-4">
        <CardHeader className="px-0">
          <CardTitle>
            <DollarSign className="h-6 w-6 text-green-300" />
          </CardTitle>
          <CardDescription>
            <h3 className="text-sm font-medium">Receita prevista</h3>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <p className="mt-2 text-2xl font-bold">{formatCentsToBRL(revenue)}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle>
              <ClockFading className="h-6 w-6 text-yellow-600" />
            </CardTitle>
            <CardDescription>
              <h3 className="text-sm font-medium">Pendentes</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mt-2 text-2xl font-bold">
              {statusCount.find((s) => s.status === "Pendente")?.count ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </CardTitle>
            <CardDescription>
              <h3 className="text-sm font-medium">Confirmados</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mt-2 text-2xl font-bold">
              {statusCount.find((s) => s.status === "Confirmado")?.count ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle>
              <XCircle className="h-6 w-6 text-red-600" />
            </CardTitle>
            <CardDescription>
              <h3 className="text-sm font-medium">Cancelados</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mt-2 text-2xl font-bold">
              {statusCount.find((s) => s.status === "Cancelado")?.count ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle>
              <CircleStar className="h-6 w-6 text-blue-600" />
            </CardTitle>
            <CardDescription>
              <h3 className="text-sm font-medium">Finalizados</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mt-2 text-2xl font-bold">
              {statusCount.find((s) => s.status === "Concluído")?.count ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SummaryCard;
