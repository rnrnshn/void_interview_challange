import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AgriInputs } from "./components/AgriInputs";
import { Login } from "./components/Login";
import { saveAuthToken } from "./utils/api";
import { ProgressReport } from "./components/Progress_Report";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      saveAuthToken(token);
    }
  }, [token]);

  const handleOnLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    saveAuthToken(token);
    setToken(token);
  };

  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleOnLoginSuccess} />} />
        <Route path="/dashboard" element={token ? <AgriInputs /> : <Navigate to="/login" />} />
        <Route path="/reports" element={token ? <ProgressReport /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
