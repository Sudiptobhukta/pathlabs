import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, FlaskConical, Users, Stethoscope } from "lucide-react"; // icons

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
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");

  // updated doctor state
  const [newTest, setNewTest] = useState({ name: "", description: "", price: "" });
  const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "", email: "" });

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

    axios.get("/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));

    axios.get("/alltests")
      .then(res =>setTests(res.data))
      .catch(err => console.error(err));
  }, []);

  // delete functions
  const handleDeleteAppointment = (orderid, email) => {
    axios.delete(`appointments/del/${email}`, { data: { orderid, email } })
      .then(() => setAppointments(prev => prev.filter(appt => !(appt.orderid === orderid && appt.userEmail === email))))
      .catch(err => console.error(err));
  };

  const handleDeleteTest = (orderid, email) => {
    axios.delete(`test/del/${email}`, { data: { orderid, email } })
      .then(() => setTestBookings(prev => prev.filter(test => !(test.orderid === orderid && test.userEmail === email))))
      .catch(err => console.error(err));
  };

  const handleDeleteUser = (email) => {
    axios.delete(`/auth/users/${email}`)
      .then(() => setUsers(prev => prev.filter(user => user.email !== email)))
      .catch(err => console.error(err));
  };

  const handleDeleteDoctor = (email) => {
    axios.delete(`/doctors/${email}`)
      .then(() => setDoctors(prev => prev.filter(doc => doc.email !== email)))
      .catch(err => console.error(err));
  };

  
const handleAddTest = (e) => {
  e.preventDefault();
  axios.post("/alltests", newTest)
    .then(res => {
      setTests(prev => [...prev, res.data]);  // append new test to state
      setNewTest({ name: "", description: "", price: "" });  // reset form
    })
    .catch(err => console.error(err));
};

  

  const handleAddDoctor = (e) => {
    e.preventDefault();
    axios.post("/doctors", newDoctor)
      .then(res => {
        setDoctors(prev => [...prev, res.data]);
        setNewDoctor({ name: "", specialization: "", email: "" });
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 hover:shadow-xl transition">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Stethoscope className="text-yellow-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Doctors</h3>
            <p className="text-2xl font-bold text-yellow-600">{doctors.length}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 hover:shadow-xl transition">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Stethoscope className="text-yellow-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Test Tyes</h3>
            <p className="text-2xl font-bold text-yellow-600">{tests.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 animate-slideIn">
        {[
          { label: "Appointments", value: "appointments" },
          { label: "Test Bookings", value: "tests" },
          { label: "Users", value: "users" },
          { label: "Doctors", value: "doctors" },
          {label: 'Test' , value: "testt"},
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
        {/* Doctors */}
        {activeTab === "doctors" && (
          <>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">All Doctors</h2>
            <form onSubmit={handleAddDoctor} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Doctor Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="border p-2 rounded w-1/4"
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, specialization: e.target.value })
                }
                className="border p-2 rounded w-1/4"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                className="border p-2 rounded w-1/4"
                required
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Doctor
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Specialization</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 border">{doc.name}</td>
                      <td className="p-3 border">{doc.specialization}</td>
                      <td className="p-3 border">{doc.email}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDeleteDoctor(doc.email)}
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
        {/* test types*/}
        {activeTab === "testt" && (
         <>
    <h2 className="text-xl font-semibold text-blue-600 mb-4">All Tests</h2>
    <form onSubmit={handleAddTest} className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Test Name"
        value={newTest.name}
        onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
        className="border p-2 rounded w-1/4"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={newTest.description}
        onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
        className="border p-2 rounded w-1/4"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={newTest.price}
        onChange={(e) => setNewTest({ ...newTest, price: e.target.value })}
        className="border p-2 rounded w-1/4"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Test
      </button>
    </form>
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition-colors">
              <td className="p-3 border">{test.name}</td>
              <td className="p-3 border">{test.description}</td>
              <td className="p-3 border">₹{test.price}</td>
              <td className="p-3 border">
                <button
                  onClick={() => handleDeleteTest(test._id)}
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

        {/* existing appointments, tests, users remain same */}
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
    </div>
  );
}
