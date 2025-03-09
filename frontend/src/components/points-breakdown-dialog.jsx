import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Sample points breakdown data
const pointsBreakdown = [
  { id: 1, category: "Batting Performance", points: 450, description: "Points earned from batsmen performance" },
  { id: 2, category: "Bowling Performance", points: 380, description: "Points earned from bowlers performance" },
  { id: 3, category: "Fielding", points: 120, description: "Points earned from catches, run-outs, etc." },
  { id: 4, category: "Captain Bonus", points: 200, description: "Double points for captain performance" },
  { id: 5, category: "Vice-Captain Bonus", points: 100, description: "1.5x points for vice-captain performance" },
  { id: 6, category: "Manual Adjustment", points: -50, description: "Penalty for late team changes" },
  { id: 7, category: "Participation Bonus", points: 50, description: "Bonus for participating in all matches of the tournament" },
]

export function PointsBreakdownDialog({ user, open, onOpenChange }) {
  // Calculate total points from the breakdown
  const totalPoints = pointsBreakdown.reduce((sum, item) => sum + item.points, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Points Breakdown: {user.name}</DialogTitle>
          <DialogDescription>
            Username: {user.username} | Team: {user.teamName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Total Points: {totalPoints}</h3>
              <p className="text-sm text-muted-foreground">Last updated: {user.lastUpdated}</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointsBreakdown.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className={`text-right font-bold ${item.points < 0 ? "text-red-500" : ""}`}>
                      {item.points > 0 ? "+" : ""}
                      {item.points}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} className="font-bold text-right">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">{totalPoints}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

