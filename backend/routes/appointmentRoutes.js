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
routers.delete("/del/:email", async (req, res) => {
  const { email, orderId } = req.params;

  try {
    const deleted = await Appointment.findOneAndDelete({ 
      userEmail: email, 
      orderId: orderId 
    });

    if (!deleted) {
      return res.status(404).json({ 
        message: `No appointment found for ${email} with orderId ${orderId}` 
      });
    }

    return res.json({ 
      message: `Appointment for ${email} with orderId ${orderId} deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting appointment", 
      error: error.message 
    });
  }
});







export default routers;
