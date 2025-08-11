import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    login(email, password); // password abhi backend pe bhejna hoga
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
      />
      <button
        type="submit"
        style={{ padding: "10px", width: "100%", cursor: "pointer" }}
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
