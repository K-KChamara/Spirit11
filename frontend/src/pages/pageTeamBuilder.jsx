import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerCard } from "@/components/player-card";
import { TeamSummary } from "@/components/team-summary";
import axios from "axios";
import { useEffect } from "react";
import { FullScreenSuccess } from "@/components/team-success-alert";

import { useState } from "react";
import { BirdIcon as Cricket, Dice1 } from "lucide-react";
import { Link } from "react-router-dom";
//  const players = [
//     // Batsmen
//     {
//       id: 1,
//       name: "Virat Kohli",
//       team: "Royal Challengers Bangalore",
//       type: "Batsmen",
//       value: 1200000,
//       points: 950,

//     },
//     {
//       id: 2,
//       name: "Rohit Sharma",
//       team: "Mumbai Indians",
//       type: "Batsmen",
//       value: 1150000,
//       points: 920,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 3,
//       name: "Kane Williamson",
//       team: "Sunrisers Hyderabad",
//       type: "Batsmen",
//       value: 950000,
//       points: 880,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 4,
//       name: "David Warner",
//       team: "Delhi Capitals",
//       type: "Batsmen",
//       value: 1050000,
//       points: 900,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 5,
//       name: "Steve Smith",
//       team: "Rajasthan Royals",
//       type: "Batsmen",
//       value: 900000,
//       points: 850,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 6,
//       name: "KL Rahul",
//       team: "Punjab Kings",
//       type: "Batsmen",
//       value: 1000000,
//       points: 890,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 7,
//       name: "Shikhar Dhawan",
//       team: "Delhi Capitals",
//       type: "Batsmen",
//       value: 850000,
//       points: 830,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 8,
//       name: "Faf du Plessis",
//       team: "Chennai Super Kings",
//       type: "Batsmen",
//       value: 800000,
//       points: 820,
//       image: "/placeholder.svg?height=100&width=100",
//     },

//     // Bowlers
//     {
//       id: 9,
//       name: "Jasprit Bumrah",
//       team: "Mumbai Indians",
//       type: "Bowlers",
//       value: 1100000,
//       points: 910,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 10,
//       name: "Kagiso Rabada",
//       team: "Delhi Capitals",
//       type: "Bowlers",
//       value: 950000,
//       points: 870,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 11,
//       name: "Trent Boult",
//       team: "Mumbai Indians",
//       type: "Bowlers",
//       value: 900000,
//       points: 860,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 12,
//       name: "Rashid Khan",
//       team: "Sunrisers Hyderabad",
//       type: "Bowlers",
//       value: 1050000,
//       points: 890,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 13,
//       name: "Mohammed Shami",
//       team: "Punjab Kings",
//       type: "Bowlers",
//       value: 850000,
//       points: 840,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 14,
//       name: "Bhuvneshwar Kumar",
//       team: "Sunrisers Hyderabad",
//       type: "Bowlers",
//       value: 800000,
//       points: 830,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 15,
//       name: "Yuzvendra Chahal",
//       team: "Royal Challengers Bangalore",
//       type: "Bowlers",
//       value: 850000,
//       points: 840,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 16,
//       name: "Pat Cummins",
//       team: "Kolkata Knight Riders",
//       type: "Bowlers",
//       value: 950000,
//       points: 870,
//       image: "/placeholder.svg?height=100&width=100",
//     },

//     // All-Rounders
//     {
//       id: 17,
//       name: "Hardik Pandya",
//       team: "Mumbai Indians",
//       type: "All-Rounders",
//       value: 1000000,
//       points: 880,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 18,
//       name: "Andre Russell",
//       team: "Kolkata Knight Riders",
//       type: "All-Rounders",
//       value: 1050000,
//       points: 890,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 19,
//       name: "Ravindra Jadeja",
//       team: "Chennai Super Kings",
//       type: "All-Rounders",
//       value: 950000,
//       points: 870,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 20,
//       name: "Ben Stokes",
//       team: "Rajasthan Royals",
//       type: "All-Rounders",
//       value: 1000000,
//       points: 880,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 21,
//       name: "Krunal Pandya",
//       team: "Mumbai Indians",
//       type: "All-Rounders",
//       value: 800000,
//       points: 820,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 22,
//       name: "Moeen Ali",
//       team: "Chennai Super Kings",
//       type: "All-Rounders",
//       value: 850000,
//       points: 830,
//       image: "/placeholder.svg?height=100&width=100",
//     },

//     // Wicket-Keepers
//     {
//       id: 23,
//       name: "MS Dhoni",
//       team: "Chennai Super Kings",
//       type: "Wicket-Keepers",
//       value: 950000,
//       points: 870,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 24,
//       name: "Rishabh Pant",
//       team: "Delhi Capitals",
//       type: "Wicket-Keepers",
//       value: 900000,
//       points: 860,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 25,
//       name: "Jos Buttler",
//       team: "Rajasthan Royals",
//       type: "Wicket-Keepers",
//       value: 950000,
//       points: 870,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 26,
//       name: "Quinton de Kock",
//       team: "Mumbai Indians",
//       type: "Wicket-Keepers",
//       value: 900000,
//       points: 860,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 27,
//       name: "Jonny Bairstow",
//       team: "Sunrisers Hyderabad",
//       type: "Wicket-Keepers",
//       value: 850000,
//       points: 840,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//     {
//       id: 28,
//       name: "Ishan Kishan",
//       team: "Mumbai Indians",
//       type: "Wicket-Keepers",
//       value: 800000,
//       points: 820,
//       image: "/placeholder.svg?height=100&width=100",
//     },
//   ]

export default function TeamBuilder() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState([]);
  const [teamName, setTeamName] = useState("My Cricket Team");
  const [budget, setBudget] = useState(9000000);
  const initialBudget = 9000000;
  const maxPlayers = 14;
  useEffect(() => {
    const getAllPlayers = async () => {
      const response = await axios.get("http://localhost:3000/api/player");
      setPlayers(response.data);
    };
    getAllPlayers();
  }, []);
  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }



  const handleSelectPlayer = (player) => {
    if (selectedPlayers.length >= maxPlayers) {
      return;
    }

    if (selectedPlayers.find((p) => p._id === player._id)) {
      return;
    }

    if (budget < player.value) {
      return;
    }

    setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);
    setSelectedPlayerId((prevIds) => [...prevIds, player._id]);
    setBudget((prevBudget) => prevBudget - player.value);
  };

  const handleRemovePlayer = (playerId) => {
    const player = selectedPlayers.find((p) => p._id === playerId);
    if (player) {
      setSelectedPlayers(selectedPlayers.filter((p) => p._id !== playerId));
      setBudget(budget + player.value);
    }
  };

  const totalPoints = selectedPlayers.reduce(
    (sum, player) => sum + player.points,
    0
  );

  const handleSaveTeam = async () => {
    if (selectedPlayers.length !== maxPlayers) {
      alert(`You need exactly ${maxPlayers} players in your team!`);
      return;
    }

    // In a real app, we would save to a database here
    const team = {
      teamName: teamName,
      players: selectedPlayerId,
      totalValue: totalPoints,
      price: initialBudget - budget,
    };
    setShowSuccess(true)
    try {
      const res = await axios.post('http://localhost:3000/api/team', team)
      
      
      alert("Team saved successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const playerCategories = [
    "Batsman",
    "Bowler",
    "All-Rounder",
    "Wicket-Keepers",
  ];


  return (
    
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cricket className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Mora Spirit X</h1>
            </div>
            <nav className="flex gap-4">
              <Link to="/team-builder" className="font-medium hover:underline">
                Team Builder
              </Link>
              <Link to="/leaderboard" className="font-medium hover:underline">
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Build Your Dream Team
                </CardTitle>
                <CardDescription>
                  Select 14 players within your budget of ₹9,000,000
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Budget Remaining</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Players Selected</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedPlayers.length} / {maxPlayers}
                      </p>
                    </div>
                  </div>

                  <Progress
                    value={((initialBudget - budget) / initialBudget) * 100}
                    className="h-2 bg-green-200 dark:bg-green-800"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue={playerCategories[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {playerCategories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {playerCategories.map((category) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {players
                      .filter((player) => player.category === category)
                      .map((player) => (
                        <PlayerCard
                          key={player._id}
                          player={player}
                          isSelected={selectedPlayers.some(
                            (p) => p._id === player._id
                          )}
                          isDisabled={
                            budget < player.value ||
                            selectedPlayers.some((p) => p._id === player._id)
                          }
                          onSelect={() => handleSelectPlayer(player)}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="space-y-6">
            <TeamSummary
              teamName={teamName}
              setTeamName={setTeamName}
              players={selectedPlayers}
              totalPoints={totalPoints}
              onRemovePlayer={handleRemovePlayer}
              onSaveTeam={handleSaveTeam}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
