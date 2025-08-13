import express from "express";
import { bookAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";

const routers = express.Router();

routers.post("/book", protect, bookAppointment);
routers.get("/history/:email", protect, getUserAppointments);
routers.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all appointments", error: error.message });
  }
});

export default routers;
