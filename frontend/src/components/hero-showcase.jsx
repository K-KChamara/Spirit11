import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trophy,
  Medal,
  Star,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Crown,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export function HeroShowcase() {
  const [topBatsmen, setTopBatsmen] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [topAllRounders, setTopAllRounders] = useState([]);
  const [topTeams, setTopTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/player");
        const players = response.data;

        // Categorize Players
        const bowlers = players
          .filter((p) => p.category === "Bowler" && p.bowlingStrikeRate)
          .sort(
            (a, b) => (b.bowlingStrikeRate ?? 0) - (a.bowlingStrikeRate ?? 0)
          )
          .slice(0, 5);

        const batsmen = players
          .filter((p) => p.category === "Batsman" && p.battingStrikeRate)
          .sort(
            (a, b) => (b.battingStrikeRate ?? 0) - (a.battingStrikeRate ?? 0)
          )
          .slice(0, 5);

        const allRounders = players
          .filter((p) => p.category === "All-Rounder" && p.points)
          .sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

        // Set State
        setTopBowlers(bowlers);
        setTopBatsmen(batsmen);
        setTopAllRounders(allRounders);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/team");
        const teams = response.data;
        console.log("team1", teams[0]);
        // Categorize Teams
        console.log("teams", teams);
        const topTeams = [...teams] // Create a copy to avoid mutating the original array
          .sort((a, b) => (b.totalValue ?? 0) - (a.totalValue ?? 0))
          .slice(0, 5);
        setTeams(teams);
        setTopTeams(topTeams);
        console.log("topteam:", topTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Cricket Highlights
        </h2>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest cricket stats, teams, and tournaments
        </p>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="teams">
            <Trophy className="mr-2 h-4 w-4" />
            Top Teams
          </TabsTrigger>
          <TabsTrigger value="players">
            <Users className="mr-2 h-4 w-4" />
            Star Players
          </TabsTrigger>
        
            
        </TabsList>

        {/* Top Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render top 3 teams */}
            {topTeams.slice(0, 3).map((team, i) => (
              <>
                <Card
                  key={i}
                  className="md:col-span-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        <Crown className="mr-1 h-3 w-3" /> #{i + 1} Ranked
                      </Badge>
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <CardTitle className="mt-2">{team.teamName}</CardTitle>
                    <CardDescription>5-time League Champions</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-amber-200 dark:border-amber-800">
                          <AvatarImage
                            src="/placeholder.svg?height=48&width=48"
                            alt={team.teamName}
                          />
                          <AvatarFallback>{team.teamName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium">Recent Form</div>
                          <div className="text-sm text-muted-foreground">
                            W W L W W
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">86%</div>
                        <div className="text-xs text-muted-foreground">
                          Win Rate
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-background rounded-md p-2">
                        <div className="font-medium">18</div>
                        <div className="text-xs text-muted-foreground">
                          Matches
                        </div>
                      </div>
                      <div className="bg-background rounded-md p-2">
                        <div className="font-medium">14</div>
                        <div className="text-xs text-muted-foreground">
                          Wins
                        </div>
                      </div>
                      <div className="bg-background rounded-md p-2">
                        <div className="font-medium">+1.23</div>
                        <div className="text-xs text-muted-foreground">NRR</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Team Rankings</CardTitle>
                    <CardDescription>
                      Based on recent performance and tournament standings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[220px] pr-4">
                      <div className="space-y-2">
                        {topTeams.map((team, i) => (
                          <div
                            key={i}
                            className="flex items-center p-2 rounded-md hover:bg-muted"
                          >
                            <div className="w-8 text-center font-bold">
                              {team.rank}
                            </div>
                            <Avatar className="h-10 w-10 mx-2">
                              <AvatarImage
                                src={/placeholder.svg?height=32&width=32/}
                                alt={team.name}
                              />
                              <AvatarFallback>
                                {team.teamName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {team.teamName}
                              </div>
                            </div>
                            <div>
                              <Badge className="bg-amber-500 hover:bg-amber-600">
                                <Crown className="mr-1 h-3 w-3" /> #{i + 1}{" "}
                                Ranked
                              </Badge>
                            </div>
                            <div className="text-center w-12 ml-6 mr-6">
                              <div className="font-medium">
                                {team.totalValue.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                pts
                              </div>
                            </div>
                            <div className="text-center w-12 mr-6">
                              <div className="font-medium">{team.price}</div>
                              <div className="text-xs text-muted-foreground">
                                price
                              </div>
                            </div>

                            {/* <div className="ml-2 text-xs tracking-wider">
              {team.form.split(" ").map((result, j) => (
                <span
                  key={j}
                  className={`inline-block w-5 h-5 rounded-full text-center leading-5 mx-0.5
                    ${
                      result === "W"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                >
                  {result}
                </span>
              ))}
            </div> */}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            ))}
          </div>
        </TabsContent>

        {/* Star Players Tab */}
        <TabsContent value="players" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Player */}
            <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <Star className="mr-1 h-3 w-3" /> MVP
                  </Badge>
                  <Award className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="mt-2">{topAllRounders[0].name}</CardTitle>
                <CardDescription>{topAllRounders[0].university}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Avatar className="h-16 w-16 border-2 border-blue-200 dark:border-blue-800">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Virat Kohli"
                    />
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{topAllRounders[0].totalRuns}</div>
                    <div className="text-xs text-muted-foreground">
                      Season Runs
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">{topAllRounders[0].economyRate.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Economy Rate</div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">{topAllRounders[0].battingStrikeRate.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">
                      Strike Rate
                    </div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">{topAllRounders[0].points.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">
                      Points
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player Rankings */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Leading players based on current season statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="batsmen">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="batsmen">Batsmen</TabsTrigger>
                    <TabsTrigger value="bowlers">Bowlers</TabsTrigger>
                    <TabsTrigger value="all-rounders">All-Rounders</TabsTrigger>
                  </TabsList>

                  <TabsContent value="batsmen">
                    <ScrollArea className="h-[180px] pr-4">
                      <div className="space-y-2">
                        {topBatsmen.map((player, i) => (
                          <div
                            key={i}
                            className="flex items-center p-2 rounded-md hover:bg-muted"
                          >
                            <div className="w-8 text-center font-bold">
                              {i + 1}
                            </div>
                            <Avatar className="h-8 w-8 mx-2">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {player.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {player.university}
                              </div>
                            </div>
                            <div className="text-center w-16">
                              <div className="font-medium">
                                {player.totalRuns}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                runs
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.battingAverage.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                avg
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.battingStrikeRate.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                SR
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="bowlers">
                    <ScrollArea className="h-[180px] pr-4">
                      <div className="space-y-2">
                        {topBowlers.map((player, i) => (
                          <div
                            key={i}
                            className="flex items-center p-2 rounded-md hover:bg-muted"
                          >
                            <div className="w-8 text-center font-bold">
                              {i + 1}
                            </div>
                            <Avatar className="h-8 w-8 mx-2">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {player.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {player.university}
                              </div>
                            </div>
                            <div className="text-center w-16">
                              <div className="font-medium">
                                {player.wickets}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                wickets
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.economyRate.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                econ
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.bowlingStrikeRate.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                SR
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="all-rounders">
                    <ScrollArea className="h-[180px] pr-4">
                      <div className="space-y-2">
                        {topAllRounders.map((player, i) => (
                          <div
                            key={i}
                            className="flex items-center p-2 rounded-md hover:bg-muted"
                          >
                            <div className="w-8 text-center font-bold">
                              {i + 1}
                            </div>
                            <Avatar className="h-8 w-8 mx-2">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {player.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {player.university}
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.totalRuns}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                runs
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.wickets}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                wkts
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">
                                {player.points.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                pts
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tournaments Tab */}
      </Tabs>
    </section>
  );
}
