"use client"

import { motion } from "framer-motion"
import { Search, MapPin, ShieldCheck, Percent } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Advanced search algorithms help you find exactly what you need from local retailers in seconds.",
    gradient: "from-primary to-indigo-600",
  },
  {
    icon: MapPin,
    title: "Nearby Retailers",
    description: "Discover shops and services in your neighborhood with real-time location-based recommendations.",
    gradient: "from-secondary to-cyan-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reviews",
    description: "Make informed decisions with authentic reviews and ratings from real customers.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Percent,
    title: "Best Discounts",
    description: "Access exclusive deals, offers, and discounts from your favorite local retailers.",
    gradient: "from-accent to-orange-600",
  },
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Why SMARTBUY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">SMARTBUY</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are revolutionizing local shopping by connecting customers with nearby retailers through smart technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border h-full">
                {/* Gradient glow on hover */}
                <div className={`absolute -inset-0.5 bg-linear-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
