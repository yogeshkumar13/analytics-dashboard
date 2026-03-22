const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 DB import (IMPORTANT)
require("./config/db");  // 👈 ye line add karo

// Routes import
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Middleware
app.use(cors({
  origin: "https://analytics-dashboard-iota-beryl.vercel.app/", // production me specific domain rakh sakte ho
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});