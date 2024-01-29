import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

interface TwoLevelPieChartProps {
  incomeData: { label: string; value: number }[];
  outcomeData: { label: string; value: number }[];
}

const TwoLevelPieChart: React.FC<TwoLevelPieChartProps> = ({ incomeData, outcomeData }) => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: incomeData,
        },
        {
          innerRadius: 100,
          outerRadius: 120,
          data: outcomeData,
        },
      ]}
      width={400}
      height={300}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
};

export default TwoLevelPieChart;
