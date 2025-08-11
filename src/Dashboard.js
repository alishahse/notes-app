import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Notes from './components/Notes';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        <h2>Welcome, {user?.email}</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <Notes />
    </div>
  );
};

export default Dashboard;

