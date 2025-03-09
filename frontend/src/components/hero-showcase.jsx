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
  }, []);

  console.log("Top Batsmen:", topBatsmen);
  console.log("Top Bowlers:", topBowlers);
  console.log("Top All-rounders:", topAllRounders);

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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="teams">
            <Trophy className="mr-2 h-4 w-4" />
            Top Teams
          </TabsTrigger>
          <TabsTrigger value="players">
            <Users className="mr-2 h-4 w-4" />
            Star Players
          </TabsTrigger>
          <TabsTrigger value="tournaments">
            <Calendar className="mr-2 h-4 w-4" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        {/* Top Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Team */}
            <Card className="md:col-span-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    <Crown className="mr-1 h-3 w-3" /> #1 Ranked
                  </Badge>
                  <Trophy className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="mt-2">Mumbai Indians</CardTitle>
                <CardDescription>5-time IPL Champions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-amber-200 dark:border-amber-800">
                      <AvatarImage
                        src="/placeholder.svg?height=48&width=48"
                        alt="Mumbai Indians"
                      />
                      <AvatarFallback>MI</AvatarFallback>
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
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">14</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">+1.23</div>
                    <div className="text-xs text-muted-foreground">NRR</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Rankings */}
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
                    {[
                      {
                        name: "Mumbai Indians",
                        rank: 1,
                        points: 28,
                        nrr: "+1.23",
                        form: "W W L W W",
                      },
                      {
                        name: "Chennai Super Kings",
                        rank: 2,
                        points: 26,
                        nrr: "+0.98",
                        form: "W W W L W",
                      },
                      {
                        name: "Royal Challengers Bangalore",
                        rank: 3,
                        points: 24,
                        nrr: "+0.76",
                        form: "L W W W L",
                      },
                      {
                        name: "Delhi Capitals",
                        rank: 4,
                        points: 22,
                        nrr: "+0.45",
                        form: "W L W W W",
                      },
                      {
                        name: "Kolkata Knight Riders",
                        rank: 5,
                        points: 20,
                        nrr: "+0.32",
                        form: "L W L W W",
                      },
                      {
                        name: "Rajasthan Royals",
                        rank: 6,
                        points: 18,
                        nrr: "-0.12",
                        form: "L L W W L",
                      },
                      {
                        name: "Punjab Kings",
                        rank: 7,
                        points: 16,
                        nrr: "-0.34",
                        form: "W L L W L",
                      },
                      {
                        name: "Sunrisers Hyderabad",
                        rank: 8,
                        points: 14,
                        nrr: "-0.58",
                        form: "L L W L W",
                      },
                      {
                        name: "Gujarat Titans",
                        rank: 9,
                        points: 12,
                        nrr: "-0.87",
                        form: "L W L L L",
                      },
                      {
                        name: "Lucknow Super Giants",
                        rank: 10,
                        points: 10,
                        nrr: "-1.23",
                        form: "L L L W L",
                      },
                    ].map((team, i) => (
                      <div
                        key={i}
                        className="flex items-center p-2 rounded-md hover:bg-muted"
                      >
                        <div className="w-8 text-center font-bold">
                          {team.rank}
                        </div>
                        <Avatar className="h-8 w-8 mx-2">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={team.name}
                          />
                          <AvatarFallback>
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {team.name}
                          </div>
                        </div>
                        <div className="text-center w-12">
                          <div className="font-medium">{team.points}</div>
                          <div className="text-xs text-muted-foreground">
                            pts
                          </div>
                        </div>
                        <div className="text-center w-12">
                          <div className="font-medium">{team.nrr}</div>
                          <div className="text-xs text-muted-foreground">
                            NRR
                          </div>
                        </div>
                        <div className="ml-2 text-xs tracking-wider">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
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
                <CardTitle className="mt-2">Virat Kohli</CardTitle>
                <CardDescription>Royal Challengers Bangalore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Avatar className="h-16 w-16 border-2 border-blue-200 dark:border-blue-800">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Virat Kohli"
                    />
                    <AvatarFallback>VK</AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <div className="text-2xl font-bold">732</div>
                    <div className="text-xs text-muted-foreground">
                      Season Runs
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">56.3</div>
                    <div className="text-xs text-muted-foreground">Average</div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">152.4</div>
                    <div className="text-xs text-muted-foreground">
                      Strike Rate
                    </div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">8</div>
                    <div className="text-xs text-muted-foreground">
                      50s/100s
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
                              <div className="font-medium">{player.totalRuns}</div>
                              <div className="text-xs text-muted-foreground">
                                runs
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">{player.battingAverage.toFixed(2)}</div>
                              <div className="text-xs text-muted-foreground">
                                avg
                              </div>
                            </div>
                            <div className="text-center w-12">
                              <div className="font-medium">{player.battingStrikeRate.toFixed(2)}</div>
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
                              <div className="font-medium">{player.bowlingStrikeRate.toFixed(2)}</div>
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
                              <div className="font-medium">{player.totalRuns}</div>
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
                              <div className="font-medium">{player.points.toFixed(2)}</div>
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
        <TabsContent value="tournaments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Tournament */}
            <Card className="md:col-span-1 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-purple-500 hover:bg-purple-600">
                    <TrendingUp className="mr-1 h-3 w-3" /> Live
                  </Badge>
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="mt-2">IPL 2023</CardTitle>
                <CardDescription>Season 16 - Playoffs Stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-800">
                      <AvatarImage
                        src="/placeholder.svg?height=48&width=48"
                        alt="IPL Trophy"
                      />
                      <AvatarFallback>IPL</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="font-medium">Next Match</div>
                      <div className="text-sm text-muted-foreground">
                        MI vs CSK
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">Today</div>
                    <div className="text-xs text-muted-foreground">7:30 PM</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-center text-sm">
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">Qualifier 1</div>
                    <div className="text-xs text-muted-foreground">
                      Mumbai Indians vs Chennai Super Kings
                    </div>
                  </div>
                  <div className="bg-background rounded-md p-2">
                    <div className="font-medium">Eliminator</div>
                    <div className="text-xs text-muted-foreground">
                      RCB vs Delhi Capitals
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>
                  Latest results from ongoing tournaments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px] pr-4">
                  <div className="space-y-4">
                    {[
                      {
                        tournament: "IPL 2023",
                        match: "Match 56",
                        team1: "Mumbai Indians",
                        team1Score: "213/3",
                        team2: "Sunrisers Hyderabad",
                        team2Score: "198/7",
                        result: "Mumbai Indians won by 15 runs",
                        date: "May 21, 2023",
                      },
                      {
                        tournament: "IPL 2023",
                        match: "Match 55",
                        team1: "Chennai Super Kings",
                        team1Score: "178/7",
                        team2: "Kolkata Knight Riders",
                        team2Score: "180/4",
                        result: "Kolkata Knight Riders won by 6 wickets",
                        date: "May 20, 2023",
                      },
                      {
                        tournament: "IPL 2023",
                        match: "Match 54",
                        team1: "Royal Challengers Bangalore",
                        team1Score: "197/5",
                        team2: "Gujarat Titans",
                        team2Score: "188/9",
                        result: "Royal Challengers Bangalore won by 9 runs",
                        date: "May 19, 2023",
                      },
                      {
                        tournament: "IPL 2023",
                        match: "Match 53",
                        team1: "Delhi Capitals",
                        team1Score: "187/3",
                        team2: "Punjab Kings",
                        team2Score: "183/8",
                        result: "Delhi Capitals won by 4 runs",
                        date: "May 18, 2023",
                      },
                      {
                        tournament: "IPL 2023",
                        match: "Match 52",
                        team1: "Rajasthan Royals",
                        team1Score: "202/5",
                        team2: "Lucknow Super Giants",
                        team2Score: "205/3",
                        result: "Lucknow Super Giants won by 7 wickets",
                        date: "May 17, 2023",
                      },
                    ].map((match, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {match.tournament}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">
                              {match.match}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {match.date}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 items-center">
                          <div className="col-span-2 flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={`/placeholder.svg?height=24&width=24`}
                                alt={match.team1}
                              />
                              <AvatarFallback>
                                {match.team1
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium truncate">
                              {match.team1}
                            </div>
                          </div>
                          <div className="col-span-1 text-center">
                            <div className="text-sm font-bold">
                              {match.team1Score}{" "}
                              <span className="text-muted-foreground">vs</span>{" "}
                              {match.team2Score}
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <div className="text-sm font-medium text-right truncate">
                              {match.team2}
                            </div>
                            <Avatar className="h-6 w-6 ml-2">
                              <AvatarImage
                                src={`/placeholder.svg?height=24&width=24`}
                                alt={match.team2}
                              />
                              <AvatarFallback>
                                {match.team2
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-center text-muted-foreground">
                          {match.result}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
