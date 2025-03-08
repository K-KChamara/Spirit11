"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"

export function AddPlayerForm({ onSuccess }) {
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
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Submitting player data:", formData)

    // Simulate success and close the dialog
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

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" name="university" value={formData.university} onChange={handleChange} required />
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
              <SelectItem value="Wicket-Keeper">Wicket-Keeper</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalRuns">Total Runs</Label>
            <Input
              id="totalRuns"
              name="totalRuns"
              type="number"
              min="0"
              value={formData.totalRuns}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ballsFaced">Balls Faced</Label>
            <Input
              id="ballsFaced"
              name="ballsFaced"
              type="number"
              min="0"
              value={formData.ballsFaced}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inningsPlayed">Innings Played</Label>
            <Input
              id="inningsPlayed"
              name="inningsPlayed"
              type="number"
              min="0"
              value={formData.inningsPlayed}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wickets">Wickets</Label>
            <Input id="wickets" name="wickets" type="number" min="0" value={formData.wickets} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="oversBowled">Overs Bowled</Label>
            <Input
              id="oversBowled"
              name="oversBowled"
              type="number"
              min="0"
              step="0.1"
              value={formData.oversBowled}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="runsConceded">Runs Conceded</Label>
            <Input
              id="runsConceded"
              name="runsConceded"
              type="number"
              min="0"
              value={formData.runsConceded}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onSuccess()}>
          Cancel
        </Button>
        <Button type="submit">Add Player</Button>
      </DialogFooter>
    </form>
  )
}

