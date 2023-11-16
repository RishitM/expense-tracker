import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';

const Expenses = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('expenses').doc(user.uid).onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setExpenses(snapshot.data().expenses || []);
      } else {
        firestore.collection('expenses').doc(user.uid).set({ expenses: [] });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleAddExpense = () => {
    if (newExpense.trim() !== '') {
      const updatedExpenses = [...expenses, newExpense];
      firestore.collection('expenses').doc(user.uid).update({ expenses: updatedExpenses });
      setNewExpense('');
    }
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add expense"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default Expenses;