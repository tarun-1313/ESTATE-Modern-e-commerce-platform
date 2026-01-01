"use client"

import { Truck, Clock, Globe, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <h1 className="text-5xl font-black tracking-tight mb-4">Shipping <span className="text-primary">Info</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent, reliable, and sustainable delivery for your artisanal essentials.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Delivery Timeline</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Every order is carefully packed and shipped from our regional hubs to ensure minimal transit time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-dashed">
                    <span className="font-medium text-foreground">Prepaid Orders</span>
                    <span className="text-primary font-bold">5 Days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-dashed">
                    <span className="font-medium text-foreground">COD Orders</span>
                    <span className="text-primary font-bold">7 Days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-dashed">
                    <span className="font-medium text-foreground">International</span>
                    <span className="text-primary font-bold">15 Days</span>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Processing Time</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Efficiency meets craftsmanship. We process orders with speed to get them to your doorstep faster.
                </p>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-sm italic">
                    "Orders placed before 2:00 PM IST are processed on the same business day."
                  </p>
                </div>
                <p className="text-sm">
                  Orders placed after 2:00 PM or on weekends/holidays will be processed the next business day.
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Shipping Rates</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-background rounded-2xl p-6 border shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">Free Shipping</p>
                      <p className="text-xs text-muted-foreground tracking-wide uppercase">On orders above ₹5,000</p>
                    </div>
                    <span className="text-2xl font-black text-primary">₹0</span>
                  </div>
                  <div className="h-px w-full bg-muted" />
                  <div className="flex justify-between items-center opacity-70">
                    <div>
                      <p className="font-bold">Standard Shipping</p>
                      <p className="text-xs text-muted-foreground tracking-wide uppercase">Orders below ₹5,000</p>
                    </div>
                    <span className="text-xl font-bold">₹150</span>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Order Tracking</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Stay updated at every step of the journey. We provide real-time tracking for peace of mind.
                </p>
                <div className="flex gap-2">
                  {["Order Confirmed", "Shipped", "Out for Delivery", "Delivered"].map((step, i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full bg-primary/20 overflow-hidden">
                      {i < 2 && <div className="h-full bg-primary w-full" />}
                    </div>
                  ))}
                </div>
                <p className="text-sm">
                  Once shipped, you'll receive a tracking ID via email and SMS to track your package directly.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
