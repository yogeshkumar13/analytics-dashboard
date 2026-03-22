import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {isAuth ? (
        <Dashboard />
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