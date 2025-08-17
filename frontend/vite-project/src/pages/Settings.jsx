import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, LogOut, Shield } from "lucide-react";

const Settings = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    if (email) fetchUser();
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/auth/${email}`,
        { name, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!email) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
          <div>
            <motion.h1
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Settings
            </motion.h1>
            <p className="text-blue-100 text-sm">Manage your account & preferences</p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Profile & Security Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 border-b pb-3">
            <User className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Profile & Security</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {message && (
            <motion.p
              className={`text-sm mt-3 font-medium ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {message}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full font-semibold shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Changes
          </motion.button>
        </motion.form>

        {/* Security Tip */}
        <motion.div
          className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg shadow-md flex items-start space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Shield className="text-blue-600 flex-shrink-0" size={28} />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Security Tip</h3>
            <p className="text-gray-700 text-sm mt-1">
              Use a strong password with at least 12 characters, including uppercase, lowercase, numbers, 
              and symbols. Avoid using the same password across multiple accounts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
