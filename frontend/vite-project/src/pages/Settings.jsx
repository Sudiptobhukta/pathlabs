import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Settings = () => {
  const [user, setUser] = useState(null);
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
        setUser(res.data);
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

  if (!email) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen px-6 py-10">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-700">Settings</h1>
        <p className="text-gray-600">Manage your preferences and account</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-8 max-w-2xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-600 rounded cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {message && (
          <motion.p
            className={`text-sm mt-3 text-center font-medium ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
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
    </div>
  );
};

export default Settings;
