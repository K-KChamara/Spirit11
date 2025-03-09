import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Chart } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for budget information
const BUDGET_DATA = {
  total: 100,
  used: 82.5,
  remaining: 17.5,
  breakdown: {
    batsmen: 32.7,
    bowlers: 27.3,
    allRounders: 12.0,
    wicketKeeper: 10.5,
  },
  suggestions: [
    {
      id: 1,
      name: "Joe Root",
      type: "Batsman",
      price: 9.5,
      reason: "High performance consistency with lower price point",
    },
    {
      id: 2,
      name: "Yuzvendra Chahal",
      type: "Bowler",
      price: 8.2,
      reason: "Economical bowler with high wicket-taking ability",
    },
    {
      id: 3,
      name: "Quinton de Kock",
      type: "Wicket Keeper",
      price: 9.0,
      reason: "Better value alternative to current wicket keeper",
    },
  ],
};

// Chart data
const breakdownData = [
  { name: "Batsmen", value: BUDGET_DATA.breakdown.batsmen, color: "#10b981" },
  { name: "Bowlers", value: BUDGET_DATA.breakdown.bowlers, color: "#3b82f6" },
  {
    name: "All-Rounders",
    value: BUDGET_DATA.breakdown.allRounders,
    color: "#f59e0b",
  },
  {
    name: "Wicket Keeper",
    value: BUDGET_DATA.breakdown.wicketKeeper,
    color: "#6366f1",
  },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"];

const spendingTrendData = [
  { day: "Day 1", amount: 60 },
  { day: "Day 2", amount: 65 },
  { day: "Day 3", amount: 72 },
  { day: "Day 4", amount: 78 },
  { day: "Day 5", amount: 82.5 },
];

export default function BudgetView() {
  const percentUsed = (BUDGET_DATA.used / BUDGET_DATA.total) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${BUDGET_DATA.total}M</div>
            <p className="text-xs text-muted-foreground">
              Maximum allowed for team formation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${BUDGET_DATA.used}M</div>
            <div className="mt-2">
              <Progress value={percentUsed} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">
                {percentUsed.toFixed(1)}% of total budget used
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border",
            BUDGET_DATA.remaining < 5
              ? "border-red-500 dark:border-red-700"
              : "border-green-500 dark:border-green-700"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Budget
            </CardTitle>
            <div
              className={cn(
                "rounded-full px-2 py-1 text-xs",
                BUDGET_DATA.remaining < 5
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              )}
            >
              {BUDGET_DATA.remaining < 5 ? "Low" : "Healthy"}
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                BUDGET_DATA.remaining < 5
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              )}
            >
              ${BUDGET_DATA.remaining}M
            </div>
            <p className="text-xs text-muted-foreground">
              Available for additional players
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>Budget allocation by player types</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}M`, "Budget"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(BUDGET_DATA.breakdown).map(
                ([key, value], index) => (
                  <div key={key} className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <p className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-medium">${value}M</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Trend</CardTitle>
            <CardDescription>Your budget utilization over time</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="day"
                      className="fill-muted-foreground text-xs"
                    />
                    <YAxis className="fill-muted-foreground text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${value}M`, "Budget Used"]}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        borderRadius: "0.375rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="var(--primary)"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                You've used {percentUsed.toFixed(1)}% of your budget so far.
                {BUDGET_DATA.remaining < 20 ? (
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {" "}
                    Be careful with remaining player selections.
                  </span>
                ) : (
                  <span className="text-green-600 dark:text-green-400">
                    {" "}
                    You still have a healthy budget for future transfers.
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Optimization Suggestions</CardTitle>
          <CardDescription>
            Recommended players to maximize your budget efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Recommendation Reason
                </TableHead>
                <TableHead className="text-right">Potential Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BUDGET_DATA.suggestions.map((suggestion) => (
                <TableRow key={suggestion.id}>
                  <TableCell className="font-medium">
                    {suggestion.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{suggestion.type}</Badge>
                  </TableCell>
                  <TableCell>${suggestion.price}M</TableCell>
                  <TableCell className="hidden max-w-[300px] truncate sm:table-cell">
                    {suggestion.reason}
                  </TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">
                    $
                    {(suggestion.type === "Batsman"
                      ? 11.0 - suggestion.price
                      : suggestion.type === "Bowler"
                      ? 9.8 - suggestion.price
                      : 10.8 - suggestion.price
                    ).toFixed(1)}
                    M
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
