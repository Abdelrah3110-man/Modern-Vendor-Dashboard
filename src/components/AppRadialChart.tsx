import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './ui/chart';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { VENDOR_MONITORED } from '@/constants';

const chartConfig = {
  monitored: { label: 'Total Monitored', color: 'var(--chart-3)' },
  limit: { label: 'Available limit', color: 'var(--color-secondary)' },
} satisfies ChartConfig;

const AppRadialChart = () => {
  const totalLimit = VENDOR_MONITORED[0].limit + VENDOR_MONITORED[0].monitored;
  return (
    <ChartContainer
      config={chartConfig}
      className='w-[200px] h-[110px]'
    >
      <RadialBarChart
        data={VENDOR_MONITORED}
        innerRadius={90}
        outerRadius={140}
        cy={104}
        startAngle={0}
        endAngle={180}
      >
        <RadialBar
          dataKey='limit'
          stackId='a'
          fill='var(--color-limit)'
          cornerRadius={20}
          className=' stroke-transparent stroke-2'
        />

        <RadialBar
          dataKey='monitored'
          stackId='a'
          fill='var(--color-monitored)'
          cornerRadius={20}
          className=' stroke-transparent stroke-2'
        />

        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className=' fill-foreground text-2xl font-bold'
                    >
                      {totalLimit.toLocaleString()}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
      </RadialBarChart>
    </ChartContainer>
  );
};

export default AppRadialChart;
