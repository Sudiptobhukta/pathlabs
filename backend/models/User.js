// import React from 'react'
import mongoose from 'mongoose'
// import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  // id:{ type: String , required: true, unique: true},
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


export default User
