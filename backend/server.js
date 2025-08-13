import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import routers from "./routes/appointmentRoutes.js";
import Trouter from "./routes/testRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({origin: "*", 
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", router);
app.use("/api/appointments", routers);
app.use("/api/test",Trouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
