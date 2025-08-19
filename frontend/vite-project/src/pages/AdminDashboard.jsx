import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, FlaskConical, Users } from "lucide-react"; // icons

axios.defaults.baseURL = "http://localhost:5000/api";

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
    axios.get("/appointments/all")
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));

    axios.get("/test/all")
      .then(res => setTestBookings(res.data))
      .catch(err => console.error(err));

    axios.get("/auth/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Updated to use orderid + email
  const handleDeleteAppointment = (orderid, email) => {
    axios.delete(`appointments/del/${email}`, {
      data: { orderid, email }
    })
      .then(() => {
        setAppointments(prev =>
          prev.filter(appt => !(appt.orderid === orderid && appt.userEmail === email))
        );
      })
      .catch(err => console.error(err));
  };

  const handleDeleteTest = (orderid, email) => {
    axios.delete(`test/del/${email}`, {
      data: { orderid, email }
    })
      .then(() => {
        setTestBookings(prev =>
          prev.filter(test => !(test.orderid === orderid && test.userEmail === email))
        );
      })
      .catch(err => console.error(err));
  };

  const handleDeleteUser = (email) => {
    axios.delete(`/auth/users/${email}`)
      .then(() => {
        setUsers(prev => prev.filter(user => user.email !== email));
      })
      .catch(err => console.error(err));
  };

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 hover:shadow-xl transition">
          <div className="bg-blue-100 p-3 rounded-full">
            <Calendar className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 hover:shadow-xl transition">
          <div className="bg-green-100 p-3 rounded-full">
            <FlaskConical className="text-green-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Tests</h3>
            <p className="text-2xl font-bold text-green-600">{testBookings.length}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 hover:shadow-xl transition">
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="text-purple-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold text-purple-600">{users.length}</p>
          </div>
        </div>
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
                    <th className="p-3">Order Id</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{appt.userEmail}</td>
                      <td className="p-3 border">{appt.doctorName}</td>
                      <td className="p-3 border">{formatDateToCustom(appt.appointmentDate)}</td>
                      <td className="p-3 border">{appt.preferredTime}</td>
                      <td className="p-3 border">{appt.orderid}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDeleteAppointment(appt.orderid, appt.userEmail)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
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
                    <th className="p-3">Order Id</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testBookings.map((test, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{test.userEmail}</td>
                      <td className="p-3 border">{test.testName}</td>
                      <td className="p-3 border">{formatDateToCustom(test.date)}</td>
                      <td className="p-3 border">{test.time}</td>
                      <td className="p-3 border">{test.orderid}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDeleteTest(test.orderid, test.userEmail)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
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
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{user.name}</td>
                      <td className="p-3 border">{user.email}</td>
                      <td className="p-3 border">{user.role}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
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
