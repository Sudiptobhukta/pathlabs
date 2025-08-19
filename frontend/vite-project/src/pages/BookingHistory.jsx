import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ClipboardList,
  Loader2,
  User,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const facts = [
    "Drinking enough water each day is essential for good health.",
    "A balanced diet includes fruits, vegetables, protein, and whole grains.",
    "Regular exercise boosts mood and strengthens your body.",
    "Getting 7-9 hours of sleep helps your body recover and stay healthy.",
    "Managing stress through meditation or hobbies improves mental health.",
    "Avoid skipping breakfast to maintain stable energy levels throughout the day.",
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  const total = appointments.length;
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      {/* Hero Section - Blue Background */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 text-center">
          <ClipboardList className="w-12 h-12 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">Your Booking History</h1>
          <p className="opacity-90 mt-1">
            Track all your past and upcoming appointments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <ClipboardList className="w-6 h-6 mx-auto text-indigo-600" />
          <p className="text-lg font-bold">{total}</p>
          <p className="text-gray-500 text-sm">Total</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow text-center">
          <CheckCircle2 className="w-6 h-6 mx-auto text-green-600" />
          <p className="text-lg font-bold">{confirmed}</p>
          <p className="text-gray-500 text-sm">Confirmed</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
          <Clock className="w-6 h-6 mx-auto text-yellow-600" />
          <p className="text-lg font-bold">{pending}</p>
          <p className="text-gray-500 text-sm">Pending</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl shadow text-center">
          <XCircle className="w-6 h-6 mx-auto text-red-600" />
          <p className="text-lg font-bold">{cancelled}</p>
          <p className="text-gray-500 text-sm">Cancelled</p>
        </div>
      </div>

      {/* Appointment List */}
      <div className="max-w-5xl mx-auto">
        {appointments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center text-lg"
          >
            No appointments found.
          </motion.p>
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
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">
                      Dr. {appointment.doctorName}
                    </h3>
                  </div>
                  <span
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
                <div className="px-5 py-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}{" "}
                    at {appointment.preferredTime}
                  </p>
                   <p className="text-sm text-gray-600">
                    <strong>Order Id:</strong> {appointment.orderid}
                  </p>
                  {appointment.notes && (
                    <p className="text-sm text-gray-500 italic">
                      Notes: {appointment.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Healthy Facts Carousel */}
      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Healthy Living Facts
        </h3>
        <Slider {...settings}>
          {facts.map((fact, index) => (
            <div key={index} className="px-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 min-h-[120px] flex items-center justify-center text-center">
                <p className="text-gray-700">{fact}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookingHistory;
