import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ArtistFunding() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Active Funding Campaigns</h2>
      </div>
      <Card className="bg-white dark:bg-gray-950 shadow-sm">
        <CardHeader>
          <CardTitle>Active Funding Campaigns</CardTitle>
          <CardDescription>Manage your current funding campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {[
            {
              title: "New Album Funding",
              goal: "5,000 SOL",
              raised: "3,900 SOL",
              percent: 78,
              investors: 1245,
              daysLeft: 14,
              royaltyPercent: 15,
            },
            {
              title: "World Tour Support",
              goal: "10,000 SOL",
              raised: "2,500 SOL",
              percent: 25,
              investors: 578,
              daysLeft: 30,
              royaltyPercent: 20,
            },
          ].map((campaign, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{campaign.title}</h3>
                <span className="text-sm text-muted-foreground">{campaign.percent}% Funded</span>
              </div>
              <Progress value={campaign.percent} className="h-2 bg-purple-100 dark:bg-purple-900/20">
                <div className="h-full bg-purple-600" style={{ width: `${campaign.percent}%` }} />
              </Progress>
              <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Goal</p>
                  <p className="font-medium">{campaign.goal}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Raised</p>
                  <p className="font-medium">{campaign.raised}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Investors</p>
                  <p className="font-medium">{campaign.investors}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days Left</p>
                  <p className="font-medium">{campaign.daysLeft}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Royalty %</p>
                  <p className="font-medium">{campaign.royaltyPercent}%</p>
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="w-full p-4 rounded-md bg-purple-50 dark:bg-purple-900/20 text-center">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Campaign creation is temporarily unavailable. Please check back later.
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
