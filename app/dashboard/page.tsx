import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  User,
  CreditCard,
  Truck,
  Calendar,
  ExternalLink,
  ArrowRight,
  Leaf,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default async function UserDashboard() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: orders } = await supabase
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
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const latestOrder = orders?.[0]
  const latestItem = latestOrder?.order_items?.[0]?.products

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground">Manage your orders and account settings.</p>
          </div>
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Verified Member</p>
              <p className="text-sm font-bold">Priority Support</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none bg-primary/5 shadow-none rounded-2xl overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Sustainability Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase font-bold tracking-tight">Plastic Saved</span>
                  <span className="font-bold">2.4kg</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 w-[65%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase font-bold tracking-tight">Artisan Support</span>
                  <span className="font-bold">12 Days</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed italic">
                You've helped preserve traditional craftsmanship in <span className="text-foreground font-bold">3 different regions</span> of India.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/30 shadow-none rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestItem ? (
                <div className="flex items-center justify-between p-3 bg-background rounded-xl border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden relative">
                      <Image
                        src={latestItem.image_url?.split('|')[0] || "/placeholder.jpg"}
                        alt={latestItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold truncate max-w-[120px]">Latest Discovery</p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{latestItem.name}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-[10px] rounded-lg bg-transparent" asChild>
                    <Link href={`/track-order?order_id=${latestOrder.id}`}>View Order</Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-background rounded-xl border text-center">
                  <p className="text-xs text-muted-foreground italic">No recent orders to show</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none bg-muted/30 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(orders?.reduce((acc, order) => acc + Number(order.total_amount), 0) || 0)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-muted/30 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter((o) => ["pending", "shipped", "out_for_delivery"].includes(o.delivery_status)).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-muted/30 shadow-none rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">{user.email}</div>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Active & Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild className="rounded-xl">
              <Link href="/shop" className="gap-2">
                Shop More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {orders && orders.length > 0 ? (
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden border-none bg-muted/20 shadow-none rounded-3xl">
                  <div className="bg-primary/5 p-6 border-b border-primary/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-primary shadow-sm border">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          Placed on {new Date(order.created_at).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={order.delivery_status === "delivered" ? "default" : "secondary"}
                        className="rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {order.delivery_status || "Processing"}
                      </Badge>
                      <Button variant="outline" size="sm" asChild className="rounded-xl h-9 px-4 bg-background">
                        <Link href={`/track-order?order_id=${order.id}`}>
                          Track Order <ExternalLink className="h-3 w-3 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-4 divide-x divide-muted/50">
                      <div className="p-6 space-y-4 col-span-1">
                        <div className="flex items-center gap-3 text-sm">
                          <Package className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Items</span>
                        </div>
                        <div className="flex -space-x-3 overflow-hidden">
                          {order.order_items?.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="relative h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden shadow-sm">
                              <Image
                                src={item.products?.image_url?.split('|')[0] || "/placeholder.jpg"}
                                alt={item.products?.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.order_items?.length > 3 && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-bold text-primary shadow-sm">
                              +{order.order_items.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                          <Truck className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Tracking</span>
                        </div>
                        <p className="text-sm font-mono bg-background p-2 rounded-lg border text-center truncate">
                          {order.tracking_number || "Pending Assignment"}
                        </p>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Delivery</span>
                        </div>
                        <p className="text-sm">
                          {order.estimated_delivery_date
                            ? new Date(order.estimated_delivery_date).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Updating..."}
                        </p>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                          <CreditCard className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Payment</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold">{formatPrice(order.total_amount)}</span>
                          <Badge
                            variant="outline"
                            className={`rounded-full uppercase text-[8px] w-fit ${
                              order.payment_status === "paid"
                                ? "text-green-600 border-green-200 bg-green-50"
                                : "text-orange-600 border-orange-200 bg-orange-50"
                            }`}
                          >
                            {order.payment_status || "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-muted/5 p-20 text-center space-y-4">
              <Package className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
              <div className="space-y-1">
                <p className="text-xl font-bold">No orders found</p>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Start your collection of artisanal goods today.
                </p>
              </div>
              <Button asChild className="rounded-xl px-8">
                <Link href="/shop">Go to Shop</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
