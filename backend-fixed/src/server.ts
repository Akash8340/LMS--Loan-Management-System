import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import loanRoutes from "./routes/loanRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();

// FIX: restrict CORS origin via env variable instead of wildcard '*'
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

connectDB();

// FIX: ensure uploads/ directory exists at startup so multer doesn't crash
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Health Check
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Static Files
app.use(
    "/uploads",
    express.static(uploadsDir)
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
