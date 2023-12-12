import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Auth from './Auth';
import Expenses from './expenses';
import {StyleSheet} from 'react-native';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App" style={styles.container}>
      {user ? <Expenses user={user} /> : <Auth />}
    </div>
  );
}
const styles=StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:"beige",
    height:'800px',
    padding:'40px'
  }

})
export default App;