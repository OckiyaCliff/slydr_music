"use client"

import { type FC, type ReactNode, useMemo, useEffect, useCallback } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { Connection } from "@solana/web3.js"

import { HELIUS_RPC_URL } from "@/lib/helius"

// Import the styles for the wallet adapter
import "@solana/wallet-adapter-react-ui/styles.css"

// Wallet tracker component to update wishlist count
const WalletTracker: FC = () => {
  const { connected, publicKey } = useWallet()

  const updateWishlist = useCallback(async () => {
    if (connected && publicKey) {
      try {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: publicKey.toString(),
          }),
        })
      } catch (error) {
        console.error("Failed to update wishlist:", error)
      }
    }
  }, [connected, publicKey])

  useEffect(() => {
    if (connected && publicKey) {
      updateWishlist()
    }
  }, [connected, publicKey, updateWishlist])

  return null
}

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet

  // Use Helius RPC URL
  const endpoint = useMemo(() => HELIUS_RPC_URL, [])

  // Create a custom connection with higher commitment level for better reliability
  const connection = useMemo(() => new Connection(endpoint, "confirmed"), [endpoint])

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading
  // Only include officially supported wallets
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [network])

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: "confirmed" }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
          <WalletTracker />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
