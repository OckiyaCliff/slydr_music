import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function FanPortfolio() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>Track your music royalty investments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artist</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Royalty %</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  artist: "Sarah Johnson",
                  genre: "Indie Pop",
                  investment: "100 SOL",
                  royaltyPercent: "0.05%",
                  earnings: "24.5 SOL",
                  roi: "+24.5%",
                },
                {
                  artist: "The Resonants",
                  genre: "Alternative Rock",
                  investment: "75 SOL",
                  royaltyPercent: "0.03%",
                  earnings: "13.7 SOL",
                  roi: "+18.2%",
                },
                {
                  artist: "Marcus Lee",
                  genre: "Hip Hop",
                  investment: "150 SOL",
                  royaltyPercent: "0.08%",
                  earnings: "23.6 SOL",
                  roi: "+15.7%",
                },
                {
                  artist: "Eliza Chen",
                  genre: "Electronic",
                  investment: "50 SOL",
                  royaltyPercent: "0.02%",
                  earnings: "5.8 SOL",
                  roi: "+11.6%",
                },
                {
                  artist: "Midnight Waves",
                  genre: "Synthwave",
                  investment: "80 SOL",
                  royaltyPercent: "0.04%",
                  earnings: "7.2 SOL",
                  roi: "+9.0%",
                },
              ].map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.artist}</div>
                      <div className="text-xs text-muted-foreground">{item.genre}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.investment}</TableCell>
                  <TableCell>{item.royaltyPercent}</TableCell>
                  <TableCell>{item.earnings}</TableCell>
                  <TableCell className="text-green-600">{item.roi}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
