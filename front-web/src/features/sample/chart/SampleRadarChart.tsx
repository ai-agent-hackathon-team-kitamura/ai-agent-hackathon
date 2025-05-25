"use client";
import { Chart, useChart } from "@chakra-ui/charts";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { sampleSkillData } from "./constants";

export const SampleRadarChart = () => {
  const chart = useChart(sampleSkillData);

  return (
    <Chart.Root maxW="sm" chart={chart} mx="auto">
      <RadarChart data={chart.data}>
        <PolarGrid stroke={chart.color("border")} />
        <PolarAngleAxis dataKey={chart.key("skill")} />
        <PolarRadiusAxis />
        {chart.series.map((item) => (
          <Radar
            isAnimationActive={false}
            key={item.name}
            name={item.name}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </Chart.Root>
  );
};
