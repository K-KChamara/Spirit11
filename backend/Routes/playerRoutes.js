import express from "express";
import { createPlayer  ,addPlayers , getAllPlayers, getTopBowlers, getTopBatsmen, getTopAllRounders} from "../Controllers/playerController.js";
import { Router } from "express";

const PlayerRouter = express.Router();

// Create a new player
PlayerRouter.get("/", getAllPlayers)
PlayerRouter.post("/", createPlayer);
PlayerRouter.post("/add",addPlayers);
PlayerRouter.get("/topBowlers",getTopBowlers);
PlayerRouter.get("/topBatsmen",getTopBatsmen);
PlayerRouter.get("/topAllRounders", getTopAllRounders);
export default PlayerRouter;