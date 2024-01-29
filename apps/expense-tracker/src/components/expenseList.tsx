// // components/ExpenseList.tsx
// import React from 'react';

// interface Expense {
//   id: string;
//   Date: string;
//   Description: string;
//   Amount: number;
//   type: string;
// }

// interface ExpenseListProps {
//   expenseList: Expense[];
//   onDeleteExpense: (id: string) => void;
// }

// export function ExpenseList(props: ExpenseListProps) {
//   const { expenseList, onDeleteExpense } = props;

//   // ExpenseList component implementation

//   return (
//     <div>
//       {expenseList.map((expense) => (
//         <div key={expense.id}>
//           <h1>{expense.Description}</h1>
//           <h2>{expense.Amount}</h2>
//           <h2>{expense.Date}</h2>
//           <h2>{expense.type}</h2>
//           <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
//           <input type="text" placeholder='' />
//         </div>
//       ))}
//     </div>
//   );
// }




import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Expense {
  id: string;
  Date: string;
  Description: string;
  Amount: number;
  type: string;
  category: string;
}

interface ExpenseListProps {
  expenseList: Expense[];
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList(props: ExpenseListProps) {
  const { expenseList, onDeleteExpense } = props;

  // ExpenseList component implementation

  return (
    // <div>
    //   {expenseList.map((expense) => (
    //     <div key={expense.id}>
    //       <h1>{expense.Description}</h1>
    //       <h2>{expense.Amount}</h2>
    //       <h2>{expense.Date}</h2>
    //       <h2>{expense.type}</h2>
    //       <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
    //       <input type="text" placeholder='' />
    //     </div>
    //   ))}
    // </div>

<TableContainer component={Paper}>
<Table sx={{ minWidth: 700 }} aria-label="customized table">
  <TableHead>
    <TableRow>
      <StyledTableCell>Date</StyledTableCell>
      <StyledTableCell align="right">Description</StyledTableCell>
      <StyledTableCell align="right">Amount</StyledTableCell>
      <StyledTableCell align="right">Type</StyledTableCell>
      <StyledTableCell align="right">Category</StyledTableCell>
      <StyledTableCell align="right">Actions</StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {expenseList.map((expense) => (
      <StyledTableRow key={expense.id}>
        <StyledTableCell component="th" scope="row">{expense.Date}</StyledTableCell>
        <StyledTableCell align="right">{expense.Description}</StyledTableCell>
        <StyledTableCell align="right">{expense.Amount}</StyledTableCell>
        <StyledTableCell align="right">{expense.type}</StyledTableCell>
        <StyledTableCell align="right">{expense.category}</StyledTableCell>
        <StyledTableCell align="right"><button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
</StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
  );
}
