import React from "react";
import { AuthProvider, useAuth } from "./context/authContext";
import Signup from "./Pages/Signup";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./Pages/Dashboard";
import Signin from "./Pages/Signin";
import SignupDriver from "./Pages/SignupDriver";
import DriverDashboard from "./Pages/DriverDashboard";

const App = () => {
  const { isLoggedIn ,user} = useAuth();

  return (
    <Routes>
      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup/driver"
        element={!isLoggedIn ? <SignupDriver /> : <Navigate to="/driver/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn
            ? (user.role === 'RIDER' ? <Dashboard /> : <Navigate to="/driver/dashboard" />)
            : <Navigate to="/signin" />
        }
      />
      <Route
        path="/driver/dashboard"
        element={
          isLoggedIn
            ? (user.role === 'DRIVER' ? <DriverDashboard /> : <Navigate to="/dashboard" />)
            : <Navigate to="/signin" />
        }
      />
      <Route
        path="/signin"
        element={!isLoggedIn ? <Signin /> : <Navigate to="/dashboard" />}
      />
      <Route path="*" element={<Navigate to="/signup" />} />
      
    </Routes>
  );
};

export default App;