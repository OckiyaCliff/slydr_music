import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FanDiscovery() {
  return (
    <>
      <Tabs defaultValue="trending">
        <TabsList>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New Campaigns</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                artist: "Luna Ray",
                genre: "Dream Pop",
                title: "Debut Album",
                goal: "3,000 SOL",
                raised: "2,400 SOL",
                percent: 80,
                daysLeft: 7,
                royaltyPercent: 15,
              },
              {
                artist: "Rhythm Collective",
                genre: "Jazz Fusion",
                title: "World Tour",
                goal: "8,000 SOL",
                raised: "5,600 SOL",
                percent: 70,
                daysLeft: 12,
                royaltyPercent: 20,
              },
              {
                artist: "Neon Pulse",
                genre: "Synthwave",
                title: "EP Production",
                goal: "1,500 SOL",
                raised: "900 SOL",
                percent: 60,
                daysLeft: 15,
                royaltyPercent: 12,
              },
            ].map((campaign, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle>{campaign.artist}</CardTitle>
                  <CardDescription>{campaign.genre}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{campaign.percent}% Funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <Progress value={campaign.percent} className="h-2 mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Goal</p>
                      <p className="font-medium">{campaign.goal}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Raised</p>
                      <p className="font-medium">{campaign.raised}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Royalty %</p>
                      <p className="font-medium">{campaign.royaltyPercent}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Invest Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                artist: "Echo Valley",
                genre: "Folk Rock",
                title: "Debut Album",
                goal: "2,500 SOL",
                raised: "500 SOL",
                percent: 20,
                daysLeft: 25,
                royaltyPercent: 18,
              },
              {
                artist: "Skylar James",
                genre: "R&B",
                title: "Music Video",
                goal: "1,000 SOL",
                raised: "300 SOL",
                percent: 30,
                daysLeft: 20,
                royaltyPercent: 10,
              },
              {
                artist: "Quantum Beat",
                genre: "Electronic",
                title: "Album Production",
                goal: "4,000 SOL",
                raised: "800 SOL",
                percent: 20,
                daysLeft: 30,
                royaltyPercent: 15,
              },
            ].map((campaign, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle>{campaign.artist}</CardTitle>
                  <CardDescription>{campaign.genre}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{campaign.percent}% Funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <Progress value={campaign.percent} className="h-2 mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Goal</p>
                      <p className="font-medium">{campaign.goal}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Raised</p>
                      <p className="font-medium">{campaign.raised}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Royalty %</p>
                      <p className="font-medium">{campaign.royaltyPercent}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Invest Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                artist: "Melody Rivers",
                genre: "Neo Soul",
                title: "Second Album",
                goal: "5,000 SOL",
                raised: "3,000 SOL",
                percent: 60,
                daysLeft: 18,
                royaltyPercent: 15,
              },
              {
                artist: "Cosmic Drift",
                genre: "Ambient",
                title: "Live Concert Film",
                goal: "3,500 SOL",
                raised: "1,750 SOL",
                percent: 50,
                daysLeft: 21,
                royaltyPercent: 12,
              },
              {
                artist: "Rhythm Section",
                genre: "Jazz",
                title: "Studio Sessions",
                goal: "2,000 SOL",
                raised: "1,400 SOL",
                percent: 70,
                daysLeft: 10,
                royaltyPercent: 18,
              },
            ].map((campaign, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle>{campaign.artist}</CardTitle>
                  <CardDescription>{campaign.genre}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{campaign.percent}% Funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <Progress value={campaign.percent} className="h-2 mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Goal</p>
                      <p className="font-medium">{campaign.goal}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Raised</p>
                      <p className="font-medium">{campaign.raised}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Royalty %</p>
                      <p className="font-medium">{campaign.royaltyPercent}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Invest Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
