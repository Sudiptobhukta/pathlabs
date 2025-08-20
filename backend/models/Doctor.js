import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  facts: {
    type: [String], 
    default: [],
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
