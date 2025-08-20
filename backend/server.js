import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import routers from "./routes/appointmentRoutes.js";
import Trouter from "./routes/testRoutes.js";
import drouter from "./routes/doctorRoutes.js";
import troute from "./routes/testR.js";
import Razorpay from "razorpay";

dotenv.config();
connectDB();

const app = express();
app.use(cors({origin: "*", 
  credentials: true
}));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,        // Test Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET // Test Key Secret
});

// Routes
app.use("/api/auth", router);
app.use("/api/appointments", routers);
app.use("/api/test",Trouter);
app.use("/api/alltests", troute);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/create-order", async (req, res) => {
    try {
      debugger
        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
});

app.use("/api/doctors", drouter);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
