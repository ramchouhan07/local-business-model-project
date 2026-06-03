"use client"

import { motion } from "framer-motion"



const sizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
}

export function LoadingSpinner({ size = "md", className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizes[size]} rounded-full border-4 border-muted border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: "linear" }}
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-muted"
            style={{ borderTopColor: "var(--primary)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-muted"
            style={{ borderBottomColor: "var(--secondary)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: "linear" }}
          />
        </div>
        <p className="text-muted-foreground font-medium">Loading...</p>
      </motion.div>
    </div>
  )
}

export function SkeletonLoader({ className = "" }: { className? }) {
  return (
    <motion.div
      className={`bg-muted rounded-lg ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: "easeInOut" }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <SkeletonLoader className="w-full h-48 mb-4" />
      <SkeletonLoader className="w-3/4 h-6 mb-2" />
      <SkeletonLoader className="w-1/2 h-4 mb-4" />
      <div className="flex gap-2">
        <SkeletonLoader className="w-20 h-8" />
        <SkeletonLoader className="w-20 h-8" />
      </div>
    </div>
  )
}
