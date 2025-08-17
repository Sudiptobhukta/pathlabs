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
router.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    // Delete the user
    await User.deleteOne({ email });

    // Delete all appointments & test bookings related to the user
    await Appointment.deleteMany({ userEmail: email });
    await TestAppointment.deleteMany({ userEmail: email });

    return res.json({ message: `User and related data for ${email} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});



export default router;
