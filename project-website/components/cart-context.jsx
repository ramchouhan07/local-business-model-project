"use client"

import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const storedCart = window.localStorage.getItem("smartbuy_cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.warn("Failed to parse stored cart", error)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("smartbuy_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    const normalized = {
      id: product.id ?? product._id ?? product.title ?? product.name ?? `${product.retailerId ?? product.shopId ?? "unknown"}-${Math.random().toString(36).slice(2)}`,
      name: product.name || product.title || "Product",
      price: Number(product.price) || 0,
      image: product.image || product.photo || product.thumbnail || "",
      quantity: 1,
      retailerName: product.retailerName || product.shopName || product.retailer || "",
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === normalized.id)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return updated
      }
      return [...prev, normalized]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    const newQuantity = Math.max(1, Number(quantity) || 1)
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
