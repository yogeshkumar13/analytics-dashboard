import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {isAuth ? (
        <Dashboard setIsAuth={setIsAuth} />
      ) : showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login
          setIsAuth={setIsAuth}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
}

export default App;