import express from "express";
import { getAllTeams ,createTeam } from "../Controllers/teamController.js";

export const teamRouter = express.Router();

teamRouter.route('/').get(getAllTeams).post(createTeam);