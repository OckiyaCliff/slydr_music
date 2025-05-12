"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Music, DollarSign, TrendingUp, BarChart3, Coins } from "lucide-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletNotConnected } from "@/components/wallet/wallet-not-connected"
import { FanPortfolio } from "@/components/dashboard/fan/fan-portfolio"
import { FanDiscovery } from "@/components/dashboard/fan/fan-discovery"
import { FanActivity } from "@/components/dashboard/fan/fan-activity"
import { FanProfile } from "@/components/dashboard/fan/fan-profile"

export default function FanDashboardPage() {
  const { connected } = useWallet()

  if (!connected) {
    return <WalletNotConnected />
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Investor Dashboard"
        text="Manage your music investments and discover new opportunities."
      >
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Explore Artists</Button>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425 SOL</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Royalties Earned</CardTitle>
            <Coins className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.3 SOL</div>
            <p className="text-xs text-muted-foreground">+8.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artists Backed</CardTitle>
            <Music className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.3%</div>
            <p className="text-xs text-muted-foreground">+2.4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your royalty earnings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-purple-200 dark:text-purple-900/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle>Top Performing Artists</CardTitle>
            <CardDescription>Based on royalty returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", genre: "Indie Pop", roi: "+24.5%" },
                { name: "The Resonants", genre: "Alternative Rock", roi: "+18.2%" },
                { name: "Marcus Lee", genre: "Hip Hop", roi: "+15.7%" },
              ].map((artist, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium">{artist.name}</div>
                      <div className="text-xs text-muted-foreground">{artist.genre}</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">{artist.roi}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="mt-6">
        <TabsList className="bg-purple-50 dark:bg-purple-900/10">
          <TabsTrigger
            value="portfolio"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-purple-900 dark:data-[state=active]:text-purple-100"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="discovery"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-purple-900 dark:data-[state=active]:text-purple-100"
          >
            Discovery
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-purple-900 dark:data-[state=active]:text-purple-100"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-purple-900 dark:data-[state=active]:text-purple-100"
          >
            Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio" className="space-y-4">
          <FanPortfolio />
        </TabsContent>
        <TabsContent value="discovery" className="space-y-4">
          <FanDiscovery />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <FanActivity />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <FanProfile />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
