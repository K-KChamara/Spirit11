"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLAYER_TYPES = ["Batsman", "Bowler", "All-Rounder", "Wicket Keeper"];

// Mock data for players
const PLAYERS = [
  {
    id: 1,
    name: "Virat Kohli",
    type: "Batsman",
    university: "Delhi University",
    points: 280,
    price: 11.5,
    stats: {
      battingAvg: 54.2,
      strikeRate: 138.6,
      form: "Excellent",
    },
  },
  {
    id: 2,
    name: "Jasprit Bumrah",
    type: "Bowler",
    university: "Gujarat University",
    points: 265,
    price: 10.0,
    stats: {
      economy: 6.2,
      wickets: 28,
      form: "Good",
    },
  },
  {
    id: 3,
    name: "Ben Stokes",
    type: "All-Rounder",
    university: "Durham University",
    points: 290,
    price: 12.5,
    stats: {
      battingAvg: 38.4,
      economy: 7.8,
      form: "Great",
    },
  },
  {
    id: 4,
    name: "MS Dhoni",
    type: "Wicket Keeper",
    university: "Ranchi University",
    points: 270,
    price: 10.8,
    stats: {
      battingAvg: 42.5,
      dismissals: 35,
      form: "Good",
    },
  },
  {
    id: 5,
    name: "Rohit Sharma",
    type: "Batsman",
    university: "Mumbai University",
    points: 275,
    price: 11.0,
    stats: {
      battingAvg: 49.8,
      strikeRate: 143.2,
      form: "Excellent",
    },
  },
  {
    id: 6,
    name: "Rashid Khan",
    type: "Bowler",
    university: "Kabul University",
    points: 260,
    price: 9.8,
    stats: {
      economy: 5.9,
      wickets: 32,
      form: "Excellent",
    },
  },
];

export default function PlayersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const filteredPlayers = PLAYERS.filter((player) => {
    return (
      (searchTerm === "" ||
        player.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType === null || player.type === selectedType)
    );
  });

  const togglePlayerSelection = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search players..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PLAYER_TYPES.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() =>
                    setSelectedType(type === selectedType ? null : type)
                  }
                  className="flex items-center justify-between"
                >
                  {type}
                  {type === selectedType && (
                    <span className="text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedType(null)}
                className="text-primary font-medium"
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Points (High-Low)</DropdownMenuItem>
              <DropdownMenuItem>Price (Low-High)</DropdownMenuItem>
              <DropdownMenuItem>Form</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="default" size="sm" className="h-9">
            Add Selected ({selectedPlayers.length})
          </Button>
        </div>
      </div>

      {selectedType && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            Type: {selectedType}
            <button
              className="ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedType(null)}
            >
              ×
            </button>
          </Badge>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className={`group cursor-pointer transition-all hover:shadow-md ${
              selectedPlayers.includes(player.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => togglePlayerSelection(player.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{player.name}</CardTitle>
                  <CardDescription>{player.university}</CardDescription>
                </div>
                <Checkbox
                  checked={selectedPlayers.includes(player.id)}
                  onCheckedChange={() => togglePlayerSelection(player.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5"
                />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between mb-2">
                <Badge variant="secondary">{player.type}</Badge>
                <Badge
                  variant="outline"
                  className={
                    player.stats.form === "Excellent"
                      ? "bg-green-500/10 text-green-500"
                      : player.stats.form === "Great"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }
                >
                  {player.stats.form}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                {player.type === "Batsman" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Batting Avg:
                      </span>
                      <span className="font-medium">
                        {player.stats.battingAvg}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Strike Rate:
                      </span>
                      <span className="font-medium">
                        {player.stats.strikeRate}
                      </span>
                    </div>
                  </>
                )}
                {player.type === "Bowler" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Economy:</span>
                      <span className="font-medium">
                        {player.stats.economy}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wickets:</span>
                      <span className="font-medium">
                        {player.stats.wickets}
                      </span>
                    </div>
                  </>
                )}
                {player.type === "All-Rounder" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Batting Avg:
                      </span>
                      <span className="font-medium">
                        {player.stats.battingAvg}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Economy:</span>
                      <span className="font-medium">
                        {player.stats.economy}
                      </span>
                    </div>
                  </>
                )}
                {player.type === "Wicket Keeper" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Batting Avg:
                      </span>
                      <span className="font-medium">
                        {player.stats.battingAvg}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dismissals:</span>
                      <span className="font-medium">
                        {player.stats.dismissals}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between border-t text-sm">
              <div className="font-semibold">{player.points} pts</div>
              <div className="font-semibold text-primary">${player.price}M</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
