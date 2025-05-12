import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArtistsSection() {
  return (
    <section id="artists" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-purple-950/10">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
            For Artists
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tokenize Your Music Career</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Retain creative control while raising funds through tokenized royalties. Connect directly with fans who
            believe in your music.
          </p>
          <ul className="grid gap-2">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Tokenize a portion of your streaming revenue</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Raise capital without label constraints</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Automated royalty distribution via smart contracts</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-purple-500" />
              <span>Build a community of invested supporters</span>
            </li>
          </ul>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="bg-purple-600 hover:bg-purple-700">Apply as an Artist</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Artist in studio"
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
