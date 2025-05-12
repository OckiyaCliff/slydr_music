"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { WalletNotConnected } from "@/components/wallet/wallet-not-connected"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { connected } = useWallet()
  const router = useRouter()

  // Check if user has set a user type in localStorage
  useEffect(() => {
    if (connected) {
      const userType = localStorage.getItem("userType")

      if (userType === "artist") {
        router.push("/dashboard/artist")
      } else if (userType === "investor") {
        router.push("/dashboard/fan")
      }
      // If no user type is set, we'll show the default dashboard with a prompt to set user type
    }
  }, [connected, router])

  if (!connected) {
    return <WalletNotConnected />
  }

  const handleSetupProfile = () => {
    router.push("/dashboard/profile")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to Slydr.Music. Please set up your profile to get started.">
        <Button onClick={handleSetupProfile}>Set Up Profile</Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <RecentActivity className="col-span-4" />

        <div className="col-span-3 space-y-4">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-3">Complete Your Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up your profile to access all features of the platform. Choose whether you're an artist looking to
              tokenize your music or an investor looking to back artists.
            </p>
            <Button onClick={handleSetupProfile} className="w-full">
              Set Up Profile Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
