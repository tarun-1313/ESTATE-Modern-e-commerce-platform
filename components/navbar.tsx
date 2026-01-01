"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, TrendingUp, Zap, Award, Radio, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCartCount } from "@/lib/cart"

export function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Sync search input with URL if on shop page
    const q = searchParams.get("q")
    if (q) setSearchQuery(q)
  }, [searchParams])

  useEffect(() => {
    // Initial cart count
    setCartCount(getCartCount())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(getCartCount())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            ESTATE
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/products" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Products
            </Link>
            <Link href="/live" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              Live
              <Badge variant="destructive" className="h-4 text-[10px] px-1">
                NEW
              </Badge>
            </Link>
            <Link href="/trending" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Trending
            </Link>
            <Link href="/deals" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-yellow-500" />
              Flash Deals
            </Link>
            <Link href="/rewards" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              Rewards
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
          <div className="relative hidden w-full max-w-sm lg:flex">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-9 bg-muted/50 border-none rounded-full focus-visible:ring-1 focus-visible:ring-primary w-full"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative rounded-full">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

</header>
  )
}
