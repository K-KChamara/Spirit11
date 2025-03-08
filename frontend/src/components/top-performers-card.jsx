import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopPerformersCard({ title, icon, performers }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{performer.name}</span>
                <span className="text-xs text-muted-foreground">{performer.team}</span>
              </div>
              <div className="font-bold">
                {performer.value} {performer.unit}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

