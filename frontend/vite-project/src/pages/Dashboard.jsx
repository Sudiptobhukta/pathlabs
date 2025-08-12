// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Chatbot from "../components/Chatbot";
import Navabar from "../components/Navabar";

function Dashboard() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => setShowChatbot(!showChatbot);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser)
  const username = storedUser?.name || "John";
  // const username = "John"; // Replace with actual user data from DB
  const companyName = "HealthCare Diagnostics";

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Navbar */}
        <Navabar username={username} companyName={companyName}/>  

        {/* Cards Section */}
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-6 mt-8">
          <div
            onClick={() => handleCardClick("/book-appointment")}
            className="cursor-pointer p-6 bg-blue-100 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">📅 Book Appointment</h2>
            <p className="text-sm text-blue-700">
              Schedule your lab test or consultation with ease.
            </p>
          </div>

          <div
            onClick={() => handleCardClick("/test-results")}
            className="cursor-pointer p-6 bg-green-100 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">🧪 Test History</h2>
            <p className="text-sm text-green-700">
              View your past diagnostic reports and health history.
            </p>
          </div>

          <div
            onClick={() => handleCardClick("/settings")}
            className="cursor-pointer p-6 bg-yellow-100 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">👤 Profile Settings</h2>
            <p className="text-sm text-yellow-700">
              Manage your personal details and contact info.
            </p>
          </div>

          <div
            onClick={() => handleCardClick("/notifications")}
            className="cursor-pointer p-6 bg-red-100 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-red-800 mb-2">📧 Notifications</h2>
            <p className="text-sm text-red-700">
              Stay updated on reports, bookings, and more.
            </p>
          </div>

          <div
        onClick={() => handleCardClick("/bookinghistory")}
        className="cursor-pointer p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-purple-800 mb-2">📖 Booking History</h2>
        <p className="text-sm text-purple-700">
          Review your appointment bookings and their current status.
        </p>
      </div>
    <div
            onClick={() => handleCardClick("/test-appointment")}
            className="cursor-pointer p-6 bg-blue-100 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">📅 Test Appointments</h2>
            <p className="text-sm text-blue-300">
              Schedule your lab test or consultation with ease.
            </p>
          </div>

        </div>



        {/* AI Chatbot Panel */}
        {showChatbot &&  <div >
            <Chatbot/>
          </div>}
      </div>
    </Layout>
  );
}

export default Dashboard;
