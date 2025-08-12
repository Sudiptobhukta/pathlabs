import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [user, setUser] = useState(null); // Will store fetched user data
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Mock: Replace this with actual auth context or fetch logic
  console.log(localStorage.getItem)
  const email = JSON.parse(localStorage.getItem("user")).email; // Assumes login stores user ID
  const token = localStorage.getItem("token"); // Optional: For protected routes
 
  useEffect(() => {
    // Fetch current user data on mount
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${email}`);
        console.log(res)
        setUser(res.data);
        setName(res.data.name);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    if (email) fetchUser();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:5000/api/auth/users/${email}`, {
        name,
        password,
      });

      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your preferences and account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 max-w-3xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            className="w-full mt-1 p-3 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Settings;
