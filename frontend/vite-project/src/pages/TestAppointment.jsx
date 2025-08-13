// src/pages/TestAppointment.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FlaskConical, CalendarClock, Loader2 } from "lucide-react";

const TestAppointment = () => {
  const [form, setForm] = useState({ testName: "", date: "", time: "" });
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  // Same accent palette + structure as TestHistory
  const availableTests = [
    { name: "Complete Blood Count (CBC)" },
    { name: "Lipid Profile" },
    { name: "Blood Sugar Test" },
    { name: "Thyroid Function Test" },
    { name: "Liver Function Test" },
    { name: "Kidney Function Test" },
    { name: "Urine Analysis" },
    { name: "Vitamin D Test" },
    { name: "Covid-19 RT-PCR" },
  ];

  const email = JSON.parse(localStorage.getItem("user"))?.email || "";

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.testName || !form.date || !form.time) {
      setStatus({ type: "error", text: "Please complete all fields." });
      return;
    }
    if (!email) {
      setStatus({ type: "error", text: "User email not found. Please log in again." });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/test/testbook", {
        email,
        testName: form.testName,
        date: form.date,
        time: form.time,
        notes,
      });

      setStatus({ type: "success", text: "Test appointment booked successfully!" });
      setForm({ testName: "", date: "", time: "" });
      setNotes("");
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Failed to book test.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      {/* Optional global background if you want it here too */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Gradient header (matches TestHistory) */}
          <div className="px-6 py-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Book a Lab Test</h1>
            </div>
            <p className="opacity-90 mt-1">
              Choose a test, pick a slot. It’ll appear in your Test History instantly.
            </p>
          </div>

          {/* Form card */}
          <div className="p-6 space-y-6">
            {status.text && (
              <div
                className={`p-3 rounded-lg text-sm border ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Test select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Test
                </label>
                <select
                  name="testName"
                  value={form.testName}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">— Choose a test —</option>
                  {availableTests.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Any special instructions for the lab..."
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2 text-gray-500 text-sm">
                  <CalendarClock className="w-4 h-4" />
                  <span>Your slot is held for 10 minutes.</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-medium px-5 py-2.5 rounded-xl transition"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Booking…" : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestAppointment;
