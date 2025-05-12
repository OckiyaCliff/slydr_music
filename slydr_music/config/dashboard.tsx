import { BarChart3, Home, Music, User, Wallet } from "lucide-react"

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Artist Dashboard",
      href: "/dashboard/artist",
      icon: Music,
    },
    {
      title: "Investor Dashboard",
      href: "/dashboard/fan",
      icon: BarChart3,
    },
    {
      title: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
}
