"use client"

import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>We're here to help</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4">Contact <span className="text-primary italic">Us</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question about our craftsmanship or need help with an order? Reach out and we'll get back to you shortly.
            </p>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div variants={fadeIn} className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our dedicated support team, led by <span className="text-foreground font-bold italic">Tarun Hemarj Chaudhari</span>, is available Monday to Saturday, 10:00 AM to 7:00 PM IST.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "tarunchaudhari1313@gmail.com",
                    link: "mailto:tarunchaudhari1313@gmail.com",
                    sub: "For general inquiries and support"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+91 9518391245",
                    link: "tel:+919518391245",
                    sub: "Direct line for immediate assistance"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Our Studio",
                    content: "Mumbai, Maharashtra, India",
                    sub: "ESTATE Artisanal Hub"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-4xl border bg-muted/30 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20"
                  >
                    <div className="flex items-start gap-6 relative z-10">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-xl">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.sub}</p>
                        {item.link ? (
                          <a href={item.link} className="text-lg font-medium hover:text-primary transition-colors block mt-2">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-lg font-medium block mt-2">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-muted/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-neutral-200 dark:border-neutral-800 relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                      <Input placeholder="Tarun" className="h-14 rounded-2xl bg-background border-none shadow-none ring-1 ring-neutral-200 dark:ring-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                      <Input placeholder="Chaudhari" className="h-14 rounded-2xl bg-background border-none shadow-none ring-1 ring-neutral-200 dark:ring-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <Input type="email" placeholder="you@example.com" className="h-14 rounded-2xl bg-background border-none shadow-none ring-1 ring-neutral-200 dark:ring-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                    <Textarea placeholder="How can we help you?" className="min-h-[180px] rounded-2xl bg-background border-none shadow-none ring-1 ring-neutral-200 dark:ring-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/20 resize-none" />
                  </div>
                  <Button className="w-full gap-2 h-16 rounded-2xl text-lg font-bold group">
                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
