import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

const router = express.Router();
debugger
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:email",updateUser)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});



export default router;
