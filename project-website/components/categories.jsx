"use client"

import { motion } from "framer-motion"
import { 
  Smartphone, 
  ShoppingCart, 
  Shirt, 
  Sofa, 
  Pill, 
  Headphones, 
  Home,
  Sparkles
} from "lucide-react"

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 150,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Grocery",
    icon: ShoppingCart,
    count: 89,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 124,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Furniture",
    icon: Sofa,
    count: 67,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Pharmacy",
    icon: Pill,
    count: 45,
    gradient: "from-red-500 to-pink-600",
  },
  {
    name: "Mobile Accessories",
    icon: Headphones,
    count: 98,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    name: "Home Appliances",
    icon: Home,
    count: 76,
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    name: "More Categories",
    icon: Sparkles,
    count: 200,
    gradient: "from-primary to-secondary",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Categories() {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you need from local retailers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon container */}
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg mb-1 text-card-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}+ Retailers
                  </p>
                </div>

                {/* Decorative element */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-linear-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
