import Player from "../Models/Players.js";

export const createPlayer = async (req, res) => {
  const player = new Player(req.body);
  player.calculateStats()
  try {
    await player.save();
    res.status(201).send(player);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const addPlayers = async (req, res) => {
  try {
    const insertedPlayers = await Player.insertMany(players);

    // Re-fetch players and calculate stats for each
    for (const player of insertedPlayers) {
      player.calculateStats();
      await player.save();
    }

    res.status(201).json({
      message: 'Players added successfully',
      data: players
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error adding players',
      error: error.message
    });
  }
  
};

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const getTopBowlers = async (req, res) => {
  try{
    const topBowlers =  await Player.find({category: 'Bowler'}).sort({bowlingStrikeRate:-1}).limit(5);
    res.json(topBowlers);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

export const getTopBatsmen = async (req, res) => {
  try{
    const topBatsmen =  await Player.find({category: 'Batsman'}).sort({
      battingStrikeRate: -1}).limit(5);
    res.json(topBatsmen);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

export const getTopAllRounders = async (req, res) => {
  try{
    const topAllRounders =  await Player.find({category: 'All-Rounder'}).sort({points: -1}).limit(5);
    console.log("ALL rounder",topAllRounders)
    res.json(topAllRounders);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}
export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    let player = await Player.findById(id);
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Update player data
    Object.assign(player, req.body);
    
    // Recalculate statistics
    player.calculateStats();
    
    // Save updated player
    await player.save();
    
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
