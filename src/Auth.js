import React, { useState } from 'react';
import { auth } from './firebase';
import {StyleSheet,View} from 'react-native';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert('Error signing in!');
      console.error('Error signing in:', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert('Account Already Exists!');
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <View style={styles.container}>    
    <div>
      <h2  style={styles.header}>Expense Tracker</h2>
    </div>
      <input
        style={styles.inputBox}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.inputBox}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} style={styles.button} >Sign In</button>
      <button onClick={handleSignUp} style={styles.button} >Sign Up</button>
    
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"beige",
    flex:1
  },
  header:{
    flex:1,
    fontSize:'40px',
  },
  inputBox:{
    marginBottom:'15px'
  },
  button:{
    marginBottom:'15px'
  }
})
export default Auth;