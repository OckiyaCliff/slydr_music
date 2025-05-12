import Link from "next/link"
import { Disc3 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
        <div className="flex items-center space-x-2">
          <Disc3 className="h-6 w-6 text-purple-500" />
          <span className="font-bold">Slydr.Music</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Slydr.Music. All rights reserved. Built on Solana.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
