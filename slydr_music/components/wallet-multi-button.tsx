"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface WalletMultiButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function WalletMultiButton({ size = "default", variant = "default", className = "" }: WalletMultiButtonProps) {
  const { publicKey, wallet, disconnect, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const { toast } = useToast()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  // Reset copied state after 500ms
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      toast({
        title: "Address copied",
        description: "Your wallet address has been copied to clipboard",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  if (!connected) {
    return (
      <Button size={size} variant={variant} className={className} onClick={() => setVisible(true)}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Wallet className="mr-2 h-4 w-4" />
          {publicKey?.toString().slice(0, 4)}...
          {publicKey?.toString().slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
            <Wallet className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{wallet?.adapter.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {publicKey?.toString().slice(0, 6)}...
              {publicKey?.toString().slice(-6)}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress}>{copied ? "Copied!" : "Copy address"}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoToDashboard}>Dashboard</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
