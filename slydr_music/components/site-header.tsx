import { Disc3 } from "lucide-react"

import { WalletMultiButton } from "@/components/wallet/wallet-multi-button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <Disc3 className="h-6 w-6 text-purple-500" />
            <span className="inline-block font-bold">Slydr.Music</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a
              href="/explore"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore
            </a>
            <a
              href="/dashboard"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <WalletMultiButton />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
