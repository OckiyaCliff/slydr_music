import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function FanActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent investment and royalty transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                date: "May 10, 2025",
                type: "Investment",
                artist: "Sarah Johnson",
                amount: "50 SOL",
                status: "Completed",
                txid: "7X8Jx9Y2...3F9b",
              },
              {
                date: "May 9, 2025",
                type: "Royalty Payment",
                artist: "The Resonants",
                amount: "12.5 SOL",
                status: "Completed",
                txid: "4LPXbX0...K0XM",
              },
              {
                date: "May 7, 2025",
                type: "Token Transfer",
                artist: "Marcus Lee",
                amount: "25 SOL",
                status: "Completed",
                txid: "9ZqRs7T...2Vxp",
              },
              {
                date: "May 5, 2025",
                type: "Royalty Payment",
                artist: "Sarah Johnson",
                amount: "8.3 SOL",
                status: "Completed",
                txid: "3KmNpQ8...7Yzx",
              },
              {
                date: "May 1, 2025",
                type: "Investment",
                artist: "Eliza Chen",
                amount: "50 SOL",
                status: "Completed",
                txid: "6BvCxD2...1Wut",
              },
            ].map((transaction, i) => (
              <TableRow key={i}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "Royalty Payment" ? "secondary" : "outline"}>
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.artist}</TableCell>
                <TableCell>
                  {transaction.type === "Royalty Payment" ? "+" : "-"}
                  {transaction.amount}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs">{transaction.txid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
