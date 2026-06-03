"use client"

import { motion } from "framer-motion"
import { MapPin, Cpu, Database, Sparkles } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Location-Based Services",
    description: "Get personalized recommendations based on your real-time location and preferences.",
  },
  {
    icon: Cpu,
    title: "Digital Retail Ecosystem",
    description: "Connect with a network of digitally-enabled retailers for a seamless shopping experience.",
  },
  {
    icon: Database,
    title: "Open City Data",
    description: "Leverage open data initiatives to provide you with accurate and up-to-date information.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "AI-powered suggestions tailored to your shopping habits and interests.",
  },
]

export function SmartCity() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
              Smart City Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building the{" "}
              <span className="gradient-text">Future of Retail</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              SMARTBUY is at the forefront of smart city initiatives, leveraging cutting-edge technology to create a seamless bridge between digital convenience and local retail experiences.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Central element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: "linear" }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-primary/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: "linear" }}
                className="absolute inset-16 rounded-full border-2 border-dashed border-secondary/30"
              />

              {/* Center card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: "easeInOut" }}
                  className="w-48 h-48 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-lg">Smart City</p>
                  <p className="text-sm text-muted-foreground">Connected Retail</p>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: "easeInOut" }}
                className="absolute top-8 right-8 w-20 h-20 glass rounded-2xl flex items-center justify-center shadow-xl"
              >
                <MapPin className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
                transition={{ duration: 4, repeat: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 w-20 h-20 glass rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Database className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: "easeInOut", delay: 2 }}
                className="absolute top-1/4 left-4 w-16 h-16 glass rounded-xl flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-accent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: "easeInOut", delay: 0.5 }}
                className="absolute bottom-1/4 right-4 w-16 h-16 glass rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-bold gradient-text">AI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
