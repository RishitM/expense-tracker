import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Auth from './Auth';
import Expenses from './expenses';

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
    <div className="App">
      {user ? <Expenses user={user} /> : <Auth />}
    </div>
  );
}

export default App;