// routes/testRoutes.js
import express from "express";
import Test from "../models/Test.js";

const troute = express.Router();

// Add new test
troute.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const test = new Test({ name, description, price });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tests
troute.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default troute;
