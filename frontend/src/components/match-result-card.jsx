import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronRight } from "lucide-react"

export function MatchResultCard({ match }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Match #{match.id}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {formatDate(match.date)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{match.teamA}</span>
              <span className="text-muted-foreground">{match.scoreA}</span>
            </div>
            <span className="text-xl font-bold">vs</span>
            <div className="flex flex-col items-end">
              <span className="font-bold text-lg">{match.teamB}</span>
              <span className="text-muted-foreground">{match.scoreB}</span>
            </div>
          </div>

          <div className="text-center text-sm font-medium py-1 px-2 bg-muted rounded-md">{match.result}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full justify-between">
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

