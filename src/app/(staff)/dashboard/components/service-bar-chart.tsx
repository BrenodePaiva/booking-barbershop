"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid, LabelList } from "recharts";

type ServiceData = {
  name: string | null;
  count: number;
};

interface ServiceBarChartProps {
  chartData: ServiceData[];
}

const ServiceBarChart = ({ chartData }: ServiceBarChartProps) => {
  const chartConfig = {
    count: {
      label: "Popularidade",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const data = chartData.map((item) => ({
    ...item,
    count: Number(item.count),
    fill: "var(--color-count)",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Serviços mais populares</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="m-auto mt-3 aspect-4/3 max-h-[300px]"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 15,
              bottom: 22,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              angle={-30}
              textAnchor="end"
              tickFormatter={(value) =>
                value.length > 13 ? value.slice(0, 13) + "-" : value
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ServiceBarChart;
