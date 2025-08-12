import React, { useState, useEffect } from "react";
import axios from "axios";

const TestAppointment = ({ userEmail }) => {
  const [testName, setTestName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Optional: You can fetch available tests from backend
  const [availableTests, setAvailableTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testbook");
        setAvailableTests(res.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testName || !date || !time) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/tests/book", {
        email: userEmail,
        testName,
        date,
        time,
      });

      if (res.status === 201) {
        setMessage("Test appointment booked successfully!");
        setTestName("");
        setDate("");
        setTime("");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to book test appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book a Test Appointment</h2>
      {message && (
        <div className="mb-3 p-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Test Name Dropdown */}
        <label className="block mb-2 font-medium">Select Test</label>
        <select
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">-- Choose Test --</option>
          {availableTests.length > 0 ? (
            availableTests.map((test, idx) => (
              <option key={idx} value={test.name}>
                {test.name}
              </option>
            ))
          ) : (
            <option value="">Loading tests...</option>
          )}
        </select>

        {/* Date */}
        <label className="block mb-2 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Time */}
        <label className="block mb-2 font-medium">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default TestAppointment;
