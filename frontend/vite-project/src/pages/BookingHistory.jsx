import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BookingHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/history/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchAppointments();
    }
  }, [email, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Booking History
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {appointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Dr. {appointment.doctorName}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Reason: <span className="font-medium">{appointment.reason}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Date:{" "}
                <span className="font-medium">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Time:{" "}
                <span className="font-medium">{appointment.preferredTime}</span>
              </p>
              {appointment.notes && (
                <p className="text-sm text-gray-500 italic">
                  Notes: {appointment.notes}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookingHistory;
