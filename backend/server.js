// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected 🎉 🎊");
})
.catch((err) => console.error("❌ DB connection failed:", err));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));