import express from 'express';
import { createTournament, endTournament, getAllTournaments, getTournamentById } from '../Controllers/tournamentController.js';

const tournamentRouter = express.Router();

// Define the route paths and link to controller functions
tournamentRouter.get('/', getAllTournaments);  // GET request for all tournaments
tournamentRouter.get('/:tournamentId', getTournamentById);  // GET request for a specific tournament by ID
tournamentRouter.post('/', createTournament);  // POST request to create a new tournament
tournamentRouter.put('/:tournamentId/end', endTournament);  // PUT request to end a tournament

export default tournamentRouter;
