"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import {
  Music,
  Calendar,
  Clock,
  Users,
  Disc3,
  Play,
  Pause,
  BarChart3,
  Instagram,
  Twitter,
  Globe,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { WalletNotConnected } from "@/components/wallet/wallet-not-connected"
import { WalletMultiButton } from "@/components/wallet/wallet-multi-button"
import { useToast } from "@/hooks/use-toast"

// Mock data for artists and campaigns
const mockArtists = [
  {
    id: "1",
    name: "Sarah Johnson",
    genre: "Indie Pop",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    bio: "Sarah Johnson is an indie pop artist based in Los Angeles. With her unique blend of electronic and acoustic elements, she has captivated audiences worldwide with her emotional lyrics and captivating melodies. Her music explores themes of love, loss, and personal growth, resonating with listeners across generations.",
    followers: 12500,
    socialMedia: {
      instagram: "@sarahjohnsonmusic",
      twitter: "@sarahjohnson",
      website: "https://sarahjohnson.music",
    },
    campaigns: [
      {
        id: "1",
        title: "New Album: Cosmic Drift",
        type: "album",
        description:
          "My upcoming album 'Cosmic Drift' explores themes of space, time, and human connection. This will be my third studio album and features collaborations with several acclaimed producers and musicians. The funds raised will go towards studio time, mixing, mastering, and promotion.",
        goalAmount: 5000,
        amountRaised: 3900,
        percentFunded: 78,
        daysLeft: 14,
        royaltyPercentage: 15,
        investors: 1245,
        tracks: [
          { title: "Stardust Dreams", duration: "3:45", preview: true },
          { title: "Lunar Tides", duration: "4:12", preview: true },
          { title: "Cosmic Drift", duration: "5:30", preview: false },
          { title: "Nebula Heart", duration: "3:58", preview: false },
          { title: "Solar Winds", duration: "4:25", preview: false },
        ],
        updates: [
          {
            date: "May 5, 2025",
            title: "Recording Complete!",
            content:
              "I'm excited to announce that we've finished recording all tracks for the album. Now moving into mixing and mastering phase.",
          },
          {
            date: "April 20, 2025",
            title: "New Collaboration Announced",
            content:
              "Thrilled to share that award-winning producer Max Rivera will be joining us for the final production stages.",
          },
        ],
      },
    ],
    previousReleases: [
      {
        title: "Echoes of Tomorrow",
        year: 2023,
        type: "Album",
        streams: "1.2M",
        image:
          "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Midnight Whispers",
        year: 2021,
        type: "EP",
        streams: "850K",
        image:
          "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
    ],
  },
  {
    id: "2",
    name: "The Resonants",
    genre: "Alternative Rock",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    bio: "The Resonants are a four-piece alternative rock band known for their energetic live performances and thoughtful lyrics.",
    followers: 8700,
    socialMedia: {
      instagram: "@theresonants",
      twitter: "@theresonants",
      website: "https://theresonants.com",
    },
    campaigns: [
      {
        id: "2",
        title: "World Tour Support",
        type: "tour",
        description:
          "We're planning a 15-city world tour to promote our latest album. The funds will help cover travel expenses, venue bookings, and production costs.",
        goalAmount: 10000,
        amountRaised: 2500,
        percentFunded: 25,
        daysLeft: 30,
        royaltyPercentage: 20,
        investors: 578,
        tourDates: [
          { city: "New York", venue: "Mercury Lounge", date: "Sep 15, 2025" },
          { city: "Los Angeles", venue: "Troubadour", date: "Sep 22, 2025" },
          { city: "London", venue: "O2 Academy", date: "Oct 5, 2025" },
          { city: "Tokyo", venue: "Blue Note", date: "Oct 15, 2025" },
          { city: "Berlin", venue: "Lido", date: "Oct 25, 2025" },
        ],
        updates: [
          {
            date: "May 2, 2025",
            title: "Tour Dates Confirmed",
            content: "We've locked in all venues for our upcoming world tour. Tickets will go on sale next month.",
          },
        ],
      },
    ],
    previousReleases: [
      {
        title: "Echoes in the Dark",
        year: 2024,
        type: "Album",
        streams: "950K",
        image:
          "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
    ],
  },
]

export default function ArtistPage() {
  const { id } = useParams()
  const { connected } = useWallet()
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState(10)
  const [isInvesting, setIsInvesting] = useState(false)

  // Find the artist based on the ID from the URL
  const artist = mockArtists.find((a) => a.id === id)
  const campaign = artist?.campaigns[0]

  if (!artist || !campaign) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Artist Not Found</h1>
            <p className="text-muted-foreground">The artist you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" asChild>
              <a href="/explore">Back to Explore</a>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const handlePlayPreview = (index: number) => {
    if (isPlaying === index) {
      setIsPlaying(null)
    } else {
      setIsPlaying(index)
    }
  }

  const handleInvest = async () => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to invest in this campaign",
        variant: "destructive",
      })
      return
    }

    setIsInvesting(true)

    try {
      // In a real implementation, this would call the Solana program to invest in the campaign
      // For demo purposes, we'll simulate a successful investment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Investment successful",
        description: `You have successfully invested ${investmentAmount} SOL in ${artist.name}'s campaign`,
      })
    } catch (error) {
      console.error("Error investing:", error)
      toast({
        title: "Investment failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsInvesting(false)
    }
  }

  const calculateRoyaltyPercentage = () => {
    const totalInvestment = campaign.amountRaised + investmentAmount
    const investmentPercentage = (investmentAmount / campaign.goalAmount) * 100
    return ((investmentPercentage / 100) * campaign.royaltyPercentage).toFixed(4)
  }

  const calculatePlatformFee = () => {
    return (investmentAmount * 0.03).toFixed(2)
  }

  if (!connected) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-purple-50 dark:to-purple-950/20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{artist.name}</h1>
                  <p className="text-muted-foreground">{artist.genre}</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">{artist.bio}</p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <WalletMultiButton className="bg-purple-600 hover:bg-purple-700" />
                    <Button variant="outline">Follow Artist</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                    <Image
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="rounded-lg object-cover"
                      fill
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <WalletNotConnected />
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-purple-50 dark:to-purple-950/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    {artist.genre}
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1 text-sm">
                    <Users className="h-3 w-3" />
                    <span>{artist.followers.toLocaleString()} followers</span>
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{artist.name}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">{artist.bio}</p>
                <div className="flex space-x-4">
                  {artist.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${artist.socialMedia.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  )}
                  {artist.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${artist.socialMedia.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  {artist.socialMedia.website && (
                    <a
                      href={artist.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="rounded-lg object-cover"
                    fill
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2">
                            {campaign.type === "album" ? (
                              <Music className="mr-1 h-3 w-3" />
                            ) : campaign.type === "tour" ? (
                              <Calendar className="mr-1 h-3 w-3" />
                            ) : (
                              <Music className="mr-1 h-3 w-3" />
                            )}
                            <span className="capitalize">{campaign.type}</span>
                          </Badge>
                          <span className="flex items-center text-sm">
                            <Clock className="mr-1 h-3 w-3" />
                            {campaign.daysLeft} days left
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>{campaign.percentFunded}% Funded</span>
                        <span>
                          {campaign.amountRaised} / {campaign.goalAmount} SOL
                        </span>
                      </div>
                      <Progress value={campaign.percentFunded} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Investors</p>
                        <p className="text-xl font-bold">{campaign.investors}</p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Royalty %</p>
                        <p className="text-xl font-bold">{campaign.royaltyPercentage}%</p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Days Left</p>
                        <p className="text-xl font-bold">{campaign.daysLeft}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">About This Campaign</h3>
                      <p className="text-muted-foreground">{campaign.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">{campaign.type === "album" ? "Track List" : "Tour Dates"}</TabsTrigger>
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="discography">Discography</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{campaign.type === "album" ? "Track List" : "Tour Dates"}</CardTitle>
                        <CardDescription>
                          {campaign.type === "album"
                            ? "Preview available tracks from the upcoming album"
                            : "Upcoming tour dates and venues"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {campaign.type === "album" && campaign.tracks ? (
                          <div className="space-y-2">
                            {campaign.tracks.map((track, index) => (
                              <div key={index} className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                    <Disc3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{track.title}</p>
                                    <p className="text-xs text-muted-foreground">{track.duration}</p>
                                  </div>
                                </div>
                                {track.preview && (
                                  <Button variant="ghost" size="icon" onClick={() => handlePlayPreview(index)}>
                                    {isPlaying === index ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    <span className="sr-only">
                                      {isPlaying === index ? "Pause" : "Play"} {track.title}
                                    </span>
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : campaign.type === "tour" && campaign.tourDates ? (
                          <div className="space-y-2">
                            {campaign.tourDates.map((date, index) => (
                              <div key={index} className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                    <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{date.city}</p>
                                    <p className="text-xs text-muted-foreground">{date.venue}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{date.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="updates" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Campaign Updates</CardTitle>
                        <CardDescription>Latest news and progress updates from the artist</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {campaign.updates && campaign.updates.length > 0 ? (
                            campaign.updates.map((update, index) => (
                              <div key={index} className="rounded-md border p-4">
                                <div className="mb-2 flex items-center justify-between">
                                  <h3 className="font-medium">{update.title}</h3>
                                  <p className="text-sm text-muted-foreground">{update.date}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{update.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground">No updates yet</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="discography" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Previous Releases</CardTitle>
                        <CardDescription>Explore the artist's discography</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {artist.previousReleases && artist.previousReleases.length > 0 ? (
                            artist.previousReleases.map((release, index) => (
                              <div key={index} className="rounded-md border overflow-hidden">
                                <div className="relative h-40 w-full">
                                  <Image
                                    src={release.image || "/placeholder.svg"}
                                    alt={release.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-3">
                                  <h3 className="font-medium">{release.title}</h3>
                                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <p>
                                      {release.type} • {release.year}
                                    </p>
                                    <p className="flex items-center">
                                      <Play className="mr-1 h-3 w-3" />
                                      {release.streams}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground">No previous releases</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Invest in this Campaign</CardTitle>
                    <CardDescription>Support {artist.name} and earn royalties from their music</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="investmentAmount">Investment Amount (SOL)</Label>
                        <Input
                          id="investmentAmount"
                          type="number"
                          min="1"
                          max="1000"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                          className="w-20 text-right"
                        />
                      </div>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[investmentAmount]}
                        onValueChange={(value) => setInvestmentAmount(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 SOL</span>
                        <span>100 SOL</span>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <h3 className="mb-2 font-medium">Investment Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Investment Amount</span>
                          <span>{investmentAmount} SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee (3%)</span>
                          <span>{calculatePlatformFee()} SOL</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>{investmentAmount} SOL</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <h3 className="mb-2 font-medium">What You'll Get</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Royalty Percentage</span>
                          <span>{calculateRoyaltyPercentage()}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Annual Return</span>
                          <span>~{(Number(calculateRoyaltyPercentage()) * 2).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Token Amount</span>
                          <span>
                            {investmentAmount * 100} {artist.name.split(" ")[0].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleInvest} disabled={isInvesting}>
                      {isInvesting ? (
                        "Processing..."
                      ) : (
                        <>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Invest Now
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Analytics</CardTitle>
                    <CardDescription>Performance metrics for this campaign</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-[200px] flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Daily Avg.</p>
                        <p className="text-xl font-bold">
                          {(campaign.amountRaised / (30 - campaign.daysLeft)).toFixed(1)} SOL
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Projected</p>
                        <p className="text-xl font-bold">
                          {(
                            campaign.amountRaised +
                            (campaign.amountRaised / (30 - campaign.daysLeft)) * campaign.daysLeft
                          ).toFixed(0)}{" "}
                          SOL
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
