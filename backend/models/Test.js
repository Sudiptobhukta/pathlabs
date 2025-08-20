// models/Test.js
import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Test = mongoose.model("Test", TestSchema);
export default Test;
