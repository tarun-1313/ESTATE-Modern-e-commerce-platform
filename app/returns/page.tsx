"use client"

import { RefreshCcw, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react"
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

export default function ReturnsPage() {
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
            <h1 className="text-5xl font-black tracking-tight mb-4">Returns & <span className="text-primary">Exchanges</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality means your satisfaction is our priority.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <RefreshCcw className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">7-Day Policy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We want you to love your ESTATE purchase. If you're not completely satisfied, you have a <strong>7-day window</strong> to initiate a return.
                </p>
                <div className="p-4 bg-background rounded-2xl border border-dashed text-sm">
                  <p className="font-medium text-foreground mb-1">Hassle-free Returns</p>
                  <p>Simply log in to your account and go to "My Orders" to start the process.</p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Conditions</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Items must be in original condition",
                  "All tags and labels must be attached",
                  "Original packaging must be intact",
                  "Jewellery & personal care (Non-returnable)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Refund Process</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Transparency is key. Once we receive your return, we inspect and process it swiftly.
                </p>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="font-bold text-foreground">Timeline</span>
                  <span className="text-primary font-black uppercase tracking-widest text-xs">3-5 Business Days</span>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="bg-muted/30 p-8 rounded-4xl border hover:border-primary/20 transition-colors space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Exchanges</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Need a different size or color? We'll arrange a reverse pickup and ship your exchange for free.
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 h-1 bg-primary/20 rounded-full" />
                  <div className="flex-1 h-1 bg-primary/20 rounded-full" />
                  <div className="flex-1 h-1 bg-primary/20 rounded-full" />
                </div>
                <p className="text-xs italic text-center">Contact support to initiate exchange.</p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
