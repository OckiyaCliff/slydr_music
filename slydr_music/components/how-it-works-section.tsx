export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Decentralized Music Investment</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform uses blockchain technology to create a transparent and efficient marketplace for music
              royalties.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4 lg:gap-12">
          <div className="relative flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
              1
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Link your Solana wallet to access the Slydr.Music dapp and its features.
              </p>
            </div>
            <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-purple-200 lg:block dark:bg-purple-800/30"></div>
          </div>
          <div className="relative flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
              2
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Browse Artists</h3>
              <p className="text-muted-foreground">
                Discover artists offering tokenized royalties and review their streaming potential.
              </p>
            </div>
            <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-purple-200 lg:block dark:bg-purple-800/30"></div>
          </div>
          <div className="relative flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
              3
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Purchase Tokens</h3>
              <p className="text-muted-foreground">
                Buy royalty tokens using SOL through our secure smart contract system.
              </p>
            </div>
            <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-purple-200 lg:block dark:bg-purple-800/30"></div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
              4
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Earn Royalties</h3>
              <p className="text-muted-foreground">
                Receive automatic royalty payments to your wallet as streaming revenue is generated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
