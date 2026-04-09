"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { convertToReal, formatCentsToBRL } from "@/app/helpers/money";
import { getWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

type BookingRevenue = {
  week: string;
  revenue: number;
};

interface RevenueLineChartProps {
  chartData: BookingRevenue[];
}

const RevenueLineChart = ({ chartData }: RevenueLineChartProps) => {
  const formatWeekLabel = (dateString: string) => {
    const date = new Date(dateString);
    const weekNumber = getWeek(date, { locale: ptBR });
    return `Semana ${weekNumber}`;
  };

  const chartConfig = {
    revenue: {
      label: "R$",
      color: "#22c55e",
    },
  } satisfies ChartConfig;

  const data = chartData.map((item) => ({
    ...item,
    week: formatWeekLabel(item.week),
    revenue: Number(item.revenue),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita por semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="m-auto aspect-4/3 max-h-[300px]"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 15,
              right: 15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.replace("Semana", "S").replace(/\s+/g, "")
              }
            />

            <ChartTooltip
              cursor={false}
              content={({ payload, label }) => {
                if (!payload || payload.length === 0) return null;
                const item = payload[0]; // só tem "cents"
                const config =
                  chartConfig[item.dataKey as keyof typeof chartConfig];

                return (
                  <div className="flex items-center rounded-md bg-white p-2 shadow-md">
                    <div
                      className={`mr-2.5 h-[34px] w-[5px] rounded-2xl bg-[#22c55e]`}
                    ></div>
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="text-sm font-medium">
                        {`${config.label} ${convertToReal(Number(item.value))}`}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke={chartConfig.revenue.color}
              strokeWidth={2}
              dot={{
                fill: chartConfig.revenue.color,
              }}
              activeDot={{
                r: 6,
              }}
            ></Line>
          </LineChart>
        </ChartContainer>

        <div className="mt-4 flex flex-wrap gap-2 text-sm sm:hidden">
          {data.map((item) => (
            <div
              key={item.week}
              className="flex flex-col items-center rounded-md bg-gray-50 p-2"
            >
              <span className="text-gray-500">{item.week}</span>
              <span className="font-medium text-green-600">
                {formatCentsToBRL(item.revenue)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RevenueLineChart;
