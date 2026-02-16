require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoute = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => res.send("pong")); // quick test

app.use("/users", usersRoute);

const PORT = process.env.PORT || 8081;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
}

start();

