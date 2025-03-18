
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ SafeUser Schema (for Authentication)
const SafeUserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const SafeUser = mongoose.model("SafeUser", SafeUserSchema);

// ✅ User Schema (for Storing User Data)
const UserSchema = new mongoose.Schema(
  {
    userInfo: {
      enroll: String,
      name: String,
      phone: String,
      email: String,
      emergencyContact: String,
      courseYear: String,
      residency: String,
    },
    assessmentResults: Object,
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", UserSchema);

// 🔐 Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "🚫 Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "❌ Invalid Token!" });
  }
};

// 🔑 Login Route (Only SafeUsers can log in)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SafeUser.findOne({ email });
    if (!user) return res.status(401).json({ message: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "❌ Invalid Password" });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "✅ Login Successful!", token });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔐 Protected Route to Get Users (Admin only)
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route to Submit User Data
app.post("/submit", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "✅ Data saved successfully" });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
