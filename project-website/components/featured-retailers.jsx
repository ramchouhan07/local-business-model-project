"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, BadgeCheck, X, Phone, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

const defaultRetailers = [
  {
    id: 1,
    name: "TechZone Electronics",
    category: "Electronics",
    location: "Downtown Mall, Sector 5",
    rating: 4.8,
    reviews: 234,
    discount: 20,
    verified: true,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    description: "Your one-stop destination for all electronics. We offer the latest gadgets, smartphones, laptops, and accessories at competitive prices.",
    phone: "+1 234 567 8900",
    hours: "9:00 AM - 9:00 PM",
    products: [
      { name: "Wireless Headphones", price: 129.99, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop" },
      { name: "USB-C Cable", price: 19.99, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop" },
      { name: "Phone Stand", price: 24.99, image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: 2,
    name: "Fresh Mart Grocery",
    category: "Grocery",
    location: "Green Avenue, Block A",
    rating: 4.6,
    reviews: 189,
    discount: 15,
    verified: true,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    description: "Fresh fruits, vegetables, and daily essentials delivered to your doorstep. Quality guaranteed with farm-fresh produce.",
    phone: "+1 234 567 8901",
    hours: "7:00 AM - 10:00 PM",
    products: [
      { name: "Organic Vegetables", price: 14.99, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop" },
      { name: "Fresh Fruits", price: 12.99, image: "https://images.unsplash.com/photo-1553546895-531931aa1aa8?w=200&h=200&fit=crop" },
      { name: "Milk & Dairy", price: 8.99, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: 3,
    name: "Style Studio Fashion",
    category: "Fashion",
    location: "Fashion Street, Plaza 3",
    rating: 4.9,
    reviews: 312,
    discount: 30,
    verified: true,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
    description: "Trendy fashion for all ages. Discover the latest styles in clothing, accessories, and footwear at unbeatable prices.",
    phone: "+1 234 567 8902",
    hours: "10:00 AM - 8:00 PM",
    products: [
      { name: "Summer Dress", price: 49.99, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop" },
      { name: "Denim Jeans", price: 59.99, image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=200&h=200&fit=crop" },
      { name: "Casual T-Shirt", price: 29.99, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: 4,
    name: "Mobile Hub",
    category: "Mobile Shop",
    location: "Tech Park, Building 7",
    rating: 4.7,
    reviews: 198,
    discount: 25,
    verified: true,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
    description: "Latest smartphones, tablets, and mobile accessories. Authorized dealer for all major brands with warranty support.",
    phone: "+1 234 567 8903",
    hours: "9:30 AM - 8:30 PM",
    products: [
      { name: "Smartphone", price: 799.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
      { name: "Tablet", price: 449.99, image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=200&h=200&fit=crop" },
      { name: "Phone Charger", price: 34.99, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: 5,
    name: "Home Comfort Furniture",
    category: "Furniture",
    location: "Industrial Area, Zone 2",
    rating: 4.5,
    reviews: 156,
    discount: 40,
    verified: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    description: "Premium furniture for your home and office. Custom designs available with free delivery and installation.",
    phone: "+1 234 567 8904",
    hours: "10:00 AM - 7:00 PM",
    products: [
      { name: "Office Chair", price: 199.99, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop" },
      { name: "Sofa Set", price: 599.99, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop" },
      { name: "Dining Table", price: 349.99, image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&h=200&fit=crop" },
    ],
  },
]

function RetailerCard({ retailer, onClick }) {
  const productCount = Array.isArray(retailer.products)
    ? retailer.products.length
    : Array.isArray(retailer.products?.data)
    ? retailer.products.data.length
    : Array.isArray(retailer.shopProducts)
    ? retailer.shopProducts.length
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border"
    >
      {/* Gradient border on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      
      <div className="relative">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={retailer.image || retailer.shopImage}
            alt={retailer.name || retailer.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Discount badge */}
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
            {retailer.discount}% OFF
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-card-foreground flex items-center gap-2">
                {retailer.name || retailer.title}
                {retailer.verified && (
                  <BadgeCheck className="w-5 h-5 text-primary" />
                )}
              </h3>
              <span className="text-sm text-primary font-medium">{retailer.category}</span>
              <div className="text-sm text-muted-foreground mt-1">
                {productCount} product{productCount === 1 ? "" : "s"} available
              </div>
              <span className="text-sm text-primary font-medium">{retailer.description}</span>

            </div>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3 ">
            <MapPin className="w-4 h-4" />
            <span>{retailer.location || retailer.address}</span>
            {retailer.pincode && (
              <span className="ml-4 bg-red-300 rounded-full p-1">pincode {retailer.pincode}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-bold">{retailer.rating}</span>
              <span className="text-muted-foreground text-sm">({retailer.reviews})</span>
            </div>
            <Button
              onClick={onClick}
              size="sm"
              className="bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white rounded-lg"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RetailerModal({ retailer, onClose }) {
  const { addToCart } = useCart()
  const products = Array.isArray(retailer.products)
    ? retailer.products
    : Array.isArray(retailer.products?.data)
    ? retailer.products.data
    : retailer.shopProducts || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header image */}
        <div className="relative h-64">
          <img
            src={retailer.image || retailer.shopImage}
            alt={retailer.name || retailer.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium">
                {retailer.category}
              </span>
              <span className="px-3 py-1 bg-accent/90 text-accent-foreground rounded-full text-sm font-bold">
                {retailer.discount}% OFF
              </span>
              {retailer.verified && (
                <span className="px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-medium flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" /> Verified
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-card-foreground">{retailer.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{retailer.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{retailer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Hours</p>
                <p className="font-medium">{retailer.hours}</p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(retailer.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{retailer.rating}</span>
            <span className="text-muted-foreground">({retailer.reviews} reviews)</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{retailer.description}</p>
          </div>

          {/* Product gallery */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Product Showcase</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden border p-2 bg-surface"
                  >
                    <img
                      src={product.image || "https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"}
                      alt={product.name || product.title || `Product ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-3 space-y-2">
                      <h1 className="text-sm font-semibold text-card-foreground line-clamp-2">
                        {product.name || product.title || "Untitled Product"}
                      </h1>
                      <p className="text-lg font-bold text-primary">
                        ${product.price?.toFixed?.(2) ?? product.price ?? "0.00"}
                      </p>
                      <Button
                        onClick={() =>
                          addToCart({
                            ...product,
                            id: product.id ?? product._id ?? `${retailer.id}-${index}`,
                            retailerName: retailer.name,
                            retailerId: retailer.id,
                          })
                        }
                        className="w-full bg-linear-to-r from-primary to-secondary text-white py-2 text-sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-6 rounded-2xl border border-dashed border-muted text-center text-muted-foreground">
                  No products are currently available for this shop.
                </div>
              )}
            </div>
          </div>

          {/* Map placeholder */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="h-48 bg-muted rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Google Maps Integration</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-linear-to-r from-primary to-secondary text-white py-6 text-lg rounded-xl">
              Contact Store
            </Button>
            <Button variant="outline" className="flex-1 py-6 text-lg rounded-xl">
              Get Directions
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FeaturedRetailers() {
  const [selectedRetailer, setSelectedRetailer] = useState(null)
  const [retailers, setRetailers] = useState(defaultRetailers)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRetailers = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/shops"

      try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Failed to load retailers (${response.status})`)
        }

        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setRetailers(data)
          console.log("Fetched retailers:", data)
        }
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRetailers()
  }, [])

  return (
    <section id="retailers" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Featured Retailers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover <span className="gradient-text">Top Retailers</span> Near You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of verified local retailers offering the best products and services in your area.
          </p>
        </motion.div>

        {isLoading && (
          <div className="text-center text-sm text-muted-foreground mb-8">
            Loading retailers...
          </div>
        )}
        {error && (
          <div className="text-center text-sm text-destructive mb-8">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {retailers.map((retailer) => (
            <RetailerCard
              key={retailer.id}
              retailer={retailer}
              onClick={() => setSelectedRetailer(retailer)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg rounded-xl border-2"
          >
            View All Retailers
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRetailer && (
          <RetailerModal
            retailer={selectedRetailer}
            onClose={() => setSelectedRetailer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
