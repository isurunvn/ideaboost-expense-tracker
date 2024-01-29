import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Expense } from './dashboard';
// import { ExpenseList } from './expenseList';

interface SimpleLineChartProps {
    expenseList: Expense[];
  }

// const xLabels = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
// ];



const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ expenseList }) => {
    // Extract Incomes and Outcomes data from expenseList
    const pData: number[] = expenseList
      .filter((expense) => expense?.type === 'income' && typeof expense?.Amount === 'number')
      .map((income) => income?.Amount);
  
    const uData: number[] = expenseList
      .filter((expense) => expense?.type === 'outcome' && typeof expense?.Amount === 'number')
      .map((outcome) => outcome?.Amount);
 

    const xLabels = 
    expenseList.map((expense, index) => (index+1).toString());

    return (
      <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Income', id: 'pvId' },
        { data: uData, label: 'Outcome', id: 'uvId' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root, .MuiMarkElement-root': {
          strokeWidth: 1,
        },
        '.MuiLineElement-series-pvId': {
          strokeDasharray: '5 5',
        },
        '.MuiLineElement-series-uvId': {
          strokeDasharray: '3 4 5 2',
        },
        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
          fill: '#fff',
        },
        '& .MuiMarkElement-highlighted': {
          stroke: 'none',
        },
      }}
    />
    );
  };
  
  export default SimpleLineChart;


