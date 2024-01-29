import { Card, Col, Pagination} from 'antd';
import React, { useState } from 'react';
import { Expense } from './dashboard';
import { ExpenseList } from './expenseList';

interface TableCardProps {
  expenseList: Expense[];
  deleteExpense: (id: string) => Promise<void>;
}

const TableCard: React.FC<TableCardProps> = ({ expenseList, deleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Calculate the starting and ending indices based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = expenseList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Col xs={24} style={{padding: '0'}}>
      <div style={{ margin: '20px' }}>
        <Card style={{ backgroundColor: '#E8E9EE', width: '100%' }}>
          <Card.Meta
            title={<p style={{ fontSize: '30px', textAlign: 'right', marginBottom: 0 }}>Recent Transactions</p>}
            description={
              <p style={{ fontSize: '18px', textAlign: 'right', marginTop: 0 }}>
                <ExpenseList expenseList={paginatedData} onDeleteExpense={deleteExpense} />
                <Pagination
                  current={currentPage}
                  total={expenseList.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  style={{ marginTop: '10px', textAlign: 'right' }}
                />
              </p>
            }
          />
        </Card>
      </div>
    </Col>
  );
};

export default TableCard;