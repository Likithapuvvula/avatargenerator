const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test API Route
app.get("/", (req, res) => {
    res.send("🚀 Avatar Generator Backend is Running!");
});

// Avatar API Route
app.get("/api/avatar", (req, res) => {
    const { seed = "default", style = "identicon" } = req.query;
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    res.json({ avatarUrl });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
