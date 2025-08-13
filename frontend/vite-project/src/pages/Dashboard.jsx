// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Chatbot from "../components/Chatbot";
import Navabar from "../components/Navabar";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => setShowChatbot(!showChatbot);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.name || "John";
  const companyName = "HealthCare Diagnostics";

  const handleCardClick = (path) => {
    navigate(path);
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 }
    }),
    hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        {/* Navbar */}
        <Navabar username={username} companyName={companyName} />

        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Welcome, <span className="text-blue-600">{username}</span> 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mt-2"
          >
            Your health, tests, and appointments — all in one place.
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "📅 Book Appointment",
              desc: "Schedule your lab test or consultation with ease.",
              color: "from-blue-100 to-blue-200",
              text: "text-blue-800",
              path: "/book-appointment"
            },
            {
              title: "🩺 Test Appointments",
              desc: "Check and manage your upcoming test schedules.",
              color: "from-pink-100 to-pink-200",
              text: "text-pink-800",
              path: "/test-appointment"
            },
            {
              title: "👤 Profile Settings",
              desc: "Manage your personal details and contact info.",
              color: "from-yellow-100 to-yellow-200",
              text: "text-yellow-800",
              path: "/settings"
            },   
            {
              title: "📖 Booking History",
              desc: "Review your appointment bookings and their current status.",
              color: "from-purple-100 to-purple-200",
              text: "text-purple-800",
              path: "/bookinghistory"
            },
            {
              title: "🧪 Test History",
              desc: "View your past diagnostic reports and health history.",
              color: "from-green-100 to-green-200",
              text: "text-green-800",
              path: "/test-results"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`cursor-pointer p-6 bg-gradient-to-br ${card.color} rounded-xl shadow-md`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={i}
              onClick={() => handleCardClick(card.path)}
            >
              <h2 className={`text-xl font-semibold mb-2 ${card.text}`}>
                {card.title}
              </h2>
              <p className={`text-sm ${card.text.replace("800", "600")}`}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Floating Chatbot Button */}
        <motion.button
          onClick={toggleChatbot}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬
        </motion.button>

        {/* AI Chatbot Panel */}
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Chatbot />
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
