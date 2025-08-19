// components/TestHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  TestTube,
  CalendarDays,
  Clock,
  ClipboardList
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = JSON.parse(localStorage.getItem("user"))?.email;

  // Fun facts about lab tests
  const testFacts = [
    "A Complete Blood Count (CBC) can detect infections, anemia, and more.",
    "Lipid profile tests measure cholesterol and triglyceride levels.",
    "Thyroid tests help diagnose hypo- and hyperthyroidism.",
    "Vitamin D deficiency is linked to weakened immunity and bone health issues.",
    "Liver function tests assess enzyme and protein levels in your blood.",
    "Kidney function tests check creatinine and urea levels for renal health."
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/test/testhistory/${email}`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching test history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchHistory();
    }
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Carousel settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <TestTube className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Test History</h2>
        </div>
        <p className="opacity-90 mt-1">
          Review your past lab test bookings and details.
        </p>
      </div>

      {/* Facts carousel */}
      <div className="max-w-3xl mx-auto mb-10">
        <Slider {...sliderSettings}>
          {testFacts.map((fact, index) => (
            <div key={index}>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm text-center text-blue-800">
                💡 {fact}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* History Table */}
      {history.length === 0 ? (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No test appointments found.
        </motion.p>
      ) : (
        <motion.div
          className="overflow-x-auto bg-white shadow-lg rounded-xl p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Test Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((test, index) => (
                <motion.tr
                  key={test._id}
                  className={`border-b hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-blue-500" />
                    {test.testName}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-500" />
                    {new Date(test.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {test.time}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {test.orderid}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(test.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default TestHistory;
