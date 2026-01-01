"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock, ShieldCheck, Smartphone, QrCode, Building2, Truck, MapPin } from "lucide-react"
import { getCart, getCartTotal } from "@/lib/cart"
import { formatPrice } from "@/lib/utils"
import { simulatePayment } from "@/app/actions/checkout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { clearCart } from "@/lib/cart"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient as createBrowserClient } from "@/lib/supabase/client"

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [method, setMethod] = useState("upi")
  const [shippingAddress, setShippingAddress] = useState("")
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  })
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("Please login to proceed to checkout")
        router.push("/login?redirect=/checkout")
      }
    }
    checkUser()
    setCart(getCart())
    setTotal(getCartTotal())
  }, [router, supabase])

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // <CHANGE> Validate shipping details before payment
    if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address || !shippingDetails.city) {
      toast.error("Please fill in all shipping details")
      return
    }

    setLoading(true)

    try {
      // <CHANGE> Build complete shipping address string
      const fullAddress = `${shippingDetails.name}, ${shippingDetails.phone}\n${shippingDetails.address}\n${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`

      const result = await simulatePayment({
        amount: total,
        paymentMethod: method,
        items: cart,
        shippingAddress: fullAddress,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success("Order placed successfully!")
      clearCart()
      router.push(`/checkout/success?order_id=${result.orderId}`)
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Failed to process payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

          {/* <CHANGE> Added shipping address form */}
          <Card className="border-none bg-muted/30 shadow-none rounded-3xl overflow-hidden">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Delivery Address</CardTitle>
              </div>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={shippingDetails.name}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                  className="h-11 rounded-xl"
                />
                <Input
                  placeholder="Phone Number"
                  value={shippingDetails.phone}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                  className="h-11 rounded-xl"
                />
              </div>
              <Textarea
                placeholder="Complete Address (House No, Street, Landmark)"
                value={shippingDetails.address}
                onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                className="min-h-20 rounded-xl"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                  className="h-11 rounded-xl"
                />
                <Input
                  placeholder="State"
                  value={shippingDetails.state}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                  className="h-11 rounded-xl"
                />
                <Input
                  placeholder="Pincode"
                  value={shippingDetails.pincode}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                  className="h-11 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/30 shadow-none rounded-3xl overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>Choose your preferred way to pay</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {/* <CHANGE> Added COD as 5th payment option */}
              <Tabs defaultValue="upi" onValueChange={setMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6 h-11 bg-muted/50 rounded-xl p-1">
                  <TabsTrigger value="upi" className="rounded-lg text-xs">
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="card" className="rounded-lg text-xs">
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="netbanking" className="rounded-lg text-xs">
                    Bank
                  </TabsTrigger>
                  <TabsTrigger value="offers" className="rounded-lg text-xs">
                    Offers
                  </TabsTrigger>
                  <TabsTrigger value="cod" className="rounded-lg text-xs">
                    COD
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upi" className="space-y-4">
                  <div className="p-6 border rounded-2xl bg-background space-y-4">
                    <div className="flex items-center gap-4">
                      <Smartphone className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Pay using any UPI app like GPay, PhonePe, or BHIM
                        </p>
                      </div>
                    </div>
                    <Input 
                      placeholder="Enter your VPA (e.g., user@okaxis)" 
                      className="h-12 rounded-xl" 
                      defaultValue=""
                    />
                  </div>
                </TabsContent>

                <TabsContent value="card" className="space-y-4">
                  <div className="p-6 border rounded-2xl bg-background space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <p className="font-semibold">Credit/Debit Card</p>
                    </div>
                    <Input 
                      placeholder="Card Number" 
                      className="h-12 rounded-xl" 
                      defaultValue=""
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        placeholder="MM/YY" 
                        className="h-12 rounded-xl" 
                        defaultValue=""
                      />
                      <Input 
                        placeholder="CVV" 
                        className="h-12 rounded-xl" 
                        defaultValue=""
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="netbanking" className="space-y-4">
                  <RadioGroup defaultValue="hdfc" className="grid grid-cols-2 gap-4">
                    {["HDFC Bank", "SBI", "ICICI", "Axis Bank"].map((bank) => (
                      <div
                        key={bank}
                        className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-muted/30 transition-colors"
                      >
                        <RadioGroupItem value={bank.toLowerCase()} id={bank} />
                        <Label htmlFor={bank} className="flex items-center gap-2 font-medium">
                          <Building2 className="h-4 w-4" />
                          {bank}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>

                <TabsContent value="offers" className="space-y-4">
                  <div className="p-6 border border-dashed border-primary/40 rounded-2xl bg-primary/5">
                    <p className="font-semibold text-primary mb-2">Available Bank Offers</p>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• 10% instant discount on HDFC Credit Cards</li>
                      <li>• Flat ₹500 off on Axis Bank Net Banking</li>
                      <li>• No Cost EMI available on major banks</li>
                    </ul>
                  </div>
                </TabsContent>

                {/* <CHANGE> Added COD payment option */}
                <TabsContent value="cod" className="space-y-4">
                  <div className="p-6 border rounded-2xl bg-background space-y-4">
                    <div className="flex items-center gap-4">
                      <Truck className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay with cash when your order is delivered</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-4 space-y-2">
                      <p className="text-sm font-medium">COD Terms:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Available for orders below ₹50,000</li>
                        <li>Extra ₹50 handling charges may apply</li>
                        <li>Please keep exact change ready</li>
                        <li>Order verification may be required</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:pt-20">
          <Card className="border-none bg-muted/30 shadow-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary/5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="rounded-2xl bg-background p-6 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Items ({cart.length})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                {/* <CHANGE> Show COD charges if COD is selected */}
                {method === "cod" && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>COD Handling</span>
                    <span>₹50</span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(method === "cod" ? total + 50 : total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 border">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-center">UPI</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 border">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-center">Cards</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 border">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-center">COD</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your information is secure. We never share your personal details.</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                size="lg"
                onClick={handlePayment}
                disabled={loading || cart.length === 0}
                className="w-full h-14 gap-2 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
              >
                <ShieldCheck className="h-5 w-5" />
                {loading ? "Processing..." : method === "cod" ? "Place COD Order" : `Pay ${formatPrice(total)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
