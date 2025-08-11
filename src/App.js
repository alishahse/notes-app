import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Notes from './components/Notes';

// DefaultRoute component — checks if user logged in
const DefaultRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/notes" /> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />

       {/* Notes is now protected
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }    
          />   */}

          {/* Dashboard also protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
