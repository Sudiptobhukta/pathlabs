// src/pages/Notifications.jsx
import React from "react";

const Notifications = () => {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600">All system alerts and updates</p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 max-w-3xl mx-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border-b border-gray-200 py-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-gray-800">
                New appointment booked
              </h2>
              <p className="text-gray-500 text-sm">
                Patient: Jane Doe | 2025-07-05
              </p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
