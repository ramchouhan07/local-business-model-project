"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"





const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToastNotification() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToastNotification must be used within a ToastProvider")
  }
  return context
}

const icons = {
  success
  error
  info
  warning
}

const colors = {
  success: "bg-green-500",
  error: "bg-destructive",
  info: "bg-primary",
  warning: "bg-accent",
}

export function ToastProvider({ children }: { children }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (type, message?) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, title, message }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type]
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                className="bg-card border border-border rounded-xl shadow-lg p-4 min-w-[300px] max-w-[400px] flex items-start gap-3"
              >
                <div className={`${colors[toast.type]} rounded-full p-1`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{toast.title}</p>
                  {toast.message && (
                    <p className="text-sm text-muted-foreground mt-1">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
