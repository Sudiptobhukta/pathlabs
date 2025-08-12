// src/pages/BookAppointment.jsx
import React, { useState } from "react";
import axios from "axios";

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
      const token = localStorage.getItem("token"); // Adjust based on your auth setup
      const email = JSON.parse(localStorage.getItem("user")).email;
      const res = await axios.post(
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Appointment booked successfully!");
      setDoctorName("");
      setReason("");
      setAppointmentDate("");
      setPreferredTime("");
      setNotes("");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setMessage("Failed to book appointment.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
        <p className="text-gray-600">Schedule a new appointment</p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-3"
          />

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-3"
          />

          <input
            type="time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-3"
          />

          <textarea
            placeholder="Reason for Appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-3"
          />

          <textarea
            placeholder="Additional Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
          />

          {message && (
            <p className="text-center text-sm text-green-600 font-medium">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 w-full"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
