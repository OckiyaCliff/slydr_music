"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, BarChart, Activity } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWalletBalance } from "@/hooks/use-wallet-balance"
import { useWalletTransactions } from "@/hooks/use-wallet-transactions"
import { Skeleton } from "@/components/ui/skeleton"

export function Overview() {
  const { connected } = useWallet()
  const { balance, isLoading: isLoadingBalance } = useWalletBalance()
  const { transactions, isLoading: isLoadingTransactions } = useWalletTransactions(5)
  const [portfolioValue, setPortfolioValue] = useState<number | null>(null)
  const [royaltyEarnings, setRoyaltyEarnings] = useState<number | null>(null)
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true)

  useEffect(() => {
    if (connected) {
      // Simulate loading portfolio data
      const timer = setTimeout(() => {
        setPortfolioValue(187.5)
        setRoyaltyEarnings(12.75)
        setIsLoadingPortfolio(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [connected])

  // Calculate portfolio change
  const portfolioChange = 8.2 // Percentage
  const isPositiveChange = portfolioChange > 0

  return (
    // Fixed grid layout with proper spacing for all screen sizes
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SOL Balance</CardTitle>
          <Wallet className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          {isLoadingBalance || !connected ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div className="text-2xl font-bold">{balance !== null ? `${balance.toFixed(4)} SOL` : "N/A"}</div>
          )}
          {isLoadingBalance || !connected ? (
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-4 w-[80px] mt-1" />
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              {`≈ $${balance !== null ? (balance * 20).toFixed(2) : "0.00"} USD`}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          {isLoadingPortfolio || !connected ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div className="text-2xl font-bold">
              {portfolioValue !== null ? `${portfolioValue.toFixed(2)} SOL` : "N/A"}
            </div>
          )}
          {isLoadingPortfolio || !connected ? (
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-4 w-[80px] mt-1" />
            </div>
          ) : (
            <div className="text-xs text-muted-foreground flex items-center">
              {isPositiveChange ? (
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={isPositiveChange ? "text-green-500" : "text-red-500"}>
                {isPositiveChange ? "+" : ""}
                {portfolioChange}%
              </span>
              <span className="ml-1">this week</span>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Royalty Earnings</CardTitle>
          <BarChart className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          {isLoadingPortfolio || !connected ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div className="text-2xl font-bold">
              {royaltyEarnings !== null ? `${royaltyEarnings.toFixed(2)} SOL` : "N/A"}
            </div>
          )}
          {isLoadingPortfolio || !connected ? (
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-4 w-[80px] mt-1" />
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              {`≈ $${royaltyEarnings !== null ? (royaltyEarnings * 20).toFixed(2) : "0.00"} USD`}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <Activity className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          {isLoadingTransactions || !connected ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div className="text-2xl font-bold">{transactions.length}</div>
          )}
          {isLoadingTransactions || !connected ? (
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-4 w-[80px] mt-1" />
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              {`${transactions.length} transactions in the last 7 days`}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
