import Player from "../Models/players.js";

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
    const players = [
      {
          "name": "Charith Shanaka",
          "university": "University of Colombo",
          "category": "Batsman",
          "totalRuns": 477,
          "ballsFaced": 530,
          "inningsPlayed": 9,
          "wickets": 0,
          "oversBowled": 3,
          "runsConceded": 27
      },
      {
          "name": "Asela Nissanka",
          "university": "University of Sri Jayewardenepura",
          "category": "Batsman",
          "totalRuns": 765,
          "ballsFaced": 850,
          "inningsPlayed": 15,
          "wickets": 0,
          "oversBowled": 0,
          "runsConceded": 1
      },
      {
          "name": "Wanindu Hasaranga",
          "university": "University of Colombo",
          "category": "Bowler",
          "totalRuns": 120,
          "ballsFaced": 240,
          "inningsPlayed": 10,
          "wickets": 30,
          "oversBowled": 90,
          "runsConceded": 540
      },
      {
          "name": "Asela Vandersay",
          "university": "University of the Visual & Performing Arts",
          "category": "Bowler",
          "totalRuns": 154,
          "ballsFaced": 308,
          "inningsPlayed": 14,
          "wickets": 37,
          "oversBowled": 112,
          "runsConceded": 448
      },
      {
          "name": "Pathum Fernando",
          "university": "University of Peradeniya",
          "category": "Batsman",
          "totalRuns": 450,
          "ballsFaced": 500,
          "inningsPlayed": 10,
          "wickets": 0,
          "oversBowled": 2,
          "runsConceded": 18
      },
      {
          "name": "Angelo Kumara",
          "university": "Eastern University",
          "category": "Batsman",
          "totalRuns": 330,
          "ballsFaced": 366,
          "inningsPlayed": 6,
          "wickets": 0,
          "oversBowled": 1,
          "runsConceded": 8
      },
      {
          "name": "Danushka Rajapaksa",
          "university": "University of Peradeniya",
          "category": "Batsman",
          "totalRuns": 441,
          "ballsFaced": 490,
          "inningsPlayed": 9,
          "wickets": 0,
          "oversBowled": 5,
          "runsConceded": 35
      },
      {
          "name": "Suranga Shanaka",
          "university": "South Eastern University",
          "category": "Bowler",
          "totalRuns": 55,
          "ballsFaced": 110,
          "inningsPlayed": 5,
          "wickets": 13,
          "oversBowled": 40,
          "runsConceded": 160
      },
      {
          "name": "Pathum Dhananjaya",
          "university": "Eastern University",
          "category": "Batsman",
          "totalRuns": 360,
          "ballsFaced": 400,
          "inningsPlayed": 8,
          "wickets": 0,
          "oversBowled": 1,
          "runsConceded": 9
      },
      {
          "name": "Asela Asalanka",
          "university": "South Eastern University",
          "category": "Batsman",
          "totalRuns": 550,
          "ballsFaced": 611,
          "inningsPlayed": 11,
          "wickets": 0,
          "oversBowled": 0,
          "runsConceded": 1
      },
      {
          "name": "Minod Rathnayake",
          "university": "University of Kelaniya",
          "category": "Bowler",
          "totalRuns": 154,
          "ballsFaced": 308,
          "inningsPlayed": 14,
          "wickets": 37,
          "oversBowled": 112,
          "runsConceded": 448
      },
      {
          "name": "Binura Lakmal",
          "university": "University of Kelaniya",
          "category": "Batsman",
          "totalRuns": 540,
          "ballsFaced": 600,
          "inningsPlayed": 12,
          "wickets": 0,
          "oversBowled": 2,
          "runsConceded": 16
      },
      {
          "name": "Praveen Asalanka",
          "university": "Eastern University",
          "category": "Batsman",
          "totalRuns": 477,
          "ballsFaced": 530,
          "inningsPlayed": 9,
          "wickets": 0,
          "oversBowled": 1,
          "runsConceded": 7
      },
      {
          "name": "Angelo Jayawardene",
          "university": "University of Jaffna",
          "category": "Batsman",
          "totalRuns": 468,
          "ballsFaced": 520,
          "inningsPlayed": 9,
          "wickets": 0,
          "oversBowled": 3,
          "runsConceded": 21
      },
      {
          "name": "Kamindu Asalanka",
          "university": "University of Moratuwa",
          "category": "Bowler",
          "totalRuns": 135,
          "ballsFaced": 270,
          "inningsPlayed": 15,
          "wickets": 45,
          "oversBowled": 135,
          "runsConceded": 810
      },
      {
          "name": "Sadeera Rajapaksa",
          "university": "University of Jaffna",
          "category": "All-Rounder",
          "totalRuns": 275,
          "ballsFaced": 229,
          "inningsPlayed": 11,
          "wickets": 8,
          "oversBowled": 44,
          "runsConceded": 264
      },
      {
          "name": "Sandakan Hasaranga",
          "university": "University of Kelaniya",
          "category": "Batsman",
          "totalRuns": 795,
          "ballsFaced": 883,
          "inningsPlayed": 15,
          "wickets": 0,
          "oversBowled": 1,
          "runsConceded": 7
      },
      {
          "name": "Bhanuka Rajapaksa",
          "university": "University of Moratuwa",
          "category": "All-Rounder",
          "totalRuns": 364,
          "ballsFaced": 303,
          "inningsPlayed": 14,
          "wickets": 11,
          "oversBowled": 56,
          "runsConceded": 336
      },
      {
          "name": "Chamika Rajapaksa",
          "university": "University of Ruhuna",
          "category": "Batsman",
          "totalRuns": 450,
          "ballsFaced": 500,
          "inningsPlayed": 9,
          "wickets": 0,
          "oversBowled": 1,
          "runsConceded": 7
      },
      {
          "name": "Kamindu Lakmal",
          "university": "University of the Visual & Performing Arts",
          "category": "Batsman",
          "totalRuns": 780,
          "ballsFaced": 866,
          "inningsPlayed": 15,
          "wickets": 0,
          "oversBowled": 5,
          "runsConceded": 35
      },
      {
          "name": "Lakshan Gunathilaka",
          "university": "University of Peradeniya",
          "category": "Bowler",
          "totalRuns": 84,
          "ballsFaced": 168,
          "inningsPlayed": 7,
          "wickets": 21,
          "oversBowled": 63,
          "runsConceded": 315
      },
      {
          "name": "Tharindu Thirimanne",
          "university": "South Eastern University",
          "category": "Batsman",
          "totalRuns": 611,
          "ballsFaced": 678,
          "inningsPlayed": 13,
          "wickets": 0,
          "oversBowled": 2,
          "runsConceded": 18
      },
      {
          "name": "Dinesh Samarawickrama",
          "university": "University of Jaffna",
          "category": "Batsman",
          "totalRuns": 400,
          "ballsFaced": 444,
          "inningsPlayed": 8,
          "wickets": 0,
          "oversBowled": 3,
          "runsConceded": 27
      },
      {
          "name": "Suranga Sandakan",
          "university": "University of Moratuwa",
          "category": "Batsman",
          "totalRuns": 235,
          "ballsFaced": 261,
          "inningsPlayed": 5,
          "wickets": 0,
          "oversBowled": 4,
          "runsConceded": 36
      },
      {
          "name": "Sandakan Dickwella",
          "university": "University of Jaffna",
          "category": "Batsman",
          "totalRuns": 368,
          "ballsFaced": 408,
          "inningsPlayed": 8,
          "wickets": 0,
          "oversBowled": 3,
          "runsConceded": 27
      },
      {
          "name": "Sammu Rajapaksa",
          "university": "University of Ruhuna",
          "category": "Batsman",
          "totalRuns": 240,
          "ballsFaced": 266,
          "inningsPlayed": 5,
          "wickets": 0,
          "oversBowled": 2,
          "runsConceded": 16
      },
      {
          "name": "Suranga Bandara",
          "university": "University of Moratuwa",
          "category": "Bowler",
          "totalRuns": 154,
          "ballsFaced": 308,
          "inningsPlayed": 14,
          "wickets": 46,
          "oversBowled": 140,
          "runsConceded": 840
      },
      {
          "name": "Tharindu Embuldeniya",
          "university": "University of the Visual & Performing Arts",
          "category": "All-Rounder",
          "totalRuns": 264,
          "ballsFaced": 220,
          "inningsPlayed": 12,
          "wickets": 12,
          "oversBowled": 60,
          "runsConceded": 360
      }
  ]
  
    
      

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
