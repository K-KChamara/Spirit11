import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Bot, DollarSign } from "lucide-react";

export default function FeatureShowcase() {
  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Key Features</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="mt-2">Team Building</CardTitle>
            <CardDescription>Create your dream cricket XI</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Select real university cricket players based on their stats, form,
              and upcoming matches to build your winning team.
            </p>
            <Badge className="mt-3" variant="secondary">
              Player Stats
            </Badge>{" "}
            <Badge variant="secondary">Drag & Drop</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle className="mt-2">Competitions</CardTitle>
            <CardDescription>Compete with friends & globally</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join public leagues or create private competitions with friends to
              see whose fantasy cricket knowledge reigns supreme.
            </p>
            <Badge className="mt-3" variant="secondary">
              Leaderboards
            </Badge>{" "}
            <Badge variant="secondary">Private Leagues</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="mt-2">AI Assistant</CardTitle>
            <CardDescription>Smart team suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our AI-powered 'Spiriter' assistant analyzes player data and
              matches to offer personalized team recommendations.
            </p>
            <Badge className="mt-3" variant="secondary">
              Predictions
            </Badge>{" "}
            <Badge variant="secondary">Player Analysis</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle className="mt-2">Budget Management</CardTitle>
            <CardDescription>Strategic resource allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Balance your virtual budget to create the most competitive team
              possible within the salary cap constraints.
            </p>
            <Badge className="mt-3" variant="secondary">
              Spending Tracking
            </Badge>{" "}
            <Badge variant="secondary">Value Analysis</Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
