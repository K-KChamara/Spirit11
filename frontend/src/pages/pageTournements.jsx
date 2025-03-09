"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Calendar,
  Trophy,
  Users,
  BarChart2,
  TrendingUp,
  Activity,
  Shield,
  Star,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  BirdIcon as Cricket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
// Sample data
const matches = [
  {
    id: 1,
    teamA: "Super Strikers",
    teamB: "Royal Challengers",
    scoreA: "185/6",
    scoreB: "180/8",
    result: "Super Strikers won by 5 runs",
    date: "2023-03-15",
    teamALogo: "SS",
    teamBLogo: "RC",
    highlights: ["Kohli's 75(42)", "Bumrah's 3/24"],
    venue: "Eden Gardens, Kolkata",
  },
  {
    id: 2,
    teamA: "Thunder Bolts",
    teamB: "Mighty Warriors",
    scoreA: "165/9",
    scoreB: "168/4",
    result: "Mighty Warriors won by 6 wickets",
    date: "2023-03-16",
    teamALogo: "TB",
    teamBLogo: "MW",
    highlights: ["Pant's 82(48)", "Jadeja's 2/22"],
    venue: "Wankhede Stadium, Mumbai",
  },
  {
    id: 3,
    teamA: "Victory Kings",
    teamB: "Super Strikers",
    scoreA: "172/7",
    scoreB: "150/10",
    result: "Victory Kings won by 22 runs",
    date: "2023-03-18",
    teamALogo: "VK",
    teamBLogo: "SS",
    highlights: ["Rahul's 92(56)", "Kuldeep's 4/28"],
    venue: "M. Chinnaswamy Stadium, Bangalore",
  },
  {
    id: 4,
    teamA: "Royal Challengers",
    teamB: "Thunder Bolts",
    scoreA: "190/4",
    scoreB: "185/7",
    result: "Royal Challengers won by 5 runs",
    date: "2023-03-20",
    teamALogo: "RC",
    teamBLogo: "TB",
    highlights: ["Kohli's 86(52)", "Chahal's 3/32"],
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
];

const teamRankings = [
  {
    rank: 1,
    name: "Super Strikers",
    played: 5,
    won: 4,
    lost: 1,
    points: 8,
    nrr: "+1.256",
    logo: "SS",
    form: ["W", "W", "L", "W", "W"],
  },
  {
    rank: 2,
    name: "Royal Challengers",
    played: 5,
    won: 3,
    lost: 2,
    points: 6,
    nrr: "+0.875",
    logo: "RC",
    form: ["W", "L", "W", "W", "L"],
  },
  {
    rank: 3,
    name: "Thunder Bolts",
    played: 4,
    won: 3,
    lost: 1,
    points: 6,
    nrr: "+0.650",
    logo: "TB",
    form: ["W", "W", "L", "W"],
  },
  {
    rank: 4,
    name: "Mighty Warriors",
    played: 5,
    won: 2,
    lost: 3,
    points: 4,
    nrr: "-0.125",
    logo: "MW",
    form: ["L", "W", "L", "W", "L"],
  },
  {
    rank: 5,
    name: "Victory Kings",
    played: 5,
    won: 2,
    lost: 3,
    points: 4,
    nrr: "-0.320",
    logo: "VK",
    form: ["L", "L", "W", "W", "L"],
  },
  {
    rank: 6,
    name: "Dynamic Dashers",
    played: 4,
    won: 1,
    lost: 3,
    points: 2,
    nrr: "-0.750",
    logo: "DD",
    form: ["L", "L", "W", "L"],
  },
  {
    rank: 7,
    name: "Power Hitters",
    played: 4,
    won: 1,
    lost: 3,
    points: 2,
    nrr: "-0.980",
    logo: "PH",
    form: ["L", "W", "L", "L"],
  },
  {
    rank: 8,
    name: "Speed Demons",
    played: 4,
    won: 0,
    lost: 4,
    points: 0,
    nrr: "-1.250",
    logo: "SD",
    form: ["L", "L", "L", "L"],
  },
];

const topRunScorers = [
  {
    name: "Virat Kohli",
    team: "Royal Challengers",
    value: 325,
    unit: "runs",
    avatar: "VK",
    matches: 5,
    average: 65.0,
    strikeRate: 158.5,
  },
  {
    name: "Rohit Sharma",
    team: "Super Strikers",
    value: 290,
    unit: "runs",
    avatar: "RS",
    matches: 5,
    average: 58.0,
    strikeRate: 152.6,
  },
  {
    name: "KL Rahul",
    team: "Victory Kings",
    value: 275,
    unit: "runs",
    avatar: "KL",
    matches: 5,
    average: 55.0,
    strikeRate: 145.5,
  },
  {
    name: "Shubman Gill",
    team: "Thunder Bolts",
    value: 245,
    unit: "runs",
    avatar: "SG",
    matches: 4,
    average: 61.25,
    strikeRate: 148.8,
  },
  {
    name: "Rishabh Pant",
    team: "Mighty Warriors",
    value: 220,
    unit: "runs",
    avatar: "RP",
    matches: 5,
    average: 44.0,
    strikeRate: 165.4,
  },
];

const topWicketTakers = [
  {
    name: "Jasprit Bumrah",
    team: "Super Strikers",
    value: 15,
    unit: "wickets",
    avatar: "JB",
    matches: 5,
    economy: 6.8,
    average: 14.2,
  },
  {
    name: "Mohammed Shami",
    team: "Thunder Bolts",
    value: 13,
    unit: "wickets",
    avatar: "MS",
    matches: 4,
    economy: 7.2,
    average: 15.8,
  },
  {
    name: "Yuzvendra Chahal",
    team: "Royal Challengers",
    value: 12,
    unit: "wickets",
    avatar: "YC",
    matches: 5,
    economy: 7.5,
    average: 18.2,
  },
  {
    name: "Ravindra Jadeja",
    team: "Mighty Warriors",
    value: 10,
    unit: "wickets",
    avatar: "RJ",
    matches: 5,
    economy: 6.9,
    average: 20.5,
  },
  {
    name: "Kuldeep Yadav",
    team: "Victory Kings",
    value: 9,
    unit: "wickets",
    avatar: "KY",
    matches: 5,
    economy: 7.8,
    average: 22.1,
  },
];

const mvpPlayers = [
  {
    name: "Hardik Pandya",
    team: "Dynamic Dashers",
    value: 15.5,
    unit: "M",
    avatar: "HP",
    runs: 210,
    wickets: 8,
  },
  {
    name: "Virat Kohli",
    team: "Royal Challengers",
    value: 15.2,
    unit: "M",
    avatar: "VK",
    runs: 325,
    wickets: 0,
  },
  {
    name: "Jasprit Bumrah",
    team: "Super Strikers",
    value: 14.8,
    unit: "M",
    avatar: "JB",
    runs: 25,
    wickets: 15,
  },
  {
    name: "Rohit Sharma",
    team: "Super Strikers",
    value: 14.5,
    unit: "M",
    avatar: "RS",
    runs: 290,
    wickets: 0,
  },
  {
    name: "Ravindra Jadeja",
    team: "Mighty Warriors",
    value: 13.8,
    unit: "M",
    avatar: "RJ",
    runs: 185,
    wickets: 10,
  },
];

const MatchResultCard = ({ match }) => {
  const [activeTab, setActiveTab] = useState("players");
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) {
    navigate("/sign-in");
    return;
  }
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md">
      <div className="p-4 text-white" style={{ background: "#1e4620" }}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium opacity-90">{match.date}</span>
          <Badge
            variant="outline"
            className="text-white border-white/30 bg-white/10"
          >
            {match.venue}
          </Badge>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="p-6 space-y-6" style={{ background: "#f8f9f8" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                className="h-12 w-12 border-2"
                style={{ borderColor: "#1e4620", background: "#e8f5e9" }}
              >
                <AvatarFallback
                  style={{ color: "#1e4620", fontWeight: "bold" }}
                >
                  {match.teamALogo}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold" style={{ color: "#1e4620" }}>
                  {match.teamA}
                </p>
                <p className="text-lg font-bold">{match.scoreA}</p>
              </div>
            </div>
            <div className="text-center">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: "#e8f5e9", color: "#1e4620" }}
              >
                VS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold" style={{ color: "#1e4620" }}>
                  {match.teamB}
                </p>
                <p className="text-lg font-bold">{match.scoreB}</p>
              </div>
              <Avatar
                className="h-12 w-12 border-2"
                style={{ borderColor: "#1e4620", background: "#e8f5e9" }}
              >
                <AvatarFallback
                  style={{ color: "#1e4620", fontWeight: "bold" }}
                >
                  {match.teamBLogo}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium text-center text-sm">{match.result}</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {match.highlights.map((highlight, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  style={{
                    background: "#e8f5e9",
                    color: "#1e4620",
                    borderColor: "#c8e6c9",
                  }}
                  className="border hover:bg-opacity-30"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TopPerformersCard = ({ title, icon, performers, type }) => {
  // Different shades of green for different card types
  const getHeaderColor = () => {
    switch (type) {
      case "runs":
        return "#2e7d32"; // Darker green for runs
      case "wickets":
        return "#1b5e20"; // Deepest green for wickets
      case "mvp":
        return "#388e3c"; // Medium green for MVP
      default:
        return "#43a047";
    }
  };

  return (
    <Card className="h-full border-0 shadow-md overflow-hidden">
      <CardHeader
        className="pb-3"
        style={{ background: getHeaderColor(), color: "white" }}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-white hover:bg-white/10"
          >
            View All <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5" style={{ background: "#f8f9f8" }}>
        {performers.map((performer, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                className="h-12 w-12 border-2"
                style={{ borderColor: "#1e4620", background: "#e8f5e9" }}
              >
                <AvatarFallback
                  style={{ color: "#1e4620", fontWeight: "bold" }}
                >
                  {performer.avatar}
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                style={{ background: getHeaderColor() }}
              >
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold" style={{ color: "#1e4620" }}>
                    {performer.name}
                  </p>
                  <p className="text-xs text-gray-600">{performer.team}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{performer.value}</p>
                  <p className="text-xs text-gray-600">{performer.unit}</p>
                </div>
              </div>

              {type === "runs" && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Matches:</span>{" "}
                    {performer.matches}
                  </div>
                  <div>
                    <span className="text-gray-500">Avg:</span>{" "}
                    {performer.average}
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Strike Rate:</span>{" "}
                    {performer.strikeRate}
                  </div>
                </div>
              )}

              {type === "wickets" && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Matches:</span>{" "}
                    {performer.matches}
                  </div>
                  <div>
                    <span className="text-gray-500">Econ:</span>{" "}
                    {performer.economy}
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Average:</span>{" "}
                    {performer.average}
                  </div>
                </div>
              )}

              {type === "mvp" && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Runs:</span>{" "}
                    {performer.runs}
                  </div>
                  <div>
                    <span className="text-gray-500">Wickets:</span>{" "}
                    {performer.wickets}
                  </div>
                </div>
              )}

              <Progress
                value={
                  index === 0
                    ? 100
                    : Math.round((performer.value / performers[0].value) * 100)
                }
                className="h-1.5 mt-2"
                style={{
                  background: "#e8f5e9",
                  "--progress-color": getHeaderColor(),
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function TournamentSummaryPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div>
      <div className="min-h-screen bg-[#f5f7f5] flex justify-center items-center">
        <div className="container py-8 space-y-8">
          {/* Header */}
          <div
            className="relative overflow-hidden rounded-xl p-8 text-white"
            style={{
              background:
                "linear-gradient(to right, #311b92, #0d47a1, #1b5e20)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cricket className="h-8 w-8" />
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    Cricket Premier League
                  </h1>
                </div>
                <p className="text-white/80 max-w-md">
                  Season 2023 • 8 Teams • 28 Matches • March 10-30, 2023
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  style={{ background: "#FFFFFF", color: "#1b5e20" }}
                  className="hover:bg-white/90"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Upcoming Matches
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card
                className="border-0 text-white"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    className="p-3 rounded-lg"
                  >
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Matches</p>
                    <p className="text-2xl font-bold">16/28</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-0 text-white"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    className="p-3 rounded-lg"
                  >
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Highest Score</p>
                    <p className="text-2xl font-bold">198/4</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-0 text-white"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    className="p-3 rounded-lg"
                  >
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Best Bowling</p>
                    <p className="text-2xl font-bold">5/22</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-0 text-white"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    className="p-3 rounded-lg"
                  >
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Most Sixes</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="results" className="space-y-6">
            <div className="rounded-lg p-1.5" style={{ background: "#1b5e20" }}>
              <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white">
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-md"
                >
                  Match Results
                </TabsTrigger>

                <TabsTrigger
                  value="performers"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-md"
                >
                  Top Performers
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((match) => (
                  <MatchResultCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rankings">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader style={{ background: "#1b5e20", color: "white" }}>
                  <CardTitle>Team Rankings</CardTitle>
                  <CardDescription className="text-white/80">
                    Current standings in the tournament
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow
                        style={{ background: "#e8f5e9" }}
                        className="hover:bg-gray-100"
                      >
                        <TableHead className="w-[80px]">Rank</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-center">Played</TableHead>
                        <TableHead className="text-center">Won</TableHead>
                        <TableHead className="text-center">Lost</TableHead>
                        <TableHead className="text-center">Points</TableHead>
                        <TableHead className="text-center">NRR</TableHead>
                        <TableHead className="text-center">Form</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamRankings.map((team) => (
                        <TableRow
                          key={team.rank}
                          className={`cursor-pointer transition-colors hover:bg-gray-50`}
                          style={{
                            background:
                              selectedTeam === team.rank ? "#e8f5e9" : "",
                          }}
                          onClick={() =>
                            setSelectedTeam(
                              team.rank === selectedTeam ? null : team.rank
                            )
                          }
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-1.5 h-8 rounded-full"
                                style={{
                                  background:
                                    team.rank <= 4 ? "#1b5e20" : "#e0e0e0",
                                }}
                              ></div>
                              <span className="font-bold">{team.rank}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar
                                className="h-8 w-8 border"
                                style={{
                                  borderColor: "#1b5e20",
                                  background: "#e8f5e9",
                                }}
                              >
                                <AvatarFallback style={{ color: "#1b5e20" }}>
                                  {team.logo}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className="font-medium"
                                style={{ color: "#1b5e20" }}
                              >
                                {team.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {team.played}
                          </TableCell>
                          <TableCell
                            className="text-center font-medium"
                            style={{ color: "#2e7d32" }}
                          >
                            {team.won}
                          </TableCell>
                          <TableCell
                            className="text-center font-medium"
                            style={{ color: "#c62828" }}
                          >
                            {team.lost}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              style={{
                                background: "#e8f5e9",
                                color: "#1b5e20",
                                borderColor: "#c8e6c9",
                              }}
                              className="font-bold"
                            >
                              {team.points}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="text-center font-medium flex items-center justify-center gap-1"
                            style={{
                              color:
                                Number.parseFloat(team.nrr) > 0
                                  ? "#2e7d32"
                                  : "#c62828",
                            }}
                          >
                            {Number.parseFloat(team.nrr) > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {team.nrr}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              {team.form.map((result, index) => (
                                <span
                                  key={index}
                                  className="w-6 h-6 text-xs flex items-center justify-center rounded-full font-medium"
                                  style={{
                                    background:
                                      result === "W" ? "#e8f5e9" : "#ffebee",
                                    color:
                                      result === "W" ? "#2e7d32" : "#c62828",
                                  }}
                                >
                                  {result}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TopPerformersCard
                  title="Top Run Scorers"
                  icon={<BarChart2 className="h-5 w-5" />}
                  performers={topRunScorers}
                  type="runs"
                />

                <TopPerformersCard
                  title="Top Wicket Takers"
                  icon={<Trophy className="h-5 w-5" />}
                  performers={topWicketTakers}
                  type="wickets"
                />

                <TopPerformersCard
                  title="Most Valuable Players"
                  icon={<Users className="h-5 w-5" />}
                  performers={mvpPlayers}
                  type="mvp"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SiteFooter className="m-0 w-fit" />
    </div>
  );
}
