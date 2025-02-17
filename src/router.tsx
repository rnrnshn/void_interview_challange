import { createBrowserRouter, Navigate } from "react-router-dom";
import { AgriInputs } from "./components/AgriInputs";
import { Login } from "./components/Login";
import { saveAuthToken } from "./utils/api";
import { ProgressReport } from "./components/Progress_Report";

const token = localStorage.getItem("authToken");

const handleOnLoginSuccess = (token) => {
  localStorage.setItem("authToken", token);
  saveAuthToken(token);
  window.location.href = "/dashboard";
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return token ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: token ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleOnLoginSuccess} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><AgriInputs /></ProtectedRoute>,
  },
  {
    path: "/analysis-progress",
    element: <ProtectedRoute><ProgressReport /></ProtectedRoute>,
  },
]);
