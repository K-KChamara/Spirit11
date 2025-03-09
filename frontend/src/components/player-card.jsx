

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function PlayerCard({ player, isSelected, isDisabled, onSelect }) {

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Batsman":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Bowler":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "All-Rounders":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Wicket-Keepers":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? "ring-2 ring-green-500 dark:ring-green-400" : ""}`}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Avatar className="h-12 w-12 border-2 border-green-100 dark:border-green-800">
            <AvatarImage  alt={player.name} />
            <AvatarFallback className="bg-green-600 text-white">{getInitials(player.name)}</AvatarFallback>
          </Avatar>
          <Badge variant="outline" className={getTypeColor(player.category)}>
            {player.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg truncate">{player.name}</h3>
        {/* <p className="text-sm text-muted-foreground">{player.team}</p> */}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="font-semibold">LKR {player.value.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Points</p>
            <p className="font-semibold text-green-600 dark:text-green-400">{player.points.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onSelect}
          disabled={isDisabled}
          variant={isSelected ? "outline" : "default"}
          className="w-full"
        >
          {isSelected ? "Selected" : "Select Player"}
        </Button>
      </CardFooter>
    </Card>
  )
}

