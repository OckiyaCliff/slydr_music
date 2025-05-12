"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { Check, User, Music, BarChart3 } from "lucide-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { WalletNotConnected } from "@/components/wallet/wallet-not-connected"

const userTypes = [
  {
    value: "artist",
    label: "Artist",
    description: "I create music and want to tokenize my royalties",
    icon: Music,
  },
  {
    value: "investor",
    label: "Investor",
    description: "I want to invest in music royalties",
    icon: BarChart3,
  },
]

export default function ProfilePage() {
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    bio: "",
    website: "",
    twitter: "",
    instagram: "",
    // Artist-specific fields
    genre: "",
    artistName: "",
    // Investor-specific fields
    investmentPreferences: "",
    notificationsEnabled: true,
    autoReinvest: false,
  })

  useEffect(() => {
    if (connected && publicKey) {
      // In a real app, we would fetch the user's profile data from a database
      // For demo purposes, we'll simulate loading profile data
      setIsLoading(true)
      setTimeout(() => {
        // Simulate fetching user data
        const mockUserType = localStorage.getItem("userType") || null
        setUserType(mockUserType)

        setFormData({
          displayName: "John Doe",
          email: "john.doe@example.com",
          bio: "Music enthusiast and blockchain investor",
          website: "https://johndoe.com",
          twitter: "@johndoe",
          instagram: "@johndoe",
          genre: "Electronic, Hip Hop",
          artistName: "JD",
          investmentPreferences: "Indie Pop, Electronic, Hip Hop",
          notificationsEnabled: true,
          autoReinvest: false,
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [connected, publicKey])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
    localStorage.setItem("userType", value)
    toast({
      title: "User type updated",
      description: `You are now registered as a${value === "artist" ? "n" : ""} ${value}`,
    })
  }

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate saving profile data
    setTimeout(() => {
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully",
      })
      setIsLoading(false)

      // Redirect to the appropriate dashboard based on user type
      if (userType === "artist") {
        router.push("/dashboard/artist")
      } else if (userType === "investor") {
        router.push("/dashboard/fan")
      }
    }, 1000)
  }

  if (!connected) {
    return <WalletNotConnected />
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile Settings" text="Manage your account and preferences" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>User Type</CardTitle>
            <CardDescription>Select whether you're an artist or an investor on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              {userTypes.map((type) => (
                <div
                  key={type.value}
                  className={cn(
                    "flex flex-1 cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground",
                    userType === type.value && "border-primary",
                  )}
                  onClick={() => handleUserTypeChange(type.value)}
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-2">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-medium">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                  {userType === type.value && (
                    <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-primary text-primary-foreground">
                      <Check className="h-6 w-6 p-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          {userType === "artist" && <TabsTrigger value="artist">Artist Profile</TabsTrigger>}
          {userType === "investor" && <TabsTrigger value="investor">Investor Preferences</TabsTrigger>}
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your account details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatar-placeholder.png" alt="Profile" />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">Recommended: 400x400px, max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} value={formData.bio} onChange={handleInputChange} disabled={isLoading} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={formData.website} onChange={handleInputChange} disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    value={publicKey?.toString() || ""}
                    disabled
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" value={formData.twitter} onChange={handleInputChange} disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" value={formData.instagram} onChange={handleInputChange} disabled={isLoading} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {userType === "artist" && (
          <TabsContent value="artist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Artist Profile</CardTitle>
                <CardDescription>Customize your artist profile and music information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="artistName">Artist/Band Name</Label>
                    <Input
                      id="artistName"
                      value={formData.artistName}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Music Genre(s)</Label>
                    <Input
                      id="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder="e.g., Pop, Rock, Hip Hop (comma separated)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Streaming Platforms</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="spotify">Spotify Artist ID</Label>
                      <Input id="spotify" placeholder="e.g., 4LPXbX0xCHDj1LhKJYK0XM" disabled={isLoading} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appleMusic">Apple Music ID</Label>
                      <Input id="appleMusic" placeholder="e.g., 123456789" disabled={isLoading} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Royalty Settings</Label>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Default Royalty Percentage</h4>
                          <p className="text-sm text-muted-foreground">
                            The default percentage of royalties you're willing to tokenize
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-20"
                          min="1"
                          max="100"
                          defaultValue="15"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Minimum Investment</h4>
                          <p className="text-sm text-muted-foreground">
                            Minimum amount in SOL that investors can contribute
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-20"
                          min="0.1"
                          step="0.1"
                          defaultValue="1"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Artist Profile"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        {userType === "investor" && (
          <TabsContent value="investor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investor Preferences</CardTitle>
                <CardDescription>Customize your investment preferences and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investmentPreferences">Preferred Music Genres</Label>
                  <Input
                    id="investmentPreferences"
                    value={formData.investmentPreferences}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="e.g., Indie Pop, Electronic, Hip Hop (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll notify you about investment opportunities in these genres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Investment Strategy</Label>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Auto-Reinvest Royalties</h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically reinvest earned royalties into the same artist
                          </p>
                        </div>
                        <Switch
                          id="autoReinvest"
                          checked={formData.autoReinvest}
                          onCheckedChange={(checked) => handleSwitchChange("autoReinvest", checked)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Default Investment Amount</h4>
                          <p className="text-sm text-muted-foreground">Default amount in SOL for new investments</p>
                        </div>
                        <Input
                          type="number"
                          className="w-20"
                          min="0.1"
                          step="0.1"
                          defaultValue="10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Risk Tolerance</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Low", "Medium", "High"].map((risk) => (
                      <div
                        key={risk}
                        className={cn(
                          "flex cursor-pointer items-center justify-center rounded-md border p-3 hover:bg-accent",
                          risk === "Medium" && "border-primary bg-primary/10",
                        )}
                      >
                        {risk}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This helps us recommend appropriate investment opportunities
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Investor Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive email notifications about important updates</p>
                  </div>
                  <Switch
                    id="notificationsEnabled"
                    checked={formData.notificationsEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("notificationsEnabled", checked)}
                    disabled={isLoading}
                  />
                </div>

                {userType === "artist" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Investment Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified when someone invests in your music</p>
                      </div>
                      <Switch defaultChecked disabled={isLoading} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Royalty Distribution Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified when royalties are distributed</p>
                      </div>
                      <Switch defaultChecked disabled={isLoading} />
                    </div>
                  </>
                )}

                {userType === "investor" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Investment Opportunities</Label>
                        <p className="text-xs text-muted-foreground">Get notified about new artists seeking funding</p>
                      </div>
                      <Switch defaultChecked disabled={isLoading} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Royalty Payment Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified when you receive royalty payments</p>
                      </div>
                      <Switch defaultChecked disabled={isLoading} />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Platform Updates</Label>
                    <p className="text-xs text-muted-foreground">Get notified about new features and updates</p>
                  </div>
                  <Switch defaultChecked disabled={isLoading} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
