import Image from "next/image"
import { ChevronRight, Play, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@/components/wallet/wallet-multi-button"

export function HeroSection() {
  // This would normally come from a database or API
  // For demo purposes, we'll use a static number that increases on page load
  const baseCount = 1250
  const randomIncrement = Math.floor(Math.random() * 20)
  const walletCount = baseCount + randomIncrement

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-purple-50 dark:to-purple-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm dark:border-purple-800/30 dark:bg-purple-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 h-3.5 w-3.5 text-purple-600"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
              <span className="text-purple-900 dark:text-purple-300">Powered by Solana</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Invest in Music Royalties on the Blockchain
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Slydr.Music is a decentralized platform that tokenizes music royalties, connecting artists with fans and
                investors through Solana smart contracts.
              </p>
            </div>

            {/* Wishlist Counter - Prominent and Visible */}
            <div className="mt-4 mb-6 flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {walletCount.toLocaleString()}
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Wallets connected to our platform</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <WalletMultiButton size="lg" className="bg-purple-600 hover:bg-purple-700" />
              <Button variant="outline" size="lg" href="/explore">
                Explore Artists
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-[350px] overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Artist performing"
                className="rounded-lg object-cover"
                fill
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Sarah Johnson</h3>
                    <p className="text-sm opacity-90">Indie Pop Artist</p>
                  </div>
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-sm">
                    <Play className="h-4 w-4 text-white" />
                    <span className="sr-only">Play</span>
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="opacity-90">Funding Goal</p>
                    <p className="text-lg font-bold">5,000 SOL</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="opacity-90">Funded</p>
                    <p className="text-lg font-bold">78%</p>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[78%] rounded-full bg-purple-500"></div>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
