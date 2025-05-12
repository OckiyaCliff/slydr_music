import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@/components/wallet/wallet-multi-button"

export function InvestorsSection() {
  return (
    <section id="investors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="hidden lg:flex lg:justify-start">
          <Image
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Investor using app"
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
            For Investors
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">A New Asset Class in Music</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Diversify your crypto portfolio with music royalty tokens. Support artists you love and earn returns as they
            succeed.
          </p>
          <ul className="grid gap-2">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Invest in music royalties using SOL</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Receive royalties from major streaming platforms</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Trade royalty tokens on secondary markets</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Transparent performance tracking on-chain</span>
            </li>
          </ul>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <WalletMultiButton className="bg-purple-600 hover:bg-purple-700" />
            <Button variant="outline">View Artists</Button>
          </div>
        </div>
        <div className="flex justify-center lg:hidden">
          <Image
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Investor using app"
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
