import express from "express";
import { createPlayer  ,addPlayers , getAllPlayers} from "../Controllers/playerController.js";
import { Router } from "express";

const PlayerRouter = express.Router();

// Create a new player
PlayerRouter.get("/", getAllPlayers)
PlayerRouter.post("/", createPlayer);
PlayerRouter.post("/add",addPlayers);

export default PlayerRouter;