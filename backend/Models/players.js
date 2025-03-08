import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    university: { type: String, required: true },  // University name
    category: { type: String, required: true, enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'] },
    totalRuns: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    inningsPlayed: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    oversBowled: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    battingStrikeRate: { type: Number, default: 0 }, // Auto-calculated
    battingAverage: { type: Number, default: 0 }, // Auto-calculated
    bowlingStrikeRate: { type: Number, default: 0 }, // Auto-calculated
    economyRate: { type: Number, default: 0 }, // Auto-calculated
    points: { type: Number, default: 0 }, // Points based on performance
    value: { type: Number, default: 0 } // Player value in budget system
}, { timestamps: true });

// Function to calculate statistics and points
PlayerSchema.methods.calculateStats = function () {
    // Batting Statistics
    this.battingStrikeRate = this.ballsFaced ? (this.totalRuns / this.ballsFaced) * 100 : 0;
    this.battingAverage = this.inningsPlayed ? this.totalRuns / this.inningsPlayed : 0;

    // Bowling Statistics
    this.bowlingStrikeRate = this.wickets ? (this.oversBowled * 6) / this.wickets : 0;
    this.economyRate = this.oversBowled ? this.runsConceded / this.oversBowled : 0;

    // Points Calculation Formula
    this.points = (this.battingStrikeRate / 5) + (this.battingAverage * 0.8) +
                  (this.wickets ? (500 / this.bowlingStrikeRate) : 0) + 
                  (this.economyRate ? (140 / this.economyRate) : 0);

    // Player Value Calculation (Rounded to nearest 50,000)
    this.value = Math.round(((9 * this.points + 100) * 1000) / 50000) * 50000;
};

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
