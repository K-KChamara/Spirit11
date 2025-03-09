"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import axios from "axios"

export function AddPlayerForm({ onSuccess , setTrigger }) {
  const [players, setPlayers] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/player")
        setPlayers(response.data)
      } catch (error) {
        console.error("Error fetching players:", error)
      }
    }
    getAllPlayers()
  }, [])

  const uniqueUniversities = [...new Set(players.map((player) => player.university))]

  const [formData, setFormData] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBowled: 0,
    runsConceded: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Filter university suggestions
    if (name === "university") {
      setSuggestions(
        uniqueUniversities.filter((uni) => uni.toLowerCase().includes(value.toLowerCase()))
      )
    }
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSuggestionClick = (university) => {
    setFormData((prev) => ({
      ...prev,
      university,
    }))
    setSuggestions([]) // Hide suggestions after selection
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Submitting player data:", formData)
    try{
      const res = await axios.post("http://localhost:3000/api/player", formData)
      alert(`Player ${res.data.name} added successfully!`)
      setTrigger( pre  => !pre)
      setFormData({
        name: "",
        university: "",
        category: "",
        totalRuns: 0,
        ballsFaced: 0,
        inningsPlayed: 0,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
      })

    }catch(error) {
      console.error("Error submitting player data:", error)
    }

    setTimeout(() => {
      onSuccess()
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Player Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="university">University</Label>
            <Input
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
            />
            {suggestions.length > 0 && (
              <div className="absolute bg-white border border-gray-300 w-full rounded-md shadow-md mt-1 z-10">
                {suggestions.map((uni, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(uni)}
                  >
                    {uni}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Batsman">Batsman</SelectItem>
              <SelectItem value="Bowler">Bowler</SelectItem>
              <SelectItem value="All-Rounder">All-Rounder</SelectItem>
          
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalRuns">Total Runs</Label>
            <Input id="totalRuns" name="totalRuns" type="number" min="0" value={formData.totalRuns} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ballsFaced">Balls Faced</Label>
            <Input id="ballsFaced" name="ballsFaced" type="number" min="0" value={formData.ballsFaced} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inningsPlayed">Innings Played</Label>
            <Input id="inningsPlayed" name="inningsPlayed" type="number" min="0" value={formData.inningsPlayed} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wickets">Wickets</Label>
            <Input id="wickets" name="wickets" type="number" min="0" value={formData.wickets} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="oversBowled">Overs Bowled</Label>
            <Input id="oversBowled" name="oversBowled" type="number" min="0" step="0.1" value={formData.oversBowled} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="runsConceded">Runs Conceded</Label>
            <Input id="runsConceded" name="runsConceded" type="number" min="0" value={formData.runsConceded} onChange={handleChange} />
          </div>
        </div>
      </div>

        <div className="flex flex-row gap-2">
        <Button type="submit">Add Player</Button>
        <Button type="button" variant="outline" onClick={() => onSuccess()}>
          Cancel
        </Button>
        
        </div>

  
    </form>
  )
}
