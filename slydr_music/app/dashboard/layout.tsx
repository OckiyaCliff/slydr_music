import type React from "react"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { dashboardConfig } from "@/config/dashboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
