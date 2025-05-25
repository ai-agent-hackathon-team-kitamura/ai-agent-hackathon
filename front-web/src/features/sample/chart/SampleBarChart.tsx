"use client";
import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { sampleJobLevelData } from "./constants";

export const SampleBarChart = () => {
  const chart = useChart(sampleJobLevelData);

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart barCategoryGap="0" data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
        <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}人`} />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};
