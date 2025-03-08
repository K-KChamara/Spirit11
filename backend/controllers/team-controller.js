import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./Database/db.js"; // Import your dbConnect function

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using dbConnect function
dbConnect();

// Player Model (Schema for MongoDB)
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  price: { type: Number, required: true },
  team: { type: String, required: true },
});

const Player = mongoose.model("Player", playerSchema);

// Routes

// Fetch all players
app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
    
  } catch (err) {
    res.status(500).json({ message: "Error fetching players", error: err });
  }
});

// Fetch player by ID
app.get("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Error fetching player", error: err });
  }
});

// Add a new player
app.post("/api/players", async (req, res) => {
  const { name, position, price, team } = req.body;

  const newPlayer = new Player({ name, position, price, team });

  try {
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    res.status(400).json({ message: "Error adding player", error: err });
  }
});

// Update player
app.put("/api/players/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: "Error updating player", error: err });
  }
});

// Delete player
app.delete("/api/players/:id", async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting player", error: err });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
