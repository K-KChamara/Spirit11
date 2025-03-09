import mongoose from 'mongoose';  // Import mongoose using ES6 import

// Define the schema for the Tournament
const tournamentSchema = new mongoose.Schema({
  teamOne: {
    type: String,
    required: true
  },
  teamTwo: {
    type: String,
    required: true
  },
  teamOneMarks: {
    type: Number,
    
    default: 0  // Default marks for teamOne are set to 0
  },
  teamTwoMarks: {
    type: Number,
    
    default: 0  // Default marks for teamTwo are set to 0
  },
  winner: {
    type: String,
    enum: ['teamOne', 'teamTwo', 'draw', 'pending'],  // 'pending' is now an option for the winner
    default: 'pending'  // Default winner is 'pending'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ended'],
    default: 'Upcoming'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create the Tournament model
const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;  // Export Tournament using ES6 export
