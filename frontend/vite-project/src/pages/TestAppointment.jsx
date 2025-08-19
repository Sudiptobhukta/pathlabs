import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Calendar,
  Clock,
  StickyNote,
  Shield,
} from "lucide-react";

const TestAppointment = () => {
  const [testName, setTestName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const availableTests = [
    "Complete Blood Count (CBC)",
    "Lipid Profile",
    "Blood Sugar Test",
    "Thyroid Function Test",
    "Liver Function Test",
    "Kidney Function Test",
    "Urine Analysis",
    "Vitamin D Test",
    "Covid-19 RT-PCR",
  ];

  const email = JSON.parse(localStorage.getItem("user"))?.email || "";
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!testName || !date || !time) {
      setMessage("❌ Please complete all required fields.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      // 1️⃣ Create order from backend
      const { data: order } = await axios.post("http://localhost:5000/create-order", {
        amount: 500, // Fixed amount for now, can make dynamic
      });

      // 2️⃣ Configure Razorpay options
      const options = {
        key: "rzp_test_R5bVtEig0TuV18", // Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Lab Test Booking",
        description: testName,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Call your existing API to store booking in DB
            await axios.post(
              "http://localhost:5000/api/test/testbook",
              { email, testName, date, time,orderid:order.id ,notes },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("✅ Test appointment booked & payment successful!");
            setTestName("");
            setDate("");
            setTime("");
            setNotes("");
            setStep(1);
          } catch (err) {
            console.error(err);
            setMessage("❌ Failed to save booking after payment.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setMessage("❌ Payment could not be started.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-6">
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
              <h1 className="text-3xl font-bold text-teal-700 mb-2">
                Book a Lab Test
              </h1>
              <p className="text-gray-500 mb-6">
                Select your test and preferred schedule.
              </p>

              <form className="space-y-5" onSubmit={handleBookingSubmit}>
                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <FlaskConical className="text-gray-400 mr-3" size={20} />
                  <select
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    required
                    className="w-full outline-none bg-transparent"
                  >
                    <option value="">— Choose a test —</option>
                    {availableTests.map((test) => (
                      <option key={test} value={test}>
                        {test}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg p-3">
                  <Clock className="text-gray-400 mr-3" size={20} />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full outline-none"
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
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 w-full font-semibold shadow-md transition"
                >
                  Proceed to Payment
                </motion.button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-green-700 mb-2">
                Secure Payment
              </h1>
              <p className="text-gray-500 mb-6 flex items-center gap-2">
                <Shield size={18} className="text-green-500" />
                All transactions are encrypted & secure.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-[#3399cc] text-white px-6 py-3 rounded-lg hover:bg-[#2d89b3] w-full font-semibold shadow-md transition"
              >
                <img
                  src="https://razorpay.com/assets/razorpay-glyph.svg"
                  alt="Razorpay"
                  className="w-5 h-5"
                />
                {loading ? "Processing..." : "Pay with Razorpay"}
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

        {/* Right Section - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <img
            src={
              step === 1
                ? "https://img.freepik.com/free-vector/lab-research-concept-illustration_114360-7366.jpg"
                : "https://img.freepik.com/free-vector/secure-payment-concept-illustration_114360-4975.jpg"
            }
            alt="Booking Illustration"
            className="w-full rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default TestAppointment;
