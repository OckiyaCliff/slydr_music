import { Coins, Lock, BarChart3 } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Web3 Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Blockchain-Powered Music Investment
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Slydr.Music leverages Solana's high-speed, low-cost infrastructure to create a new asset class in music
              royalties.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-800/30">
              <Coins className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Tokenized Royalties</h3>
              <p className="text-muted-foreground">
                Artists tokenize a portion of their streaming income, creating a new asset class that fans can invest in
                and trade.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-800/30">
              <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Smart Contracts</h3>
              <p className="text-muted-foreground">
                Transparent and automated revenue distribution through secure Solana smart contracts with no
                intermediaries.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-800/30">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Track streaming revenue, royalty distributions, and investment performance in real-time on the
                blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
