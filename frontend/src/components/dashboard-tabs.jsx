"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlayersView from "./players-view"
import TeamView from "./team-view"
import BudgetView from "./budget-view"
import LeaderboardView from "./leaderboard-view"



export default function DashboardTabs({ activeTab, setActiveTab }) {
  return (
    <Tabs value={activeTab} className="my-6" onValueChange={setActiveTab}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="myteam">My Team</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="players" className="space-y-4">
        <PlayersView />
      </TabsContent>

      <TabsContent value="myteam" className="space-y-4">
        <TeamView />
      </TabsContent>

      <TabsContent value="budget" className="space-y-4">
        <BudgetView />
      </TabsContent>

      <TabsContent value="leaderboard" className="space-y-4">
        <LeaderboardView />
      </TabsContent>
    </Tabs>
  )
}

