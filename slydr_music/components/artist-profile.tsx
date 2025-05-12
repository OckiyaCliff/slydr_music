import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ArtistProfile() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Artist Profile</CardTitle>
          <CardDescription>Manage your artist profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/artist-avatar.png" alt="Artist" />
              <AvatarFallback>SJ</AvatarFallback>
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
              <Label htmlFor="artistName">Artist Name</Label>
              <Input id="artistName" defaultValue="Sarah Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" defaultValue="Indie Pop" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              rows={5}
              defaultValue="Sarah Johnson is an indie pop artist based in Los Angeles. With her unique blend of electronic and acoustic elements, she has captivated audiences worldwide with her emotional lyrics and captivating melodies."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://sarahjohnson.music" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" defaultValue="contact@sarahjohnson.music" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" defaultValue="@sarahjohnsonmusic" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" defaultValue="@sarahjohnson" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input id="youtube" defaultValue="SarahJohnsonOfficial" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotify">Spotify Artist ID</Label>
            <Input id="spotify" defaultValue="4LPXbX0xCHDj1LhKJYK0XM" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
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
            <Label htmlFor="royaltyAddress">Royalty Receiving Address</Label>
            <Input id="royaltyAddress" defaultValue="7X8Jx9Y2...3F9b" />
            <p className="text-xs text-muted-foreground">This is where your artist share of royalties will be sent</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
