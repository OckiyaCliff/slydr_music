"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useWallet } from "@solana/wallet-adapter-react"
import { Search, Filter, Music, ChevronDown, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for artists and campaigns
// Static data for artists
const artistsData = [
  {
    id: "1",
    name: "Luna Ray",
    genre: "Electronic",
    image: "/musician-portrait.png",
    campaign: "Cosmic Drift Album",
    goal: 1500,
    raised: 1200,
    daysLeft: 12,
  },
  {
    id: "2",
    name: "The Resonants",
    genre: "Rock",
    image: "/energetic-rock-band.png",
    campaign: "European Tour 2023",
    goal: 3000,
    raised: 1800,
    daysLeft: 20,
  },
  {
    id: "3",
    name: "J. Stellar",
    genre: "Hip Hop",
    image: "/hip-hop-artist.png",
    campaign: "Breakthrough Mixtape",
    goal: 800,
    raised: 750,
    daysLeft: 5,
  },
  {
    id: "4",
    name: "Aria Nova",
    genre: "Pop",
    image: "/female-vocalist.png",
    campaign: "Debut Single",
    goal: 500,
    raised: 300,
    daysLeft: 15,
  },
  {
    id: "5",
    name: "Blue Note Quartet",
    genre: "Jazz",
    image: "/jazz-ensemble.png",
    campaign: "Live at The Blue Room",
    goal: 2000,
    raised: 1000,
    daysLeft: 25,
  },
  {
    id: "6",
    name: "Pulse Wave",
    genre: "EDM",
    image: "/electronic-musician.png",
    campaign: "Festival Circuit EP",
    goal: 1200,
    raised: 600,
    daysLeft: 18,
  },
]

export default function ExplorePage() {
  const { connected } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("trending")
  const [fundingRange, setFundingRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [artists, setArtists] = useState<typeof artistsData>([])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setArtists(artistsData)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter artists based on search query and selected genres
  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.campaign.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(artist.genre)

    const matchesFunding =
      (artist.raised / artist.goal) * 100 >= fundingRange[0] && (artist.raised / artist.goal) * 100 <= fundingRange[1]

    return matchesSearch && matchesGenre && matchesFunding
  })

  // Sort artists based on selected sort option
  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return 0
      case "newest":
        return b.id.localeCompare(a.id)
      case "funding-high":
        return b.raised / b.goal - a.raised / a.goal
      case "funding-low":
        return a.raised / a.goal - b.raised / b.goal
      case "ending-soon":
        return a.daysLeft - b.daysLeft
      default:
        return 0
    }
  })

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const allGenres = Array.from(new Set(artists.map((artist) => artist.genre)))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-purple-50 dark:to-purple-950/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Artists & Invest</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explore music artists seeking funding and invest in their royalty tokens on the Solana blockchain.
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search artists, genres, or campaigns..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <Button
                  variant="outline"
                  className="flex items-center justify-between"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex flex-wrap gap-2">
                  {selectedGenres.map((genre) => (
                    <Badge key={genre} variant="outline" className="flex items-center gap-1">
                      {genre}
                      <button className="ml-1 rounded-full hover:bg-muted" onClick={() => handleGenreToggle(genre)}>
                        ✕
                      </button>
                    </Badge>
                  ))}
                  {fundingRange[0] > 0 || fundingRange[1] < 100 ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Funding: {fundingRange[0]}%-{fundingRange[1]}%
                      <button className="ml-1 rounded-full hover:bg-muted" onClick={() => setFundingRange([0, 100])}>
                        ✕
                      </button>
                    </Badge>
                  ) : null}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort by: {sortBy.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("trending")}>Trending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("funding-high")}>Funding (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("funding-low")}>Funding (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("ending-soon")}>Ending Soon</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {showFilters && (
              <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-medium">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {allGenres.map((genre) => (
                        <Badge
                          key={genre}
                          variant={selectedGenres.includes(genre) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleGenreToggle(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Funding Progress</h3>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={fundingRange}
                      onValueChange={setFundingRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{fundingRange[0]}%</span>
                      <span>{fundingRange[1]}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Tabs defaultValue="all" className="mt-8">
              <TabsList>
                <TabsTrigger value="all">All Campaigns</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="singles">Singles</TabsTrigger>
                <TabsTrigger value="tours">Tours</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    Array(6)
                      .fill(0)
                      .map((_, index) => <ArtistCardSkeleton key={index} />)
                  ) : sortedArtists.length > 0 ? (
                    sortedArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} connected={connected} />)
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <Music className="mb-4 h-12 w-12 text-muted-foreground/50" />
                      <h3 className="text-lg font-medium">No artists found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="albums" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading
                    ? Array(3)
                        .fill(0)
                        .map((_, index) => <ArtistCardSkeleton key={index} />)
                    : sortedArtists
                        .filter((artist) => artist.campaign.toLowerCase().includes("album"))
                        .map((artist) => <ArtistCard key={artist.id} artist={artist} connected={connected} />)}
                </div>
              </TabsContent>
              <TabsContent value="singles" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading
                    ? Array(2)
                        .fill(0)
                        .map((_, index) => <ArtistCardSkeleton key={index} />)
                    : sortedArtists
                        .filter((artist) => artist.campaign.toLowerCase().includes("single"))
                        .map((artist) => <ArtistCard key={artist.id} artist={artist} connected={connected} />)}
                </div>
              </TabsContent>
              <TabsContent value="tours" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading
                    ? Array(2)
                        .fill(0)
                        .map((_, index) => <ArtistCardSkeleton key={index} />)
                    : sortedArtists
                        .filter((artist) => artist.campaign.toLowerCase().includes("tour"))
                        .map((artist) => <ArtistCard key={artist.id} artist={artist} connected={connected} />)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

interface ArtistCardProps {
  artist: (typeof artistsData)[0]
  connected: boolean
}

function ArtistCard({ artist, connected }: ArtistCardProps) {
  //const campaign = artist.campaigns[0]

  return (
    <Link href={`/artist/${artist.id}`} key={artist.id}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{artist.name}</CardTitle>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {artist.genre}
            </span>
          </div>
          <CardDescription>{artist.campaign}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(100, (artist.raised / artist.goal) * 100)}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>
              <span className="font-medium">{artist.raised} SOL</span> raised
            </span>
            <span>{Math.round((artist.raised / artist.goal) * 100)}%</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{artist.daysLeft}</span> days left
          </div>
          <Button size="sm">View Campaign</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

function ArtistCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-5 w-12" />
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
