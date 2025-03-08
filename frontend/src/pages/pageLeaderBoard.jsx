

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BirdIcon as Cricket, Medal, Trophy, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Leaderboard() {
  const [teams, setTeams] = useState([])

  const [savedTeams, setSavedTeams] = useState([])
  useEffect(() => {

    const getAllteams = async () => {
      try{
        const res =  await axios.get("http://localhost:3000/api/team")
        console.log("saved teams" , res.data)
        setSavedTeams(res.data)
        setTeams(res.data.sort((a, b) => b.totalPoints - a.totalPoints))

      }catch(error){
        console.log(error)
      }
      
    }
    getAllteams()
   
  
    
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cricket className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Cricket Fiesta</h1>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="font-medium hover:underline">
                Team Builder
              </Link>
              <Link href="/leaderboard" className="font-medium hover:underline">
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-300">Leaderboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Top teams ranked by total player points</p>
          </div>

          {teams.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {teams.slice(0, 3).map((team, index) => (
                  <Card
                    key={team._id}
                    className={`
                    ${index === 0 ? "border-yellow-400 dark:border-yellow-600 border-2" : ""}
                    ${index === 1 ? "border-gray-400 dark:border-gray-500 border-2" : ""}
                    ${index === 2 ? "border-amber-600 dark:border-amber-700 border-2" : ""}
                  `}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                        {index === 1 && <Medal className="h-6 w-6 text-gray-500" />}
                        {index === 2 && <Medal className="h-6 w-6 text-amber-600" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {team.players.length} Players
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Total Points:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">{team.totalValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Team Value:</span>
                          <span className="font-medium">₹{team.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Teams</CardTitle>
                  <CardDescription>Complete ranking of all registered teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Players</TableHead>
                        <TableHead className="text-right">Team Value</TableHead>
                        <TableHead className="text-right">Total Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teams.map((team, index) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{team.players.length}</TableCell>
                          <TableCell className="text-right">₹{team.price}</TableCell>
                          <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                            {team.totalValue}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-medium">No Teams Yet</h3>
                  <p className="text-muted-foreground">Create your first team to see it on the leaderboard</p>
                  <Button asChild className="mt-2">
                    <Link href="/">Build Your Team</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

