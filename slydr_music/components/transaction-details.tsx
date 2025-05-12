"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type HeliusTransaction, formatSolAmount } from "@/lib/helius"

interface TransactionDetailsProps {
  transaction: HeliusTransaction
  walletAddress: string
}

export function TransactionDetails({ transaction, walletAddress }: TransactionDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  const isIncoming = (address: string) => {
    // Check if this wallet is receiving funds
    for (const transfer of transaction.nativeTransfers) {
      if (transfer.toUserAccount.toLowerCase() === walletAddress.toLowerCase()) {
        return true
      }
    }
    return false
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Transaction information from the Solana blockchain</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Transaction Hash</h4>
              <div className="flex items-center space-x-2">
                <p className="font-mono text-sm break-all">{transaction.signature}</p>
                <a
                  href={`https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <p className="text-green-600 font-medium">Success</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
              <p>{transaction.timestamp ? formatDate(transaction.timestamp) : "Unknown"}</p>
              <p className="text-xs text-muted-foreground">
                {transaction.timestamp
                  ? formatDistanceToNow(new Date(transaction.timestamp * 1000), { addSuffix: true })
                  : ""}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Fee</h4>
              <p>{formatSolAmount(transaction.fee)} SOL</p>
            </div>
          </div>

          {transaction.nativeTransfers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">SOL Transfers</h4>
              <div className="space-y-2 mt-2">
                {transaction.nativeTransfers.map((transfer, index) => (
                  <div key={index} className="rounded-md border p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm">
                          From:{" "}
                          <span className="font-mono">
                            {transfer.fromUserAccount.slice(0, 6)}...{transfer.fromUserAccount.slice(-4)}
                          </span>
                        </p>
                        <p className="text-sm">
                          To:{" "}
                          <span className="font-mono">
                            {transfer.toUserAccount.slice(0, 6)}...{transfer.toUserAccount.slice(-4)}
                          </span>
                        </p>
                      </div>
                      <div
                        className={`text-right ${isIncoming(transfer.toUserAccount) ? "text-green-600" : "text-red-600"}`}
                      >
                        <p className="font-medium">{formatSolAmount(transfer.amount)} SOL</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show More Details
              </>
            )}
          </Button>

          {isExpanded && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Transaction Type</h4>
                <p>{transaction.type}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Fee Payer</h4>
                <p className="font-mono text-sm break-all">{transaction.feePayer}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Slot</h4>
                <p>{transaction.slot}</p>
              </div>

              {transaction.tokenTransfers.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Token Transfers</h4>
                  <div className="space-y-2 mt-2">
                    {transaction.tokenTransfers.map((transfer, index) => (
                      <div key={index} className="rounded-md border p-3">
                        <p className="text-sm">
                          From:{" "}
                          <span className="font-mono">
                            {transfer.fromUserAccount.slice(0, 6)}...{transfer.fromUserAccount.slice(-4)}
                          </span>
                        </p>
                        <p className="text-sm">
                          To:{" "}
                          <span className="font-mono">
                            {transfer.toUserAccount.slice(0, 6)}...{transfer.toUserAccount.slice(-4)}
                          </span>
                        </p>
                        <p className="text-sm">
                          Mint:{" "}
                          <span className="font-mono">
                            {transfer.mint.slice(0, 6)}...{transfer.mint.slice(-4)}
                          </span>
                        </p>
                        <p className="text-sm font-medium">Amount: {transfer.tokenAmount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {transaction.accountData.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Account Data</h4>
                  <div className="space-y-2 mt-2">
                    {transaction.accountData.map((data, index) => (
                      <div key={index} className="rounded-md border p-3">
                        <p className="text-sm">
                          Account:{" "}
                          <span className="font-mono">
                            {data.account.slice(0, 6)}...{data.account.slice(-4)}
                          </span>
                        </p>
                        <p className="text-sm">SOL Change: {formatSolAmount(data.nativeBalanceChange)} SOL</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
