import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ArtistRoyalties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Royalty Distribution</CardTitle>
        <CardDescription>Track your royalty distributions to investors</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Streams</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Distributed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                date: "May 1, 2025",
                platform: "Spotify",
                streams: "245,678",
                revenue: "125 SOL",
                distributed: "18.75 SOL",
              },
              {
                date: "May 1, 2025",
                platform: "Apple Music",
                streams: "178,432",
                revenue: "95 SOL",
                distributed: "14.25 SOL",
              },
              {
                date: "May 1, 2025",
                platform: "YouTube Music",
                streams: "324,567",
                revenue: "85 SOL",
                distributed: "12.75 SOL",
              },
              {
                date: "Apr 1, 2025",
                platform: "Spotify",
                streams: "198,345",
                revenue: "105 SOL",
                distributed: "15.75 SOL",
              },
              {
                date: "Apr 1, 2025",
                platform: "Apple Music",
                streams: "145,678",
                revenue: "78 SOL",
                distributed: "11.7 SOL",
              },
            ].map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.platform}</TableCell>
                <TableCell>{item.streams}</TableCell>
                <TableCell>{item.revenue}</TableCell>
                <TableCell className="text-right">{item.distributed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
