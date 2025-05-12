import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent transactions and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            {
              type: "Investment",
              artist: "Sarah Johnson",
              amount: "50 SOL",
              date: "2 hours ago",
            },
            {
              type: "Royalty Payment",
              artist: "The Resonants",
              amount: "12.5 SOL",
              date: "Yesterday",
            },
            {
              type: "Token Transfer",
              artist: "Marcus Lee",
              amount: "25 SOL",
              date: "3 days ago",
            },
          ].map((activity, i) => (
            <div key={i} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.type}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.artist} • {activity.date}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {activity.type === "Royalty Payment" ? "+" : "-"}
                {activity.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
