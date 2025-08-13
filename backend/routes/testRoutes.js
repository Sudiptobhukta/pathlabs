import express from "express";
import TestAppointment from "../models/TestAppointment.js";

const Trouter = express.Router();

// Book a test
Trouter.post("/testbook", async (req, res) => {
  try {
    const { email, testName, date, time } = req.body;
    console.log(req.body)

    const Tappointment = new TestAppointment({
      userEmail: email, 
      testName,
      date,
      time
    });
    console.log(Tappointment)

    await Tappointment.save();
    res.status(201).json({ message: "Test booked successfully", Tappointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking test", error: error.message });
  }
});

// Get test history for a user
Trouter.get("/testhistory/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const history = await TestAppointment.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching test history", error: error.message });
  }
});

Trouter.get("/all", async (req, res) => {
  try {
    const testBookings = await TestAppointment.find().sort({ createdAt: -1 });
    return res.json(testBookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all test bookings", error: error.message });
  }
});

export default Trouter;
