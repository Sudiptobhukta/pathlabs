import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful ✅");

      if (JSON.parse(localStorage.getItem("user"))?.role === "admin") {
        window.location.href = "/admin-dash";
      } else {
        window.location.href = "/dash";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-blue-100">Login to access your dashboard</p>
      </header>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-10 gap-10">
        
        {/* Illustration */}
        <motion.div
          className="hidden md:block w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Login Illustration"
            className="w-3/4 mx-auto drop-shadow-lg"
          />
          <p className="text-center text-gray-600 mt-4">
            Securely access your health data and manage appointments.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-center text-blue-700">
            Login to Your Account
          </h2>

          {message && (
            <p
              className={`text-center text-sm font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
