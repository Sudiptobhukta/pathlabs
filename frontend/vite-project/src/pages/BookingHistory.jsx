import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/history/${email}`, // ✅ match backend route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Backend sends { appointments: [...] }, so we access .appointments
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">
                    Dr. {appointment.doctorName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Reason: {appointment.reason}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {appointment.preferredTime}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              {appointment.notes && (
                <p className="mt-2 text-sm text-gray-600">
                  Notes: {appointment.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
