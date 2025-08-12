import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();
debugger
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:email",updateUser)



export default router;
