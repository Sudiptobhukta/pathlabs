import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userEmail: { // store email directly
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderid:{
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
