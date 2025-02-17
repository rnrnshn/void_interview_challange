import { useEffect, useState } from "react";
import { AgriInputs } from "./components/AgriInputs";
import { Login } from "./components/Login"
import { saveAuthToken } from "./utils/api";


function App() {

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  
  useEffect(() => {
    if(token) {
      saveAuthToken(token);
    }
  }, [token])

  const handleOnLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    saveAuthToken(token);
    setToken(token);
  }

  return (
    <div>
      {token ? (
        <AgriInputs />
      ) : (
        <Login onLoginSuccess={handleOnLoginSuccess}/>
      )}
    </div>
  )
}

export default App