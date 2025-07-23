import Team from "../Models/Team.js";

export const createTeam = async (req, res) => {

  const newTeam = new Team(req.body);
  try {
    const savedTeam = await newTeam.save();
    res.status(200).json(savedTeam);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
}