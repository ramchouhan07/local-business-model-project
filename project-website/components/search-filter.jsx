"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, SlidersHorizontal, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  "All Categories",
  "Electronics",
  "Grocery",
  "Fashion",
  "Furniture",
  "Pharmacy",
  "Mobile Accessories",
  "Home Appliances",
]

const locations = [
  "All Locations",
  "Downtown",
  "Uptown",
  "Suburbs",
  "City Center",
  "Industrial Area",
]

export function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceComparison, setPriceComparison] = useState(false)

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex flex-col gap-6">
            {/* Main Search Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search retailers, products, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-border focus:border-primary bg-background/50"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-full px-4 py-4 rounded-xl border-2 border-border bg-background/50 text-foreground appearance-none cursor-pointer focus:border-primary focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="relative min-w-[180px]">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-full px-4 py-4 rounded-xl border-2 border-border bg-background/50 text-foreground appearance-none cursor-pointer focus:border-primary focus:outline-none"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                className="bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-6 rounded-xl text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Additional Options */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Nearby Retailers
              </Button>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    priceComparison ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setPriceComparison(!priceComparison)}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      priceComparison ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">Price Comparison</span>
              </label>

              <div className="flex-1" />

              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> retailers available
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
