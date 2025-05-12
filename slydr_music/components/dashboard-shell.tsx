import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6 p-6 md:p-8 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900 min-h-screen">
      <div className="flex flex-col space-y-6">{children}</div>
    </div>
  )
}
