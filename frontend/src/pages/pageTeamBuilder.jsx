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
import { useEffect, useState } from "react";
import { FullScreenSuccess } from "@/components/team-success-alert";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { BirdIcon as Cricket } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeamBuilder() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const [userId, setUserId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState([]);
  const [teamName, setTeamName] = useState("My Cricket Team");
  const [budget, setBudget] = useState(9000000);
  const initialBudget = 9000000;
  const [teams, setTeams] = useState([]);
  const [teamMakeDisabled, setTeamMakeDisabled] = useState(true);
  const maxPlayers = 11;

  // Handle user sign-in check and set userId
  useEffect(() => {
    if (isSignedIn && user) {
      setUserId(user.id);
    } else {
      navigate("/sign-in");
    }
  }, [isSignedIn, user, navigate]);

  // Fetch player data from API
  useEffect(() => {
    const getAllPlayers = async () => {
      console.log("Fetching players...");
      try {
        const response = await axios.get("http://localhost:3000/api/player");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    getAllPlayers();
    // const getAllTeams = async () => {
    //   console.log("getAllTeams called")
    //   try {
    //     const response = await axios.get("http://localhost:3000/api/team");
    //     setTeams(response.data);

    //     // Check if any team's userId matches the current userId
    //     const userTeam = response.data.find((team) => team.userId === userId);
    //     if (userTeam) {
    //       setTeamMakeDisabled(true);  // Disable team creation if the team exists for this user
    //     } else {
    //       setTeamMakeDisabled(false);  // Enable team creation if no team exists for this user
    //     }
    //   } catch (error) {
    //     console.error("Error fetching teams:", error);
    //   }
    // };

    // getAllTeams();
    // console.log("teams"  , teams )
    // console.log("userId" , userId)
    // console.log("teamMakeDisabled" ,teamMakeDisabled)
  }, []);

  useEffect(() => {
    if (userId) {
      const getAllTeams = async () => {
        console.log("getAllTeams called");
        try {
          const response = await axios.get("http://localhost:3000/api/team");
          setTeams(response.data);

          // Check if any team's userId matches the current userId
          const userTeam = response.data.find((team) => team.userId === userId);
          console.log("userTeam", userTeam);
          if (userTeam) {
            setTeamMakeDisabled(true); // Disable team creation if the team exists for this user
          } else {
            setTeamMakeDisabled(false); // Enable team creation if no team exists for this user
          }
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      };

      getAllTeams();
      console.log(teamMakeDisabled);
    }
  }, [userId]); // This will run whenever userId changes

  const handleCloseSuccess = () => setShowSuccess(false);

  const handleSelectPlayer = (player) => {
    if (
      selectedPlayers.length >= maxPlayers ||
      selectedPlayers.find((p) => p._id === player._id) ||
      budget < player.value
    ) {
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

    const team = {
      userId: userId,
      teamName: teamName,
      players: selectedPlayerId,
      totalValue: totalPoints,
      price: initialBudget - budget,
    };
    console.log(team);

    setShowSuccess(true);
    try {
      const res = await axios.post("http://localhost:3000/api/teams", team);

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
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Build Your Dream Team
                </CardTitle>
                <CardDescription>
                  Select 14 players within your budget of LKR 9,000,000
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Budget Remaining</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        LKR {budget.toLocaleString()}
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
                            selectedPlayers.some((p) => p._id === player._id) ||
                            selectedPlayers.length >= maxPlayers
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
              off={teamMakeDisabled}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
