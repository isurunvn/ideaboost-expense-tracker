// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Auth } from '../components/auth';
import styles from './app.module.css';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';


interface Expense {
  id: string;
  Date: string;
  Description: string; // Add Description property with string type
  Amount: number; // Add Amount property with number type
  type: string;
}

export function App() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  const [newExpenseDate, setNewExpenseDate] = useState("");
  const [newExpenseDescription, setNewExpenseDescription] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newExpenseType, setNewExpenseType] = useState("");

  const expensesCollectionRef = collection(db, "expenses");

  useEffect(() => {
    const getExpenseList = async () => {
      try {
        const data = await getDocs(expensesCollectionRef);
        const filteredData: Expense[] = data.docs.map((doc) => ({
          id: doc.id,
          Description : doc.data().description,
          Amount : doc.data().amount,
          Date : doc.data().date,
          type : doc.data().type,
        }));
        setExpenseList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getExpenseList();
  }, []);

  const submitExpense = async () => {
    try{
      await addDoc(expensesCollectionRef, {
        date: newExpenseDate,
        description: newExpenseDescription,
        amount: newExpenseAmount,
        type: newExpenseType
      });
    }catch (err) {
      console.log(err);   
    }
  };

  const deleteExpense = async (id: string)=> {
    const expenseDoc = doc(db, "expenses", id);
     await deleteDoc(expenseDoc);
  };

  return (
    <div className='App'>
      <Auth/>

        <div>
          <input type="datetime-local" placeholder='Date'
          onChange={(e) => setNewExpenseDate(e.target.value)} />
          <input type="text" placeholder='Description'
          onChange={(e) => setNewExpenseDescription(e.target.value)} />
          <input type="number" placeholder='Amount'
          onChange={(e) => setNewExpenseAmount(Number(e.target.value))} />
          <input type="text" placeholder='Income or Outcome'
          onChange={(e) => setNewExpenseType(e.target.value)} />
          <button onClick={submitExpense}>Submit</button>
        </div>


        <div>
          {expenseList.map((expense) => (
            <div key={expense.id}>
              
              <h1>{expense.Description}</h1>
              <h2>{expense.Amount}</h2>
              <h2>{expense.Date}</h2>
              <h2>{expense.type}</h2>

              <button onClick={()=> deleteExpense(expense.id)}>
                Delete
              </button>

            </div>
          ))}
        </div>

    </div>
  );
}

export default App;
