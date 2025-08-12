import express from "express";
import { bookAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const routers = express.Router();

routers.post("/book", protect, bookAppointment);
routers.get("/history/:email", protect, getUserAppointments);

export default routers;
