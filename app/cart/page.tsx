"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { getCart, removeFromCart, updateCartItemQuantity, getCartTotal, type CartItem } from "@/lib/cart"
import Image from "next/image"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCartItems(getCart())
    setLoading(false)

    const handleCartUpdate = () => {
      setCartItems(getCart())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  const subtotal = getCartTotal()
  const shipping = subtotal > 5000 ? 0 : 150
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading your cart...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold tracking-tight">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl font-semibold">Your cart is empty.</p>
                <p className="text-muted-foreground">Add some premium pieces to get started.</p>
              </div>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                const images = item.imageUrl ? item.imageUrl.split('|') : []
                const firstImage = images[0]
                const safeImageUrl =
                  firstImage && (firstImage.startsWith("/") || firstImage.startsWith("http"))
                    ? firstImage
                    : `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name)}`
                return (
                  <Card key={item.id} className="overflow-hidden border-none bg-muted/30 shadow-none rounded-2xl">
                    <CardContent className="flex items-center gap-6 p-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-background">
                        <Image src={safeImageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <Card className="rounded-3xl border-none bg-neutral-100 dark:bg-neutral-900/50 p-8">
            <h2 className="mb-8 text-2xl font-bold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-muted-foreground">Free shipping on orders above ₹5,000</p>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-8 w-full h-14 gap-2 rounded-2xl text-base font-bold"
              asChild
              disabled={cartItems.length === 0}
            >
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Tax calculated at checkout. Secure checkout powered by Stripe.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
