import type React from "react"
interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-4 border-b border-purple-100 dark:border-purple-900/20 pb-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide text-purple-950 dark:text-purple-100">{heading}</h1>
        {text && <p className="text-muted-foreground max-w-2xl">{text}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
