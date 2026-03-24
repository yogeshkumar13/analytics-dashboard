const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

 
require("./config/db");   
 
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

 
app.use(cors());

app.use(express.json());

 
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

 
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

 
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});