"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ConnectWalletButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function ConnectWalletButton({
  size = "default",
  variant = "default",
  className = "",
}: ConnectWalletButtonProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConnect = (walletType: string) => {
    // In a real implementation, this would connect to the actual Solana wallet
    console.log(`Connecting to ${walletType}...`)
    setIsConnected(true)
    setIsDialogOpen(false)
  }

  if (isConnected) {
    return (
      <Button size={size} variant="outline" className={className}>
        <Wallet className="mr-2 h-4 w-4" />
        0x7a...3f9b
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your Solana wallet to access Slydr.Music features.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => handleConnect("Phantom")} className="w-full justify-start">
            <img src="/phantom-icon.png" alt="Phantom" className="mr-2 h-5 w-5" />
            Phantom
          </Button>
          <Button onClick={() => handleConnect("Solflare")} className="w-full justify-start">
            <img src="/solflare-icon.png" alt="Solflare" className="mr-2 h-5 w-5" />
            Solflare
          </Button>
          <Button onClick={() => handleConnect("Backpack")} className="w-full justify-start">
            <img src="/backpack-icon.png" alt="Backpack" className="mr-2 h-5 w-5" />
            Backpack
          </Button>
          <Button onClick={() => handleConnect("Glow")} className="w-full justify-start">
            <img src="/glow-icon.png" alt="Glow" className="mr-2 h-5 w-5" />
            Glow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
