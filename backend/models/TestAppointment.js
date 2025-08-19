import mongoose from "mongoose";

const testAppointmentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: "User", // Email is primary key in User model
    required: true
  },
  testName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending"
  },
  orderid: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("TestAppointment", testAppointmentSchema);
