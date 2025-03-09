import Tournament from "../Models/tournements.js";  // Import the Tournament model using ES6 import

// Create a new tournament
export const createTournament = async (req, res) => {
  const { teamOne, teamTwo } = req.body;
  
  if (!teamOne || !teamTwo) {
    return res.status(400).json({ message: 'Both teams must be provided.' });
  }

  try {
    const newTournament = new Tournament({
      teamOne,
      teamTwo,
      status: 'Upcoming'  // Default marks and winner will be 0 and 'pending'
    });
    
    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    console.error('Error creating tournament:', error);
    res.status(500).json({ message: 'Failed to create tournament.' });
  }
};

// Update the status of a tournament to 'Ended'
export const endTournament = async (req, res) => {
  const { tournamentId } = req.params;
  
  try {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found.' });
    }
    
    tournament.status = 'Ended';
    const updatedTournament = await tournament.save();
    res.status(200).json(updatedTournament);
  } catch (error) {
    console.error('Error ending tournament:', error);
    res.status(500).json({ message: 'Failed to end tournament.' });
  }
};

// Get all tournaments
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Failed to fetch tournaments.' });
  }
};

// Get a single tournament by ID
export const getTournamentById = async (req, res) => {
  const { tournamentId } = req.params;
  
  try {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found.' });
    }
    res.status(200).json(tournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    res.status(500).json({ message: 'Failed to fetch tournament.' });
  }
};
