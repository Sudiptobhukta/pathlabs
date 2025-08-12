// controllers/appointmentController.js

import Appointment from "../models/Appointment.js";
import User from "../models/User.js";


export const bookAppointment = async (req, res) => {
  try {
    console.log(req.body)
    const {
      email, // User's email is required since it's the primary key
      doctorName,
      reason,
      appointmentDate,
      preferredTime,
      notes,
    } = req.body;
    console.log(email)
    if (!doctorName || !reason || !appointmentDate || !preferredTime) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Create new appointment with user email as reference
    const appointment = new Appointment({
      userEmail: req.user.email, // This will act as the foreign key
      doctorName,
      reason,
      appointmentDate,
      preferredTime,
      notes,
    });

    await appointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


// ✅ Get all appointments by user email
export const getUserAppointments = async (req, res) => {
  try {
    debugger
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all appointments for this user
    const appointments = await Appointment.find({ userEmail: email }).sort({ appointmentDate: -1 });


    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
