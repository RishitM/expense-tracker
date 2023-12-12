import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';
import {StyleSheet} from 'react-native';
import { View } from 'react-native-web';

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
            <button onClick={handleSignOut} style={styles.signOut}>Sign Out</button>
      <View  style={styles.container}>
      <h2>Welcome, {user.email}</h2>
      <h2>Your Expenses:</h2>
      <p>
      <ol>
        {expenses.map((expense, index) => (
          <li key={index}>{expense}</li>
        ))}
      </ol>
      </p>
      <input
        type="text"
        placeholder="Add expense"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddExpense}>Add Expense</button>
      </View>
      </div>
     

  );
};
const styles=StyleSheet.create({
  ul:{
    margin:'0px',
    padding:'0px',
    overflow:'hidden',


  },
li:{
  float:'left'
},
signOut:{
  marginLeft:'95%'
},
container:{
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:"beige",
  flex:1
},
input:{
  marginBottom:'10px',
}
})



export default Expenses;