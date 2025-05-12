"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface DashboardNavProps {
  items: {
    href: string
    title: string
    icon: LucideIcon
  }[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-purple-100 text-purple-900 hover:bg-purple-200 hover:text-purple-900 dark:bg-purple-900/20 dark:text-purple-100 dark:hover:bg-purple-900/30"
                : "hover:bg-purple-50 hover:text-purple-900 dark:hover:bg-purple-900/10 dark:hover:text-purple-100",
              "justify-start transition-all duration-150 ease-in-out",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
