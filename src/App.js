import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Notes from "./components/Notes";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

// DefaultRoute component
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

          {/* Notes protected */}
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
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
