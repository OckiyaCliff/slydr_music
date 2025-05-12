import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@/components/wallet/wallet-multi-button"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Join the Music Investment Revolution?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect your Solana wallet to start investing in the future of music.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <WalletMultiButton size="lg" className="bg-purple-600 hover:bg-purple-700" />
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
