
import { useState , useEffect} from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy, Users } from "lucide-react"
import YouTubeLive from "@/components/youtube-live"
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer"
export default function LiveStreamPage() {
  const [activeTab, setActiveTab] = useState("players");
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();


     useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isSignedIn, isLoaded, navigate]);
  const [currentMatch, setCurrentMatch] = useState({
    id: "live-match-1",
    videoId: "jfKfPfyJRdk", // Example YouTube Live video ID
    title: "University of Moratuwa  vs University of Peradeniya - 1st ODI",
    status: "LIVE",
    teams: {
      team1: { name: "University of Moratuwa", score: "245/6", overs: "42.3" },
      team2: { name: "University of Peradeniya", score: "0/0", overs: "0.0" },
    },
    venue: "Moratuwa University Cricket Ground",
    tournament: "Freshers 2025",
  })

  const upcomingMatches = [
  {
    id: "contest-1",
    title: "UoM vs UoC - Inter-University Coding Battle",
    date: "Tomorrow, 09:00 AM IST",
    venue: "University of Moratuwa",
  },
  {
    id: "contest-2",
    title: "UoP vs SLIIT - AI Challenge Showdown",
    date: "26 Jul, 10:00 AM IST",
    venue: "University of Peradeniya",
  },
  {
    id: "contest-3",
    title: "NSBM vs UoJ - Hackathon Finals",
    date: "30 Jul, 01:00 PM IST",
    venue: "NSBM Green University",
  },
]


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cricket Tournament Live Stream</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{currentMatch.title}</CardTitle>
                <Badge variant="destructive" className="animate-pulse">
                  {currentMatch.status}
                </Badge>
              </div>
              <CardDescription>
                {currentMatch.venue} | {currentMatch.tournament}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <YouTubeLive videoId={currentMatch.videoId} />

              <div className="mt-4 grid grid-cols-3 text-center p-4 bg-muted rounded-lg">
                <div className="text-left">
                  <h3 className="text-xl font-bold">{currentMatch.teams.team1.name}</h3>
                  <p className="text-2xl font-semibold">{currentMatch.teams.team1.score}</p>
                  <p className="text-sm text-muted-foreground">Overs: {currentMatch.teams.team1.overs}</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold">VS</span>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">{currentMatch.teams.team2.name}</h3>
                  <p className="text-2xl font-semibold">{currentMatch.teams.team2.score}</p>
                  <p className="text-sm text-muted-foreground">Overs: {currentMatch.teams.team2.overs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                <CalendarDays className="h-4 w-4 mr-2" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="teams">
                <Users className="h-4 w-4 mr-2" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="tournament">
                <Trophy className="h-4 w-4 mr-2" />
                Tournament
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Matches</CardTitle>
                  <CardDescription>Schedule for upcoming matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMatches.map((match) => (
                      <div key={match.id} className="border-b pb-3 last:border-0">
                        <h3 className="font-semibold">{match.title}</h3>
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                        <p className="text-sm">{match.venue}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Teams</CardTitle>
                  <CardDescription>Teams participating in the tournament</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "India",
                      "Australia",
                      "England",
                      "New Zealand",
                      "South Africa",
                      "Pakistan",
                      "West Indies",
                      "Sri Lanka",
                    ].map((team) => (
                      <div key={team} className="flex items-center gap-2 p-2 border rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          {team.charAt(0)}
                        </div>
                        <span>{team}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tournament">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Info</CardTitle>
                  <CardDescription>Cricket World Cup 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span>One Day International</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Teams:</span>
                      <span>10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matches:</span>
                      <span>48</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>Feb 15 - Mar 30, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defending Champion:</span>
                      <span>England</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      
      </div>
      <SiteFooter className="m-0 w-fit" />
    </div>
  )
}

