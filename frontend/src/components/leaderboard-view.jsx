"use client";

import { useState } from "react";
import { Trophy, Search, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for leaderboard
const LEADERBOARD_DATA = [
  {
    id: 1,
    rank: 1,
    name: "James Wilson",
    teamName: "Super Kings",
    points: 2845,
    change: 0,
    captainPick: "Ben Stokes",
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Johnson",
    teamName: "Royal Challengers",
    points: 2780,
    change: 1,
    captainPick: "Virat Kohli",
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Brown",
    teamName: "Mumbai Warriors",
    points: 2756,
    change: -1,
    captainPick: "Rohit Sharma",
  },
  {
    id: 4,
    rank: 4,
    name: "Emily Davis",
    teamName: "Delhi Capitals",
    points: 2720,
    change: 2,
    captainPick: "MS Dhoni",
  },
  {
    id: 5,
    rank: 5,
    name: "Robert Chen",
    teamName: "Rajasthan Royals",
    points: 2705,
    change: 0,
    captainPick: "Ben Stokes",
  },
  {
    id: 6,
    rank: 6,
    name: "Lisa Patel",
    teamName: "Sunrisers",
    points: 2690,
    change: -2,
    captainPick: "Kane Williamson",
  },
  {
    id: 7,
    rank: 7,
    name: "Ahmed Khan",
    teamName: "Knight Riders",
    points: 2675,
    change: 3,
    captainPick: "Rashid Khan",
  },
  {
    id: 8,
    rank: 8,
    name: "Sophia Williams",
    teamName: "Punjab Kings",
    points: 2650,
    change: -1,
    captainPick: "Babar Azam",
  },
  {
    id: 9,
    rank: 9,
    name: "David Smith",
    teamName: "Chennai Super Kings",
    points: 2635,
    change: 0,
    captainPick: "MS Dhoni",
  },
  {
    id: 10,
    rank: 10,
    name: "Emma Thompson",
    teamName: "Titans",
    points: 2620,
    change: -1,
    captainPick: "Jos Buttler",
  },
  // Current user
  {
    id: 12,
    rank: 12,
    name: "John Doe",
    teamName: "Cricket Titans",
    points: 2590,
    change: 2,
    captainPick: "Ben Stokes",
    isCurrentUser: true,
  },
];

// Mock data for leagues
const LEAGUES = [
  { id: 1, name: "Global", members: 10000, isDefault: true },
  { id: 2, name: "Friends League", members: 15, isPrivate: true },
  { id: 3, name: "University League", members: 120 },
  { id: 4, name: "Work Colleagues", members: 25, isPrivate: true },
];

export default function LeaderboardView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);

  const filteredUsers = LEADERBOARD_DATA.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find the current user in the leaderboard
  const currentUser = LEADERBOARD_DATA.find((user) => user.isCurrentUser);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {selectedLeague.name}
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[180px]">
              <DropdownMenuLabel>Select League</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LEAGUES.map((league) => (
                <DropdownMenuItem
                  key={league.id}
                  onClick={() => setSelectedLeague(league)}
                  className="flex items-center justify-between"
                >
                  <span>{league.name}</span>
                  {league.isPrivate && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Private
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-sm text-muted-foreground">
            {selectedLeague.members.toLocaleString()} members
          </div>
        </div>

        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search participants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="global">
        <TabsList>
          <TabsTrigger value="global">Global Ranking</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          {currentUser && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {currentUser.rank}
                  </div>
                  <div>
                    <div className="font-semibold">{currentUser.teamName}</div>
                    <div className="text-sm text-muted-foreground">
                      You ({currentUser.name})
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{currentUser.points}</div>
                  <div className="flex items-center text-sm">
                    {currentUser.change > 0 ? (
                      <>
                        <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">
                          Up {currentUser.change} place
                          {currentUser.change !== 1 && "s"}
                        </span>
                      </>
                    ) : currentUser.change < 0 ? (
                      <>
                        <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">
                          Down {Math.abs(currentUser.change)} place
                          {Math.abs(currentUser.change) !== 1 && "s"}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">No change</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Rank</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Captain Pick
                  </TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="w-[80px] text-center">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className={user.isCurrentUser ? "bg-primary/5" : ""}
                  >
                    <TableCell>
                      {user.rank <= 3 ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full">
                          <Trophy
                            className={
                              user.rank === 1
                                ? "h-5 w-5 text-yellow-500"
                                : user.rank === 2
                                ? "h-5 w-5 text-gray-400"
                                : "h-5 w-5 text-amber-600"
                            }
                          />
                        </div>
                      ) : (
                        <span className="font-medium">{user.rank}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${user.name.charAt(
                              0
                            )}`}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.teamName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.name} {user.isCurrentUser && "(You)"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-medium">
                      {user.captainPick}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {user.points}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {user.change > 0 ? (
                          <Badge className="bg-green-500">
                            <ArrowUp className="mr-1 h-3 w-3" /> {user.change}
                          </Badge>
                        ) : user.change < 0 ? (
                          <Badge variant="destructive">
                            <ArrowDown className="mr-1 h-3 w-3" />{" "}
                            {Math.abs(user.change)}
                          </Badge>
                        ) : (
                          <Badge variant="outline">—</Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="friends">
          <div className="flex h-40 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">
                Switch to a private league to view your friends
              </p>
              <Button variant="outline" className="mt-2">
                Select Private League
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="flex h-40 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">
                Weekly rankings will be available after gameweek 1
              </p>
              <Button variant="outline" className="mt-2">
                View Schedule
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
