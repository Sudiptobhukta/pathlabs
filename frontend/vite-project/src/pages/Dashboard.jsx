// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Chatbot from "../components/Chatbot";
import Navabar from "../components/Navabar";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Dashboard() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => setShowChatbot(!showChatbot);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.name || "John";
  const companyName = "HealthCare Diagnostics";

  const handleCardClick = (path) => {
    navigate(path);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 12px 30px rgba(0,0,0,0.15)" },
  };

  const reviews = [
    {
      name: "Priya Sharma",
      text: "Booking tests has never been this easy. Results are fast and reliable!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Mehta",
      text: "The dashboard is very user-friendly and saves me a lot of time.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sneha Kapoor",
      text: "Loved the smooth appointment booking process and prompt updates.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Amit Verma",
      text: "Professional staff and easy-to-use interface. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Priya Sharma",
      text: "Booking tests has never been this easy. Results are fast and reliable!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Priya Sharma",
      text: "Booking tests has never been this easy. Results are fast and reliable!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Priya Sharma",
      text: "Booking tests has never been this easy. Results are fast and reliable!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Priya Sharma",
      text: "Booking tests has never been this easy. Results are fast and reliable!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    }

  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Navbar */}
        <Navabar username={username} companyName={companyName} />

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Welcome, {username} 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-lg text-blue-100"
            >
              Manage your health, tests, and appointments — all in one place.
            </motion.p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[
            {
              title: "Book Appointment",
              desc: "Schedule your lab test or consultation with ease.",
              icon: "📅",
              color: "from-blue-50 to-blue-100",
              text: "text-blue-900",
              path: "/book-appointment",
            },
            {
              title: "Test Appointments",
              desc: "Check and manage your upcoming test schedules.",
              icon: "🩺",
              color: "from-pink-50 to-pink-100",
              text: "text-pink-900",
              path: "/test-appointment",
            },
            {
              title: "Profile Settings",
              desc: "Manage your personal details and contact info.",
              icon: "👤",
              color: "from-yellow-50 to-yellow-100",
              text: "text-yellow-900",
              path: "/settings",
            },
            {
              title: "Booking History",
              desc: "Review your past appointment bookings and status.",
              icon: "📖",
              color: "from-purple-50 to-purple-100",
              text: "text-purple-900",
              path: "/bookinghistory",
            },
            {
              title: "Test History",
              desc: "View your past diagnostic reports and health history.",
              icon: "🧪",
              color: "from-green-50 to-green-100",
              text: "text-green-900",
              path: "/test-results",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`cursor-pointer p-6 bg-gradient-to-br ${card.color} rounded-2xl shadow-md`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={i}
              onClick={() => handleCardClick(card.path)}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className={`text-xl font-semibold mb-2 ${card.text}`}>
                {card.title}
              </h2>
              <p className={`text-sm ${card.text.replace("900", "600")}`}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-5xl mx-auto px-6 mt-20 mb-20">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-10">
            What Our Patients Say
          </h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full"
                >
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mb-4 border-2 border-blue-500 object-cover"
                  />
                  <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                  <p className="text-gray-800 font-semibold">{review.name}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Floating Chatbot Button */}
        <motion.button
          onClick={toggleChatbot}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬
        </motion.button>

        {/* AI Chatbot Panel */}
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Chatbot />
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
