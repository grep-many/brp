import { useMemo } from 'react';
import { CardContent } from '@/components/ui/card';

/**
 * Props:
 * - data: array of objects [{ label: string, value: number, color?: string }]
 */
const BarView = ({ data = [] }) => {
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  // Calculate percentage for each rating
  const dataWithPercentage = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        percentage: total ? Math.round((d.value / total) * 100) : 0,
      })),
    [data, total],
  );

  return (
    <CardContent className="space-y-2">
      {dataWithPercentage.map((d, i) => (
        <div key={d.label} className="flex items-center gap-2">
          {/* Label */}
          <span className="w-20 text-sm">{d.label}</span>

          {/* Outline bar */}
          <div className="flex-1 h-4 rounded border border-gray-300 relative overflow-hidden">
            {/* Fill */}
            <div
              className="h-4 rounded-l"
              style={{
                width: `${d.percentage}%`,
                backgroundColor: d.color || `var(--chart-${i + 1})`,
              }}
            />
          </div>

          {/* Percentage text */}
          <span className="w-12 text-sm text-right">{d.percentage}%</span>
        </div>
      ))}
    </CardContent>
  );
};

export default BarView;