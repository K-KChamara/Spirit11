"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Filter, Download } from "lucide-react"
import { AddPlayerForm } from "@/components/add-player-form"
import { useEffect } from "react"
import axios from "axios"
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer"
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
//   },
// ]

export default function PlayersPage() {
  


  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [universityFilter, setUniversityFilter] = useState("")
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("players");
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();


    if (!isSignedIn) {
      navigate("/sign-in");
      return
    }
  useEffect(() => {
    const getAllPlayers = async () => {
      const response =  await axios.get("http://localhost:3000/api/player")
      setPlayers(response.data)
    }
    getAllPlayers()
  } , [])
  console.log("playes from db" , players);

  // Filter players based on search term and filters
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? player.category === categoryFilter : true
    const matchesUniversity = universityFilter ? player.university === universityFilter : true

    return matchesSearch && matchesCategory && matchesUniversity
  })

  // Get unique categories and universities for filters
  const categories = [...new Set(players.map((player) => player.category))]
  const universities = [...new Set(players.map((player) => player.university))]

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage player information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Player
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
                <DialogDescription>Enter the details of the new player to add them to the system.</DialogDescription>
              </DialogHeader>
              <AddPlayerForm onSuccess={() => setIsAddPlayerOpen(false)} />
            </DialogContent>
          </Dialog>
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

          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>
                  {university}
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
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Value</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <TableRow key={player._id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.university}</TableCell>
                  <TableCell>{player.category}</TableCell>
                  <TableCell className="text-right">{player.points.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{player.value}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Edit player">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete player">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No players found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SiteFooter className="m-0 w-fit" />
    </div>
  )
}

