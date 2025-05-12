import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SolanaSection } from "@/components/solana-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ArtistsSection } from "@/components/artists-section"
import { InvestorsSection } from "@/components/investors-section"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <SolanaSection />
        <HowItWorksSection />
        <ArtistsSection />
        <InvestorsSection />
        <TokenomicsSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
