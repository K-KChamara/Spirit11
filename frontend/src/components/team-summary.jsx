
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Trophy, X } from "lucide-react"

export function TeamSummary({ teamName, setTeamName, players, totalPoints, onRemovePlayer, onSaveTeam }) {
  return (
    <Card className="sticky top-4 bg-green-200 ">
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle>Your Team</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="h-8 text-sm"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">Total Points</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">{totalPoints.toFixed(2)}</div>
        </div>

        <Separator className="my-2" />

        <div className="text-sm font-medium mb-1">Selected Players ({players.length})</div>

        <ScrollArea className="h-[300px] pr-4">
          {players.length > 0 ? (
            <div className="space-y-2">
              {players.map((player) => (
                <div key={player._id} className="flex items-center justify-between rounded-lg border p-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">{player.points.toFixed(2)}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => onRemovePlayer(player._id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
              <Trophy className="h-8 w-8 mb-2 opacity-20" />
              <p>Select players to build your team</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={onSaveTeam} className="w-full" disabled={players.length === 0}>
          Save Team
        </Button>
      </CardFooter>
    </Card>
  )
}

