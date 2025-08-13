import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  function formatDateToCustom(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const suffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    return `${day}${suffix(day)} ${month} ${year}`;
  }

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [testBookings, setTestBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/all")
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/api/test/all")
      .then(res => res.json())
      .then(data => setTestBookings(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/api/auth/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 animate-fadeIn">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 animate-slideIn">
        {[
          { label: "Appointments", value: "appointments" },
          { label: "Test Bookings", value: "tests" },
          { label: "Users", value: "users" },
        ].map((tab) => (
          <button
            key={tab.value}
            className={`px-5 py-2 rounded-lg shadow-sm font-medium transition-all duration-300 ${
              activeTab === tab.value
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-xl p-6 animate-fadeIn">
        {/* Appointments */}
        {activeTab === "appointments" && (
          <>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">All Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">User Email</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{appt.userEmail}</td>
                      <td className="p-3 border">{appt.doctorName}</td>
                      <td className="p-3 border">{formatDateToCustom(appt.appointmentDate)}</td>
                      <td className="p-3 border">{appt.preferredTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Test Bookings */}
        {activeTab === "tests" && (
          <>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">All Test Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">User Email</th>
                    <th className="p-3">Test Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {testBookings.map((test, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{test.userEmail}</td>
                      <td className="p-3 border">{test.testName}</td>
                      <td className="p-3 border">{formatDateToCustom(test.date)}</td>
                      <td className="p-3 border">{test.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{user.name}</td>
                      <td className="p-3 border">{user.email}</td>
                      <td className="p-3 border">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-slideIn {
            animation: slideIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
