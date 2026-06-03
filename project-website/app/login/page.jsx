"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [step, setStep] = useState("email")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  })

 

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const endpoint =
        step === "email"
          ? `${apiBase}/api/v1/user/loginuser`
          : `${apiBase}/api/v1/user/verifyuser`

      const payload =
        step === "email"
          ? { email: formData.email }
          : { email: formData.email, otp: formData.otp }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const text = await res.text()
      let data = {}

      try {
        data = text ? JSON.parse(text) : {}
      } catch (parseError) {
        data = { message: text }
      }

      console.log(`${step} response status:`, res.status, res.statusText)
      console.log(`${step} response body:`, data)

      if (res.ok) {
        if (step === "email") {
          setSuccessMessage(data.message || "OTP sent to your email.")
          setStep("verify")
        } else {
          setSuccessMessage(data.message || "Login successful!")
          router.push("/")
        }
      } else {
        setErrorMessage(data.message || `Server error: ${res.status}`)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage("Something went wrong. Check the console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/90 to-secondary relative overflow-hidden"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>

            <span className="text-3xl font-bold text-white">
              SMARTBUY
            </span>
          </div>

          {/* Illustration */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative w-full max-w-md mb-8"
          >
            <div className="glass rounded-3xl p-8 bg-white/10">
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded-full w-3/4" />
                <div className="h-4 bg-white/20 rounded-full w-1/2" />
                <div className="h-20 bg-white/20 rounded-xl" />

                <div className="flex gap-4">
                  <div className="h-12 bg-white/30 rounded-lg flex-1" />
                  <div className="h-12 bg-white/30 rounded-lg flex-1" />
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome Back!
          </h2>

          <p className="text-white/80 text-lg max-w-md">
            Sign in to access your account and continue your smart
            shopping journey with local retailers.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-white/10 backdrop-blur rounded-xl px-6 py-4 text-white"
            >
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-white/70">Retailers</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
              className="bg-white/10 backdrop-blur rounded-xl px-6 py-4 text-white"
            >
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-white/70">Users</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>

            <span className="text-2xl font-bold gradient-text">
              SMARTBUY
            </span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Sign In
            </h1>

            <p className="text-muted-foreground">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="rounded-2xl border border-success/30 bg-success/10 p-4 text-sm text-success">
                {successMessage}
              </div>
            )}
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                    <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 py-6 rounded-xl border-2 focus:border-primary"
                  required
                  disabled={step === "verify"}
                />
              </div>

              {step === "verify" && (
                <p className="text-sm text-muted-foreground">
                  Enter the OTP sent to your email to finish signing in.
                </p>
              )}
            </div>

            {/* OTP Step */}
            {step === "verify" && (
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium"
                >
                  OTP
                </label>

                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter the OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="pl-4 py-6 rounded-xl border-2 focus:border-primary"
                  required
                />
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white py-6 text-lg rounded-xl"
            >
              {isLoading
                ? step === "email"
                  ? "Sending..."
                  : "Verifying..."
                : step === "email"
                ? "Send OTP"
                : "Verify OTP"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />

            <span className="text-sm text-muted-foreground">
              Or continue with
            </span>

            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="py-6 rounded-xl"
            >
              Google
            </Button>

            <Button
              variant="outline"
              className="py-6 rounded-xl"
            >
              Facebook
            </Button>
          </div>

          {/* Signup */}
          <p className="text-center mt-8 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}