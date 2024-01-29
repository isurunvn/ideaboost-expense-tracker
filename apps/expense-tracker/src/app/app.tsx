// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import firebase from 'firebase/auth';
import { Auth } from '../components/auth';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from '../components/dashboard';
import RootLayout from '../components/layout/RootLayout';
import AppLayout from '../components/layout/RootLayout';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard or desired route
        setIsAuthenticated(true);
        console.log(user);
        setUser(user);
        
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='App'>

    {/* <Router>
      <div>
        <Routes>
        <Route path = '/auth' element={<Auth/>}/>
        </Routes>
      {user !== null ? (
        <Routes>
        <Route path="/dashboard" element={<Dashboard user ={user} />} />
        </Routes>
        ) : (
          <Navigate to="/login" />
        )}
        </div>
    </Router> */}

      {/* <Router>
        <Routes>
          <Route path='/' element = {user !== null ?<RootLayout user={user}/>: <div>Loading...</div>}>
          <Route
            path='auth/'
            element={isAuthenticated ? <Navigate to='dashboard/' /> : <Auth />}
          />
          {isAuthenticated && user ? ( // Render the Dashboard only when user is authenticated and user is not null
            <Route path='/dashboard' element={<Dashboard user={user} />} />
          ) : null}
          </Route>
        </Routes>
      </Router> */}

    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {isAuthenticated && user ?(
          <Route path="/dashboard" element={<AppLayout user={user} />} />
        ) : (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
      </Routes>
    </Router>
    </div>
  );
}

export default App;