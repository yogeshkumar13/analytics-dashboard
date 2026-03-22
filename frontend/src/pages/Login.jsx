import React, { useState } from "react";
import API from "../services/api";

function Login({ setIsAuth, setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <span
            onClick={() => setShowRegister(true)}
            className="text-blue-600 font-semibold cursor-pointer ml-1"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;