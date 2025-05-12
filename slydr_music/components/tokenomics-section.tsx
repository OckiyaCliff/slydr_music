import Image from "next/image"

export function TokenomicsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-purple-950/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Tokenomics
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How Music Royalty Tokens Work</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Our platform uses Solana's SPL token standard to create and distribute music royalty tokens.
            </p>
            <ul className="grid gap-4">
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  1
                </div>
                <div>
                  <h3 className="font-bold">Token Creation</h3>
                  <p className="text-sm text-muted-foreground">
                    Artists mint royalty tokens representing a percentage of their future streaming revenue.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  2
                </div>
                <div>
                  <h3 className="font-bold">Initial Offering</h3>
                  <p className="text-sm text-muted-foreground">
                    Tokens are sold to investors at a fixed price during the initial funding round.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  3
                </div>
                <div>
                  <h3 className="font-bold">Revenue Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform aggregates streaming revenue data from major music platforms.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-800/30 dark:text-purple-400">
                  4
                </div>
                <div>
                  <h3 className="font-bold">Automated Distribution</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts automatically distribute royalties to token holders proportional to their ownership.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
                alt="Music royalty tokenomics"
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
