import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Signup function
  const signup = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password,
    });

    // store token
    localStorage.setItem("token", res.data.token);

    // set user state
    setUser(res.data.user);
  };

  // Login function
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
