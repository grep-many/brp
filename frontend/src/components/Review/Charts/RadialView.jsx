import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

const RadialView = ({
  data = [
    { label: '5 Stars', value: 10, color: 'var(--chart-1)' },
    { label: '4 Stars', value: 7, color: 'var(--chart-2)' },
    { label: '3 Stars', value: 5, color: 'var(--chart-3)' },
    { label: '2 Stars', value: 2, color: 'var(--chart-4)' },
    { label: '1 Star', value: 1, color: 'var(--chart-5)' },
  ],
}) => {
  // Filter out zero-value entries
  const filteredData = data.filter((d) => d.value > 0);

  const total = filteredData.reduce((sum, d) => sum + d.value, 0);

  const chartConfig = filteredData.reduce((acc, item, i) => {
    acc[item.label] = {
      label: item.label,
      color: item.color || `var(--chart-${i + 1})`,
    };
    return acc;
  }, {});

  return (
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={filteredData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 4}
                          className="fill-muted-foreground"
                        >
                          Reviews
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {filteredData.map((item) => (
              <RadialBar
                key={item.label}
                dataKey="value"
                stackId="a"
                cornerRadius={5}
                fill={item.color}
                className="stroke-transparent stroke-2"
                data={[item]}
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
  );
};

export default RadialView;
