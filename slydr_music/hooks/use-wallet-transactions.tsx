"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { getTransactionHistory, type HeliusTransaction } from "@/lib/helius"

export function useWalletTransactions(limit = 10) {
  const { publicKey, connected } = useWallet()
  const [transactions, setTransactions] = useState<HeliusTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    if (!publicKey || !connected) {
      setTransactions([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const txHistory = await getTransactionHistory(publicKey.toString(), limit)
      setTransactions(txHistory)
    } catch (err) {
      console.error("Error fetching transactions:", err)
      setError("Failed to fetch transaction history. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [publicKey, connected, limit])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
  }
}
