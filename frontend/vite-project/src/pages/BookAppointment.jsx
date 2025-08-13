// src/pages/BookAppointment.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BookAppointment = () => {
  const [doctorName, setDoctorName] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const email = JSON.parse(localStorage.getItem("user")).email;

      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          email,
          doctorName,
          reason,
          appointmentDate,
          preferredTime,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Appointment booked successfully!");
      setDoctorName("");
      setReason("");
      setAppointmentDate("");
      setPreferredTime("");
      setNotes("");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setMessage("❌ Failed to book appointment.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-purple-50 to-white">
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-purple-700"
        >
          Book Appointment
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600"
        >
          Schedule a new appointment with your preferred doctor
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white shadow-xl rounded-xl p-8 max-w-xl mx-auto border border-purple-100"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            required
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <textarea
            placeholder="Reason for Appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <textarea
            placeholder="Additional Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center text-sm font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 w-full font-semibold shadow-lg transition"
          >
            Book Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
