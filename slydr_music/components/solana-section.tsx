import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function SolanaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-purple-950/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Solana Integration
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why We Built on Solana</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Solana's high-speed, low-cost infrastructure enables the real-time, scalable micro-transactions needed for
              our music royalty platform.
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-purple-500" />
                <span>Lightning-fast transactions with minimal fees</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-purple-500" />
                <span>Energy-efficient proof-of-stake consensus</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-purple-500" />
                <span>Scalable infrastructure for millions of users</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-purple-500" />
                <span>Robust ecosystem of wallets and tools</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
                alt="Solana blockchain integration"
                className="object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
