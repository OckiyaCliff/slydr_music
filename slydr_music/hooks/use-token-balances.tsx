"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { getTokenAccounts, getTokenMetadata, type TokenInfo } from "@/lib/token-utils"

export interface TokenWithMetadata extends TokenInfo {
  metadata?: {
    name: string
    symbol: string
    artist: string
    royaltyPercentage: number
    image: string
  }
  value?: number // Value in SOL
}

export function useTokenBalances() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [tokens, setTokens] = useState<TokenWithMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTokens = useCallback(async () => {
    if (!publicKey || !connected) {
      setTokens([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get token accounts
      const tokenAccounts = await getTokenAccounts(connection, publicKey.toString())

      // Fetch metadata for each token
      const tokensWithMetadata = await Promise.all(
        tokenAccounts.map(async (token) => {
          try {
            const metadata = await getTokenMetadata(connection, token.mint)

            // Calculate estimated value (in a real app, this would come from price feeds)
            const value = token.uiAmount * (Math.random() * 0.1 + 0.01) // Random value between 0.01 and 0.11 SOL per token

            return {
              ...token,
              metadata,
              value,
            }
          } catch (err) {
            console.error(`Error fetching metadata for token ${token.mint}:`, err)
            return token
          }
        }),
      )

      setTokens(tokensWithMetadata)
    } catch (err) {
      console.error("Error fetching tokens:", err)
      setError("Failed to fetch token balances. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [publicKey, connected, connection])

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  return {
    tokens,
    isLoading,
    error,
    refetch: fetchTokens,
  }
}
