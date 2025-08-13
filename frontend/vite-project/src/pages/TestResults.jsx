// components/TestHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/test/testhistory/${email}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching test history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchHistory();
    }
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-blue-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Test History
      </motion.h2>

      {history.length === 0 ? (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No test appointments found.
        </motion.p>
      ) : (
        <motion.div
          className="overflow-x-auto bg-white shadow-lg rounded-lg p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Test Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Booked On</th>
              </tr>
            </thead>
            <tbody>
              {history.map((test, index) => (
                <motion.tr
                  key={test._id}
                  className={`border-b hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-4 py-2">{test.testName}</td>
                  <td className="px-4 py-2">{new Date(test.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{test.time}</td>
                  <td className="px-4 py-2">{new Date(test.createdAt).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default TestHistory;
