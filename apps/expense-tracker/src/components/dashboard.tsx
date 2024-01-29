// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ExpenseForm } from './expenseForm';
import { ExpenseList } from './expenseList';
import { db, auth } from '../config/firebase';
import { User } from 'firebase/auth'; 
import TableCard from './tableCard';
import { Card, Col, Row} from 'antd';
import SimpleLineChart from './chartOne';
import TwoLevelPieChart from './PieChart';

export interface Expense {
  id: string;
  Date: string;
  Description: string;
  Amount: number;
  type: string;
  category: string;
}

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  // Use the user's unique ID (uid) to reference the user's expenses collection
  const expensesCollectionRef = collection(db, 'users', user.uid, 'expenses');

  const [newExpenseDate, setNewExpenseDate] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newExpenseType, setNewExpenseType] = useState('income');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');

  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    const getExpenseList = async () => {
      try {
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);

        const data = await getDocs(expensesCollectionRef);
        const filteredData: Expense[] = data.docs.map((doc) => ({
          id: doc.id,
          Description: doc.data().description,
          Amount: doc.data().amount,
          Date: doc.data().date,
          type: doc.data().type,
          category: doc.data().category,
        }))
        .filter((expense) => {
          const expenseDate = new Date(expense.Date);
          return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
        });
        setExpenseList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getExpenseList();
  }, [expensesCollectionRef]);

  const submitExpense = async () => {
    try {
      await addDoc(expensesCollectionRef, {
        date: newExpenseDate,
        description: newExpenseDescription,
        amount: newExpenseAmount,
        type: newExpenseType,
        category: newExpenseCategory,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id: string) => {
    const expenseDoc = doc(db, 'users', user.uid, 'expenses', id);
    await deleteDoc(expenseDoc);
  };

  const incomeCategories = ['Rent', 'Utilities', 'Food', 'Travel', 'Subscriptions', 'Shopping'];
  const outcomeCategories = ['Rent', 'Utilities', 'Food', 'Travel', 'Subscriptions', 'Shopping'];

  const incomeTotalData = incomeCategories.map((category) => ({
    label: category,
    value: expenseList
      .filter((expense) => expense.type === 'income' && expense.category === category)
      .reduce((total, expense) => total + expense.Amount, 0),
  }));

  const outcomeTotalData = outcomeCategories.map((category) => ({
    label: category,
    value: expenseList
      .filter((expense) => expense.type === 'outcome' && expense.category === category)
      .reduce((total, expense) => total + expense.Amount, 0),
  }));


  return (
    <>
      {/* <Card style={{height:'100vh'}}>

          <Row style={{height:'50vh', width:'200vw'}}>
            <Col xs={{ span: 24 }} md={{span: 24 }} lg={{ span: 24 }}>
              <TableCard expenseList = {expenseList} deleteExpense={deleteExpense} />
            </Col>
          </Row>

          <Row style={{height:'30vh'}}>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <SimpleLineChart expenseList={expenseList} />
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              Col
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              Col
            </Col>
          </Row>
          
      </Card> */}

<div>
      <Row>
        <Col span={24} style={{width: '100%', padding: '0'}}>
        <TableCard expenseList = {expenseList} deleteExpense={deleteExpense} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
        <SimpleLineChart expenseList={expenseList} />
        </Col>
        <Col span={12}>
        <TwoLevelPieChart incomeData={incomeTotalData} outcomeData={outcomeTotalData} />
        </Col>
      </Row>
    </div>

    <ExpenseForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={submitExpense}
        onDateChange={setNewExpenseDate}
        onDescriptionChange={setNewExpenseDescription}
        onAmountChange={setNewExpenseAmount}
        onTypeChange={setNewExpenseType}
        onCategoryChange={setNewExpenseCategory}
      />
      {/* <ExpenseList expenseList={expenseList} onDeleteExpense={deleteExpense} /> */}

    </>
  );
};

export default Dashboard;
