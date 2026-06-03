"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  LayoutDashboard,
  Package,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { name: "Products", href: "#", icon: Package },
  { name: "Reviews", href: "#", icon: Star },
  { name: "Analytics", href: "#", icon: TrendingUp },
  { name: "Settings", href: "#", icon: Settings },
]

const stats = [
  {
    name: "Total Products",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "from-primary to-indigo-600",
  },
  {
    name: "Total Reviews",
    value: "2,847",
    change: "+8%",
    trend: "up",
    icon: Star,
    color: "from-secondary to-cyan-600",
  },
  {
    name: "Average Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Eye,
    color: "from-accent to-orange-600",
  },
  {
    name: "Customer Visits",
    value: "12,543",
    change: "-3%",
    trend: "down",
    icon: Users,
    color: "from-green-500 to-emerald-600",
  },
]

const recentReviews = [
  {
    id: 1,
    customer: "Sarah J.",
    rating: 5,
    comment: "Excellent product quality and fast delivery!",
    product: "iPhone 15 Pro",
    date: "2 hours ago",
  },
  {
    id: 2,
    customer: "Michael C.",
    rating: 4,
    comment: "Good service, will buy again.",
    product: "Samsung Galaxy S24",
    date: "5 hours ago",
  },
  {
    id: 3,
    customer: "Emily D.",
    rating: 5,
    comment: "Best store in the area! Highly recommended.",
    product: "MacBook Air M3",
    date: "1 day ago",
  },
  {
    id: 4,
    customer: "David W.",
    rating: 4,
    comment: "Great prices and helpful staff.",
    product: "AirPods Pro",
    date: "2 days ago",
  },
]

const activeOffers = [
  { name: "Summer Sale", discount: "30%", products: 45, status: "Active" },
  { name: "New Arrivals", discount: "15%", products: 12, status: "Active" },
  { name: "Clearance", discount: "50%", products: 28, status: "Ending Soon" },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useState(() => {
    setMounted(true)
  })

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-card border-r border-border">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SMARTBUY</span>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    link.active
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SMARTBUY</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    link.active
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, TechZone Electronics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64 rounded-xl"
                />
              </div>

              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              )}

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* Profile */}
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                T
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Reviews</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Comment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReviews.map((review) => (
                      <tr key={review.id} className="border-b border-border last:border-0">
                        <td className="py-4 px-4">
                          <span className="font-medium">{review.customer}</span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{review.product}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground max-w-50 truncate">
                          {review.comment}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{review.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Active Offers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Active Offers</h2>
                <Button size="sm" className="bg-linear-to-r from-primary to-secondary text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  New Offer
                </Button>
              </div>

              <div className="space-y-4">
                {activeOffers.map((offer, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{offer.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        offer.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-accent/10 text-accent"
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{offer.products} products</span>
                      <span className="font-bold text-primary">{offer.discount} OFF</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-card rounded-2xl p-6 shadow-sm border border-border"
          >
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <Plus className="w-6 h-6" />
                <span>Add Product</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl hover:bg-secondary hover:text-white hover:border-secondary transition-all"
              >
                <Eye className="w-6 h-6" />
                <span>View Store</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl hover:bg-accent hover:text-white hover:border-accent transition-all"
              >
                <TrendingUp className="w-6 h-6" />
                <span>Analytics</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
              >
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
