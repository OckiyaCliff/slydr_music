import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export function FanProfile() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Investor Profile</CardTitle>
          <CardDescription>Manage your investor profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/investor-avatar.png" alt="Investor" />
              <AvatarFallback>JD</AvatarFallback>
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
              <Input id="displayName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Investment Preferences</CardTitle>
          <CardDescription>Customize your investment experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive emails about new investment opportunities</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="royaltyAlerts">Royalty Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when you receive royalty payments</p>
              </div>
              <Switch id="royaltyAlerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="artistUpdates">Artist Updates</Label>
                <p className="text-xs text-muted-foreground">Receive updates from artists you've invested in</p>
              </div>
              <Switch id="artistUpdates" defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredGenres">Preferred Genres</Label>
            <Input id="preferredGenres" defaultValue="Indie Pop, Electronic, Hip Hop" />
            <p className="text-xs text-muted-foreground">Comma-separated list of your preferred music genres</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wallet Settings</CardTitle>
          <CardDescription>Manage your connected wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Connected Wallet</Label>
            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm">7X8Jx9Y2...3F9b</div>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="autoReinvest">Auto-Reinvest Royalties</Label>
            <div className="flex items-center space-x-2">
              <Switch id="autoReinvest" />
              <Label htmlFor="autoReinvest">Enabled</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically reinvest royalty payments into the same artist
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
