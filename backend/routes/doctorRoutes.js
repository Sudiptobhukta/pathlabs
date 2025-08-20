import express from "express";
import Doctor from "../models/Doctor.js";

const drouter = express.Router();

// ✅ Get all doctors
drouter.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get doctor by email
drouter.get("/:email", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.params.email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add doctor
drouter.post("/", async (req, res) => {
  const doctor = new Doctor({
    email: req.body.email,
    name: req.body.name,
    specialization: req.body.specialization,
    facts: req.body.facts,
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update doctor by email
drouter.put("/:email", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete doctor by email
drouter.delete("/:email", async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({ email: req.params.email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default drouter;
