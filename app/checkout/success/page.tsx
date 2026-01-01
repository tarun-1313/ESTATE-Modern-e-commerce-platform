import { CheckCircle2, Package, ArrowRight, Truck, MapPin, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const { order_id: orderId } = await searchParams

  // <CHANGE> Fetch order details from database
  let orderDetails = null
  if (orderId) {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()
    orderDetails = data
  }

  // <CHANGE> Format estimated delivery date
  const estimatedDate = orderDetails?.estimated_delivery_date
    ? new Date(orderDetails.estimated_delivery_date).toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "5-7 business days"

  const isCOD = orderDetails?.payment_method === "cod"

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {isCOD ? "Order Confirmed!" : "Payment Successful!"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isCOD
                ? "Your COD order has been placed. Pay when you receive the package."
                : "Your order has been confirmed and will be processed shortly."}
            </p>
          </div>
        </div>

        {/* <CHANGE> Enhanced order details card with tracking info */}
        {orderDetails && (
          <div className="space-y-6">
            <Card className="border-none bg-muted/30 shadow-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-mono font-medium text-xs">{orderId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tracking Number</p>
                    <p className="font-mono font-medium">{orderDetails.tracking_number}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-medium uppercase">{orderDetails.payment_method}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Payment Status</p>
                    <p
                      className={`font-semibold ${
                        orderDetails.payment_status === "paid" ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {orderDetails.payment_status === "paid" ? "Paid" : "Pay on Delivery"}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-muted-foreground">Order Total</p>
                    <p className="font-bold text-xl">{formatPrice(orderDetails.total_amount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <CHANGE> Delivery timeline card */}
            <Card className="border-none bg-linear-to-br from-primary/5 to-primary/10 shadow-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Estimated Delivery</p>
                    <p className="text-muted-foreground">{estimatedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">Shipping Address</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {orderDetails.shipping_address}
                    </p>
                  </div>
                </div>
                {isCOD && (
                  <div className="flex items-start gap-4 p-4 bg-orange-100/50 dark:bg-orange-900/20 rounded-xl">
                    <Phone className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900 dark:text-orange-300">COD Instructions</p>
                      <p className="text-sm text-orange-800 dark:text-orange-400">
                        Please keep {formatPrice(orderDetails.total_amount)} ready for payment upon delivery. Our
                        delivery partner will call before arriving.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* <CHANGE> Order tracking steps */}
            <Card className="border-none bg-muted/30 shadow-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Order Confirmed", desc: "We've received your order" },
                    { step: "2", title: "Processing", desc: "Your order is being prepared" },
                    { step: "3", title: "Shipped", desc: "Order dispatched from our facility" },
                    { step: "4", title: "Out for Delivery", desc: "On the way to your location" },
                    {
                      step: "5",
                      title: isCOD ? "Delivered & Payment" : "Delivered",
                      desc: isCOD ? "Receive package and make payment" : "Package delivered successfully",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild size="lg" className="rounded-xl">
            <Link href={`/track-order?order_id=${orderId}`}>
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl bg-transparent">
            <Link href="/shop">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
