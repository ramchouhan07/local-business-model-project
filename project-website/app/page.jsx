"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SearchFilter } from "@/components/search-filter"
import { FeaturedRetailers } from "@/components/featured-retailers.jsx"
import { Categories } from "@/components/categories"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Reviews } from "@/components/reviews"
import { SmartCity } from "@/components/smart-city"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchFilter />
      <FeaturedRetailers />
      <Categories />
      <WhyChooseUs />
      <Reviews />
      <SmartCity />
      <Footer />
    </main>
  )
}
