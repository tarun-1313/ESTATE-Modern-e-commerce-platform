import { createClient as createServerClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import { Package, Truck, CheckCircle2, MapPin, Clock, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const { order_id: orderId } = await searchParams

  if (!orderId) {
    redirect("/dashboard")
  }

  const supabase = await createServerClient()
  
  // Fetch order details
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price_at_purchase,
        products (
          id,
          name,
          image_url
        )
      )
    `)
    .eq("id", orderId)
    .single()

  if (orderError || !order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  const steps = [
    { label: "Ordered", status: "completed", date: new Date(order.created_at).toLocaleDateString() },
    { label: "Shipped", status: order.delivery_status === "shipped" || order.delivery_status === "out_for_delivery" || order.delivery_status === "delivered" ? "completed" : "pending" },
    { label: "Out for Delivery", status: order.delivery_status === "out_for_delivery" || order.delivery_status === "delivered" ? "completed" : "pending" },
    { label: "Delivered", status: order.delivery_status === "delivered" ? "completed" : "pending", date: order.delivery_status === "delivered" ? "Today" : null },
  ]

  const estimatedDate = order.estimated_delivery_date
    ? new Date(order.estimated_delivery_date).toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "TBD"

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950/50 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Track Order</h1>
              <p className="text-muted-foreground font-mono text-sm uppercase">Order #{orderId.slice(0, 8)}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium bg-white dark:bg-neutral-900 px-4 py-2 rounded-xl border shadow-sm">
              <span className="text-muted-foreground">Placed on:</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Tracker */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white dark:bg-neutral-900">
              <CardContent className="pt-8 pb-10">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-800 z-0" />
                  <div 
                    className="absolute top-5 left-0 h-1 bg-primary transition-all duration-1000 z-0"
                    style={{ 
                      width: `${
                        order.delivery_status === "delivered" ? "100" : 
                        order.delivery_status === "out_for_delivery" ? "66" : 
                        order.delivery_status === "shipped" ? "33" : "0"
                      }%` 
                    }} 
                  />

                  {/* Steps */}
                  <div className="flex justify-between relative z-10">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div 
                          className={`h-10 w-10 rounded-full flex items-center justify-center border-4 ${
                            step.status === "completed" 
                              ? "bg-primary border-primary text-white" 
                              : "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-400"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-bold">{idx + 1}</span>
                          )}
                        </div>
                        <div className="text-center">
                          <p className={`text-xs font-bold uppercase tracking-wider ${
                            step.status === "completed" ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="bg-primary/5 dark:bg-primary/10 px-8 py-4 flex items-center justify-between border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimated Delivery</p>
                    <p className="text-sm font-black">
                      {order.delivery_status === "delivered" 
                        ? "Delivered Successfully" 
                        : estimatedDate}
                    </p>
                  </div>
                </div>
                <Button variant="link" size="sm" className="text-primary font-bold h-auto p-0">
                  Manage Delivery
                </Button>
              </div>
            </Card>

            {/* Product Items */}
            <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-neutral-900">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Items ({order.order_items?.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-neutral-100">
                      <Image
                        src={item.products?.image_url?.split('|')[0] || "/placeholder.jpg"}
                        alt={item.products?.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {item.products?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="font-bold text-primary">{formatPrice(item.price_at_purchase)}</p>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold uppercase tracking-wider bg-transparent">
                          Buy Again
                        </Button>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-300 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 space-y-2">
                  <p className="font-bold">{order.user_id ? "John Doe" : "Guest User"}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {order.shipping_address}
                  </p>
                  <div className="pt-2 border-t mt-4">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Contact</p>
                    <p className="text-sm">+91 98765 43210</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-neutral-900 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(order.total_amount - 50)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                </div>
                <div className="pt-4 border-t flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-2xl font-black text-primary">{formatPrice(order.total_amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Paid via</p>
                    <p className="text-xs font-bold uppercase">{order.payment_method}</p>
                  </div>
                </div>
              </CardContent>
              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4">
                <Button className="w-full rounded-xl h-12 font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20">
                  Download Invoice
                </Button>
              </div>
            </Card>

            {/* Need Help */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <HelpCircle className="h-5 w-5 text-neutral-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm font-bold">Need help with your order?</p>
                <p className="text-xs text-muted-foreground">Contact our support team 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
