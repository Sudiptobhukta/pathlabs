// src/pages/BookAppointment.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, User, FileText, StickyNote, Shield } from "lucide-react";

const BookAppointment = () => {
  const [doctorName, setDoctorName] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const { data: order } = await axios.post("http://localhost:5000/create-order", {
        amount: 200, // INR 500
      });

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_R5bVtEig0TuV18", // replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "HealthCare Center",
        description: "Appointment Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3️⃣ Store appointment after payment success
            const token = localStorage.getItem("token");
            const email = JSON.parse(localStorage.getItem("user")).email;

            await axios.post(
              "http://localhost:5000/api/appointments/book",
              { email, doctorName, reason, appointmentDate, preferredTime, notes },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("✅ Appointment booked & payment successful!");
            setDoctorName("");
            setReason("");
            setAppointmentDate("");
            setPreferredTime("");
            setNotes("");
            setStep(1);
          } catch (err) {
            setMessage("❌ Payment succeeded but booking failed.");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      setMessage("❌ Could not initiate payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
        >
          {step === 1 ? (
            <>
              <h1 className="text-3xl font-bold text-blue-700 mb-2">Book an Appointment</h1>
              <p className="text-gray-500 mb-6">Fill in your details to proceed to payment.</p>

              <form className="space-y-5" onSubmit={handleBookingSubmit}>
                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <User className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Doctor's Name"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <Clock className="text-gray-400 mr-3" size={20} />
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>

                <div className="flex items-start border border-gray-200 rounded-lg p-3">
                  <FileText className="text-gray-400 mr-3 mt-1" size={20} />
                  <textarea
                    placeholder="Reason for Appointment"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="w-full outline-none resize-none"
                  />
                </div>

                <div className="flex items-start border border-gray-200 rounded-lg p-3">
                  <StickyNote className="text-gray-400 mr-3 mt-1" size={20} />
                  <textarea
                    placeholder="Additional Notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full outline-none resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full font-semibold shadow-md transition"
                >
                  200 for Confirming Appointment
                </motion.button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-green-700 mb-2">Secure Payment</h1>
              <p className="text-gray-500 mb-6 flex items-center gap-2">
                <Shield size={18} className="text-green-500" />
                All transactions are encrypted & secure.
              </p>

              {/* Razorpay Pay Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePayment}
                className="flex items-center justify-center gap-3 bg-[#3399cc] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#2d89b5] w-full transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  alt="Razorpay"
                  className="h-5"
                />
                Pay with Razorpay
              </motion.button>
            </>
          )}

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center mt-4 text-sm font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <img
            src={step === 1 
              ? "https://img.freepik.com/free-vector/medical-appointment-booking-illustration_23-2148524606.jpg" 
              : "https://img.freepik.com/free-vector/secure-payment-concept-illustration_114360-4975.jpg"}
            alt="Booking Illustration"
            className="w-full rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;
