"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Download,
  BarChart2,
  ArrowUpDown,
  Edit,
} from "lucide-react";
import { UpdateStatsForm } from "@/components/update-stats-form";
import { useEffect } from "react";
import axios from "axios";
// Sample data
// const players = [
//   {
//     id: 1,
//     name: "Virat Kohli",
//     university: "Delhi University",
//     category: "Batsman",
//     totalRuns: 3500,
//     ballsFaced: 2800,
//     inningsPlayed: 75,
//     wickets: 5,
//     oversBowled: 120,
//     runsConceded: 980,
//     value: 15.5,
//   },
//   {
//     id: 2,
//     name: "Rohit Sharma",
//     university: "Mumbai University",
//     category: "Batsman",
//     totalRuns: 3200,
//     ballsFaced: 2500,
//     inningsPlayed: 72,
//     wickets: 12,
//     oversBowled: 200,
//     runsConceded: 1100,
//     value: 14.8,
//   },
//   {
//     id: 3,
//     name: "Jasprit Bumrah",
//     university: "Gujarat University",
//     category: "Bowler",
//     totalRuns: 350,
//     ballsFaced: 420,
//     inningsPlayed: 45,
//     wickets: 95,
//     oversBowled: 850,
//     runsConceded: 3200,
//     value: 14.2,
//   },
//   {
//     id: 4,
//     name: "Ravindra Jadeja",
//     university: "Saurashtra University",
//     category: "All-Rounder",
//     totalRuns: 1800,
//     ballsFaced: 1500,
//     inningsPlayed: 68,
//     wickets: 75,
//     oversBowled: 780,
//     runsConceded: 3100,
//     value: 13.5,
//   },
//   {
//     id: 5,
//     name: "KL Rahul",
//     university: "Karnataka University",
//     category: "Batsman",
//     totalRuns: 2800,
//     ballsFaced: 2300,
//     inningsPlayed: 65,
//     wickets: 0,
//     oversBowled: 0,
//     runsConceded: 0,
//     value: 12.0,
//   },
// ]

export default function PlayerStatsPage() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState("totalRuns");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isUpdateStatsOpen, setIsUpdateStatsOpen] = useState(false);
  useEffect(() => {
    const getAllPlayers = async () => {
      const response = await axios.get("http://localhost:3000/api/player");
      setPlayers(response.data);
    };
    getAllPlayers();
  }, []);
  console.log("players:", players);

  // Filter players based on search term and filters
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? player.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });

  // Get unique categories for filters
  const categories = [...new Set(players.map((player) => player.category))];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleUpdateStats = (player) => {
    setSelectedPlayer(player);
    setIsUpdateStatsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Player Statistics
          </h1>
          <p className="text-muted-foreground">
            Update and manage player performance statistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart2 className="mr-2 h-4 w-4" />
            View Charts
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" title="More filters">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Category</TableHead>

              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("totalRuns")}
              >
                <div className="flex items-center">
                  Total Runs
                  {sortField === "totalRuns" && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Balls Faced</TableHead>
              <TableHead>Innings Played</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("wickets")}
              >
                <div className="flex items-center">
                  Wickets
                  {sortField === "wickets" && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>

              <TableHead>Overs Played</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("value")}
              >
                RunConceded
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.length > 0 ? (
              sortedPlayers.map((player) => (
                <TableRow key={player._id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="font-medium">
                    {player.university}
                  </TableCell>
                  <TableCell>{player.category}</TableCell>
                  <TableCell>{player.totalRuns}</TableCell>
                  <TableCell>{player.ballsFaced}</TableCell>
                  <TableCell>{player.inningsPlayed}</TableCell>
                  <TableCell>{player.wickets}</TableCell>
                  <TableCell>{player.oversBowled}</TableCell>
                  <TableCell>{player.runsConceded}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdateStats(player)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No players found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPlayer && (
        <Dialog open={isUpdateStatsOpen} onOpenChange={setIsUpdateStatsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Update Player Statistics</DialogTitle>
              <DialogDescription>
                Update the statistics for {selectedPlayer.name}.
              </DialogDescription>
            </DialogHeader>
            <UpdateStatsForm
              player={selectedPlayer}
              onSuccess={() => setIsUpdateStatsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
