import express from "express";
import { getAllTeams ,createTeam } from "../Controllers/teamController.js";

const teamRouter = express.Router();

// Define the route path before the controller functions
teamRouter.get('/', getAllTeams); // GET request for all teams
teamRouter.post('/', createTeam); // POST request to create a new team

export default teamRouter;
