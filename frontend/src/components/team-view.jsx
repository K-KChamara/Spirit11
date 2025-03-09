import { useState, useEffect } from "react";
import { Edit, RotateCcw, Save, User2, Users } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the user's team
const TEAM = {
  name: "Cricket Titans",
  owner: "John Doe",
  points: 1450,
  rank: 12,
  budget: {
    total: 100,
    used: 82.5,
    remaining: 17.5,
  },
  players: [
    {
      id: 1,
      name: "Virat Kohli",
      type: "Batsman",
      points: 280,
      role: "Player",
      price: 11.5,
    },
    {
      id: 3,
      name: "Ben Stokes",
      type: "All-Rounder",
      points: 290,
      role: "Captain",
      price: 12.5,
    },
    {
      id: 4,
      name: "MS Dhoni",
      type: "Wicket Keeper",
      points: 270,
      role: "Vice Captain",
      price: 10.8,
    },
    {
      id: 5,
      name: "Rohit Sharma",
      type: "Batsman",
      points: 275,
      role: "Player",
      price: 11.0,
    },
    {
      id: 6,
      name: "Rashid Khan",
      type: "Bowler",
      points: 260,
      role: "Player",
      price: 9.8,
    },
    {
      id: 7,
      name: "Kane Williamson",
      type: "Batsman",
      points: 255,
      role: "Player",
      price: 10.2,
    },
    {
      id: 8,
      name: "Trent Boult",
      type: "Bowler",
      points: 235,
      role: "Player",
      price: 8.5,
    },
    {
      id: 9,
      name: "Hardik Pandya",
      type: "All-Rounder",
      points: 250,
      role: "Player",
      price: 9.5,
    },
    {
      id: 10,
      name: "David Warner",
      type: "Batsman",
      points: 265,
      role: "Player",
      price: 10.5,
    },
    {
      id: 11,
      name: "Kagiso Rabada",
      type: "Bowler",
      points: 240,
      role: "Player",
      price: 9.0,
    },
  ],
};

export default function TeamView() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  // Fetch team data from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get("/api/players"); // Adjust the API endpoint
        console.log(response.data);
        setTeam(response.data);
        setCaptain(response.data.players.find((p) => p.role === "Captain")?.id);
        setViceCaptain(
          response.data.players.find((p) => p.role === "Vice Captain")?.id
        );
      } catch (error) {
        console.error("Error fetching team:", error);
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handleSave = async () => {
    setEditing(false);
    if (!team) return;

    const updatedTeam = {
      ...team,
      players: team.players.map((p) => ({
        ...p,
        role:
          p.id === captain
            ? "Captain"
            : p.id === viceCaptain
            ? "Vice Captain"
            : "Player",
      })),
    };

    try {
      await axios.post("/api/team", updatedTeam); // Adjust API endpoint if needed
      console.log("Team saved successfully!");
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  if (loading) return <p>Loading team data...</p>;
  if (error) return <p>Error: {error}</p>;

  const playersByType = {
    batsmen: team.players.filter((p) => p.type === "Batsman"),
    bowlers: team.players.filter((p) => p.type === "Bowler"),
    allRounders: team.players.filter((p) => p.type === "All-Rounder"),
    wicketKeepers: team.players.filter((p) => p.type === "Wicket Keeper"),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">{TEAM.name}</h2>
          <p className="text-muted-foreground">Managed by {TEAM.owner}</p>
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Team
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>Performance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Points</span>
                <span className="text-xl font-bold">{TEAM.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Rank</span>
                <span className="text-xl font-bold">#{TEAM.rank}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Budget Used</span>
                  <span>
                    ${TEAM.budget.used}M / ${TEAM.budget.total}M
                  </span>
                </div>
                <Progress
                  value={(TEAM.budget.used / TEAM.budget.total) * 100}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg border p-3 text-center">
                  <div className="text-muted-foreground text-xs">Batsmen</div>
                  <div className="text-xl font-bold">
                    {playersByType.batsmen.length}
                  </div>
                </div>
                <div className="flex-1 rounded-lg border p-3 text-center">
                  <div className="text-muted-foreground text-xs">Bowlers</div>
                  <div className="text-xl font-bold">
                    {playersByType.bowlers.length}
                  </div>
                </div>
                <div className="flex-1 rounded-lg border p-3 text-center">
                  <div className="text-muted-foreground text-xs">
                    All-Rounders
                  </div>
                  <div className="text-xl font-bold">
                    {playersByType.allRounders.length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Team Formation</CardTitle>
            <CardDescription>Your selected playing XI</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">
                  <Users className="mr-2 h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="formation">
                  <User2 className="mr-2 h-4 w-4" />
                  Formation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TEAM.players.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">
                          {player.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{player.type}</Badge>
                        </TableCell>
                        <TableCell>{player.points}</TableCell>
                        <TableCell>${player.price}M</TableCell>
                        <TableCell>
                          {editing ? (
                            <select
                              className="rounded-md border p-1 text-sm"
                              value={
                                player.id === captain
                                  ? "captain"
                                  : player.id === viceCaptain
                                  ? "viceCapt"
                                  : "player"
                              }
                              onChange={(e) => {
                                if (e.target.value === "captain") {
                                  setCaptain(player.id);
                                  if (player.id === viceCaptain)
                                    setViceCaptain(undefined);
                                } else if (e.target.value === "viceCapt") {
                                  setViceCaptain(player.id);
                                  if (player.id === captain)
                                    setCaptain(undefined);
                                }
                              }}
                            >
                              <option value="player">Player</option>
                              <option value="captain">Captain</option>
                              <option value="viceCapt">Vice Captain</option>
                            </select>
                          ) : (
                            <span
                              className={
                                player.role === "Captain"
                                  ? "text-primary font-semibold"
                                  : player.role === "Vice Captain"
                                  ? "text-blue-500 font-semibold"
                                  : ""
                              }
                            >
                              {player.role}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="formation">
                <div className="relative h-[380px] w-full bg-green-100 dark:bg-green-950 rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=380&width=800')] bg-cover bg-center opacity-10"></div>
                  <div className="relative h-full flex flex-col justify-between p-4">
                    {/* Batsmen */}
                    <div className="flex justify-around">
                      {playersByType.batsmen.slice(0, 4).map((player) => (
                        <PlayerFormationCard
                          key={player.id}
                          player={player}
                          isCaptain={
                            player.id === captain || player.role === "Captain"
                          }
                          isViceCaptain={
                            player.id === viceCaptain ||
                            player.role === "Vice Captain"
                          }
                        />
                      ))}
                    </div>

                    {/* All-rounders */}
                    <div className="flex justify-around">
                      {playersByType.allRounders.map((player) => (
                        <PlayerFormationCard
                          key={player.id}
                          player={player}
                          isCaptain={
                            player.id === captain || player.role === "Captain"
                          }
                          isViceCaptain={
                            player.id === viceCaptain ||
                            player.role === "Vice Captain"
                          }
                        />
                      ))}
                      {/* Fill in any gaps with remaining batsmen */}
                      {playersByType.batsmen.slice(4).map((player) => (
                        <PlayerFormationCard
                          key={player.id}
                          player={player}
                          isCaptain={
                            player.id === captain || player.role === "Captain"
                          }
                          isViceCaptain={
                            player.id === viceCaptain ||
                            player.role === "Vice Captain"
                          }
                        />
                      ))}
                    </div>

                    {/* Bowlers */}
                    <div className="flex justify-around">
                      {playersByType.bowlers.map((player) => (
                        <PlayerFormationCard
                          key={player.id}
                          player={player}
                          isCaptain={
                            player.id === captain || player.role === "Captain"
                          }
                          isViceCaptain={
                            player.id === viceCaptain ||
                            player.role === "Vice Captain"
                          }
                        />
                      ))}
                    </div>

                    {/* Wicket keeper */}
                    <div className="flex justify-center">
                      {playersByType.wicketKeepers.map((player) => (
                        <PlayerFormationCard
                          key={player.id}
                          player={player}
                          isCaptain={
                            player.id === captain || player.role === "Captain"
                          }
                          isViceCaptain={
                            player.id === viceCaptain ||
                            player.role === "Vice Captain"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlayerFormationCard({ player, isCaptain, isViceCaptain }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md">
          <User2 className="h-6 w-6 text-primary" />
        </div>
        {isCaptain && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            C
          </span>
        )}
        {isViceCaptain && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
            VC
          </span>
        )}
      </div>
      <div className="mt-1 text-center">
        <div className="max-w-[80px] truncate text-xs font-medium">
          {player.name}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {player.points} pts
        </div>
      </div>
    </div>
  );
}
