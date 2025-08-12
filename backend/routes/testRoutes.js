import express from "express";
import TestAppointment from "../models/TestAppointment.js";

const Trouter = express.Router();

// Book a test
Trouter.post("/testbook", async (req, res) => {
  try {
    const { userEmail, testName, testDate, testTime } = req.body;

    const appointment = new TestAppointment({
      userEmail,
      testName,
      testDate,
      testTime
    });

    await appointment.save();
    res.status(201).json({ message: "Test booked successfully", appointment });
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

export default Trouter;
