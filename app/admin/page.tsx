import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, TrendingUp, DollarSign, Clock } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // In a real app, you'd check a "role" field on a profiles table
  if (!user || user.email !== "admin@estate.com") {
    // redirect("/")
  }

  const { data: stats } = await supabase.from("products").select("count")
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false })

  const codOrders = recentOrders?.filter((o) => o.payment_method === "cod") || []
  const pendingCollection = codOrders
    .filter((o) => o.payment_status === "pending")
    .reduce((acc, o) => acc + Number(o.total_amount), 0)

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground">Business overview and management.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="rounded-2xl border-none bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(124500)}</div>
              <p className="text-xs opacity-70">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-none bg-orange-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">COD Pending</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(pendingCollection)}</div>
              <p className="text-xs opacity-90">{codOrders.length} active COD orders</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-none bg-muted/30 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentOrders?.length || 0}</div>
              <p className="text-xs text-muted-foreground">+5% today</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-none bg-muted/30 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Ticket</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(8760)}</div>
              <p className="text-xs text-muted-foreground">Stable</p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Logistics Pipeline</h2>
            <Badge variant="outline" className="rounded-xl px-4 py-1">
              Real-time Updates
            </Badge>
          </div>
          <div className="rounded-2xl border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Logistics Status</TableHead>
                  <TableHead>Tracking #</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders?.map((order) => (
                  <TableRow key={order.id} className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>#{order.id.slice(0, 8)}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="w-fit text-[10px] uppercase">
                          {order.payment_method}
                        </Badge>
                        <span
                          className={`text-[10px] font-bold ${order.payment_status === "paid" ? "text-green-600" : "text-orange-600"}`}
                        >
                          {order.payment_status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm capitalize">{order.delivery_status || "Processing"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded tracking-tight">
                        {order.tracking_number || "TBA"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold">{formatPrice(order.total_amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  )
}
