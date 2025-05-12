"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

type UserType = "artist" | "fan" | null

export function useUserType() {
  const { publicKey, connected } = useWallet()
  const [userType, setUserType] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!connected || !publicKey) {
      setUserType(null)
      setIsLoading(false)
      return
    }

    // In a real implementation, this would query the blockchain or a database
    // to determine if the connected wallet belongs to an artist or a fan
    const checkUserType = async () => {
      setIsLoading(true)
      try {
        // Simulate API call to check user type
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, we'll randomly assign a user type
        // In a real app, this would be determined by checking if the wallet
        // has registered as an artist or has only made investments
        const randomType = Math.random() > 0.5 ? "artist" : "fan"
        setUserType(randomType)
      } catch (error) {
        console.error("Error determining user type:", error)
        setUserType(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserType()
  }, [connected, publicKey])

  return { userType, isLoading }
}
