import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert'
import ExpenseList from './components/ExpenseList';
import uuid from "uuid/v4";

// const initialExpenses = [{ id: uuid(), charge: "rent", amount: 1600 },
// { id: uuid(), charge: "car payment", amount: 400 },
// { id: uuid(), charge: "credit card bill", amount: 1200 }]

const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : []
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0)

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => { setAlert({ show: false }) }, 3000)
  }
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    console.log(charge, amount);
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited" });
      }
      else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      //handle alert called
      handleAlert({ type: "danger", text: `charge can't be empty value and amount has to be higher than 0` });
    }
  }
  //clear all items 
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items deleted" })
  }
  // handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" })
  }
  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} edit={edit} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} />
        <ExpenseList expenses={expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>
        total spending :<span className="total">
          ${expenses.reduce((acc, curr) => { return (acc += parseInt(curr.amount)) }, 0)}
        </span>
      </h1>



    </div>
  );
}

export default App;
