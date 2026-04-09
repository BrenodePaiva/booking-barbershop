"use client";
import { PieChart, Pie, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type BookingStatus = {
  status: "Pendente" | "Confirmado" | "Cancelado" | "Concluído";
  count: number;
};

interface StatusPieChartProps {
  chartData: BookingStatus[];
}

const StatusPieChart = ({ chartData }: StatusPieChartProps) => {
  const chartConfig = {
    booking: {
      label: "Agendamentos",
    },
    Pendente: {
      label: "Pendentes",
      color: "#eab308",
    },
    Confirmado: {
      label: "Confirmados",
      color: "#22c55e",
    },
    Cancelado: {
      label: "Cancelados",
      color: "#ef4444",
    },
    Concluído: {
      label: "Concluídos",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  const data = chartData.map((item) => ({
    ...item,
    count: Number(item.count),
    fill: chartConfig[item.status].color,
  }));

  const total = data.reduce((acc, item) => acc + item.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-0 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
            <Pie data={data} dataKey="count" outerRadius={100}>
              <LabelList
                dataKey="count"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => {
                  if (!value || total === 0) return "";
                  const porcent = ((Number(value) / total) * 100).toFixed(0);
                  return `${porcent}%`;
                }}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-row-reverse flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
