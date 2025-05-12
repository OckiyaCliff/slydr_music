"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Copy, ExternalLink, RefreshCw, Send, ArrowUpRight, ArrowDownLeft, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { WalletNotConnected } from "@/components/wallet/wallet-not-connected"
import { useWalletBalance } from "@/hooks/use-wallet-balance"

// Mock transaction data for preview purposes
const MOCK_TRANSACTIONS = [
  {
    signature: "5xq7kM8M5JnHbU2CwYwBxwM9GJVj4WvPGT4GmPjmYFsSK3tP6Qj5oFmSX6zUQTCh7DHrYJ6GFKa9QAWm3yDYYRBd",
    timestamp: Date.now() / 1000 - 3600, // 1 hour ago
    type: "SOL_TRANSFER",
    nativeTransfers: [{ fromUserAccount: "random", toUserAccount: "current", amount: 1_500_000_000 }],
    status: "success",
  },
  {
    signature: "4tSPEWE8v73Cou8WTQQsVqN5hrEm9NN7qxcAqzMDyxMFGkMZ6cZVxDzQBK9J5NeHFgCPrYwWjibnGAp1TL9Y5qKT",
    timestamp: Date.now() / 1000 - 7200, // 2 hours ago
    type: "ROYALTY_PAYMENT",
    nativeTransfers: [{ fromUserAccount: "random", toUserAccount: "current", amount: 500_000_000 }],
    status: "success",
  },
  {
    signature: "3vJRRgRWxJB3KeJhTjVrpCaGVwt8uKnSVLzVFG1LmNjY2BveRdgECGDWKSyibJ3ZwsB1XNvRuzGNBkuhekXMpgj9",
    timestamp: Date.now() / 1000 - 86400, // 1 day ago
    type: "TOKEN_TRANSFER",
    nativeTransfers: [{ fromUserAccount: "current", toUserAccount: "random", amount: 2_000_000_000 }],
    status: "success",
  },
]

export default function WalletPage() {
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()
  const { balance, isLoading: isLoadingBalance, error: balanceError, refetch: refetchBalance } = useWalletBalance()

  const [isCopied, setIsCopied] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState("")
  const [sendAmount, setSendAmount] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleCopyAddress = async () => {
    if (!publicKey) return

    try {
      await navigator.clipboard.writeText(publicKey.toString())
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      })
    }
  }

  const handleViewExplorer = () => {
    if (!publicKey) return
    window.open(`https://explorer.solana.com/address/${publicKey.toString()}?cluster=devnet`, "_blank")
  }

  const handleSendTransaction = async () => {
    if (!publicKey || !connected) return

    if (!recipientAddress) {
      toast({
        title: "Missing recipient",
        description: "Please enter a recipient address",
        variant: "destructive",
      })
      return
    }

    if (!sendAmount || Number.parseFloat(sendAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to send",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    try {
      // In a real implementation, this would create and send a transaction
      // For demo purposes, we'll simulate a transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Transaction sent",
        description: `Successfully sent ${sendAmount} SOL to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
      })

      // Reset form
      setRecipientAddress("")
      setSendAmount("")

      // Refresh balance after sending
      setTimeout(() => {
        refetchBalance()
      }, 1000)
    } catch (error) {
      console.error("Error sending transaction:", error)
      toast({
        title: "Transaction failed",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleSetMaxAmount = () => {
    if (balance !== null) {
      // Leave 0.01 SOL for transaction fees
      const maxAmount = Math.max(0, balance - 0.01)
      setSendAmount(maxAmount.toFixed(4))
    }
  }

  // Format SOL amount (from lamports)
  const formatSolAmount = (lamports: number) => {
    return (lamports / 1_000_000_000).toFixed(4)
  }

  // Get transaction type label
  const getTransactionTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      SOL_TRANSFER: "SOL Transfer",
      TOKEN_TRANSFER: "Token Transfer",
      ROYALTY_PAYMENT: "Royalty Payment",
    }
    return typeMap[type] || "Transaction"
  }

  // Check if transaction is incoming
  const isIncomingTransaction = (tx: any, address: string): boolean => {
    if (!tx.nativeTransfers || !tx.nativeTransfers.length) return false
    return tx.nativeTransfers.some(
      (transfer: any) =>
        transfer.toUserAccount === "current" ||
        (address && transfer.toUserAccount.toLowerCase() === address.toLowerCase()),
    )
  }

  if (!connected) {
    return <WalletNotConnected />
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Wallet" text="Manage your Solana wallet and transactions" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Wallet Address</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleCopyAddress}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy address</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleViewExplorer}>
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View on explorer</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <code className="text-sm font-mono break-all">{publicKey?.toString()}</code>
              {isCopied && <span className="ml-2 text-xs text-green-500">Copied!</span>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">SOL Balance</CardTitle>
            <Button variant="ghost" size="icon" onClick={refetchBalance} disabled={isLoadingBalance}>
              <RefreshCw className={`h-4 w-4 ${isLoadingBalance ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh balance</span>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoadingBalance ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <>
                <div className="text-3xl font-bold">{balance !== null ? `${balance.toFixed(4)} SOL` : "N/A"}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${balance !== null ? (balance * 20).toFixed(2) : "0.00"} USD
                </p>
                {balanceError && (
                  <div className="mt-2">
                    <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">{balanceError}</AlertDescription>
                    </Alert>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="mt-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent wallet activity from the Solana blockchain</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TRANSACTIONS.map((tx) => {
                    const isIncoming = publicKey ? isIncomingTransaction(tx, publicKey.toString()) : false
                    const amount = tx.nativeTransfers.length > 0 ? formatSolAmount(tx.nativeTransfers[0].amount) : "0"

                    return (
                      <TableRow key={tx.signature}>
                        <TableCell>
                          <Badge
                            variant={tx.type === "ROYALTY_PAYMENT" ? "secondary" : "outline"}
                            className={tx.type === "ROYALTY_PAYMENT" ? "bg-green-100 text-green-800" : ""}
                          >
                            {getTransactionTypeLabel(tx.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className={isIncoming ? "text-green-600 font-medium" : "text-muted-foreground"}>
                          <div className="flex items-center">
                            {isIncoming ? (
                              <ArrowDownLeft className="mr-1 h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowUpRight className="mr-1 h-3 w-3 text-muted-foreground" />
                            )}
                            {isIncoming ? "+" : "-"}
                            {amount} SOL
                          </div>
                        </TableCell>
                        <TableCell>
                          {tx.timestamp
                            ? formatDistanceToNow(new Date(tx.timestamp * 1000), { addSuffix: true })
                            : "Unknown"}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs">
                          <a
                            href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-end hover:underline"
                          >
                            {tx.signature.slice(0, 8)}...{tx.signature.slice(-4)}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleViewExplorer}>
                View All Transactions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tokens</CardTitle>
              <CardDescription>Music royalty tokens and other SPL tokens in your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Royalty %</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      token: "SARAH",
                      balance: "1,000",
                      artist: "Sarah Johnson",
                      royaltyPercentage: "0.05%",
                      value: "50 SOL",
                    },
                    {
                      token: "RESON",
                      balance: "750",
                      artist: "The Resonants",
                      royaltyPercentage: "0.03%",
                      value: "37.5 SOL",
                    },
                    {
                      token: "MLEE",
                      balance: "1,500",
                      artist: "Marcus Lee",
                      royaltyPercentage: "0.08%",
                      value: "75 SOL",
                    },
                  ].map((token, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{token.token}</TableCell>
                      <TableCell>{token.balance}</TableCell>
                      <TableCell>{token.artist}</TableCell>
                      <TableCell>{token.royaltyPercentage}</TableCell>
                      <TableCell className="text-right">{token.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send SOL or Tokens</CardTitle>
              <CardDescription>Transfer SOL or music royalty tokens to another wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <select
                    id="token"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="SOL">SOL</option>
                    <option value="SARAH">SARAH - Sarah Johnson</option>
                    <option value="RESON">RESON - The Resonants</option>
                    <option value="MLEE">MLEE - Marcus Lee</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter Solana wallet address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[100px]"
                      onClick={handleSetMaxAmount}
                      disabled={balance === null}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSendTransaction}
                disabled={isSending || !recipientAddress || !sendAmount}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSending ? "Sending..." : "Send Transaction"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
