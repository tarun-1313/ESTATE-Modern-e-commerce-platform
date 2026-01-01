"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, ShieldCheck, Truck, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

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

export default function FAQPage() {
  const faqs = [
    {
      category: "Shipping & Delivery",
      icon: <Truck className="h-6 w-6" />,
      items: [
        {
          question: "What are your delivery timelines?",
          answer: "Prepaid orders are delivered in 5 business days, while COD orders take 7 business days across India. International orders take 10-15 business days."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free shipping on all orders above ₹5,000 within India."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely. Once your order is shipped, you'll receive a tracking number starting with 'ESTATE' via email and SMS."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      icon: <ShieldCheck className="h-6 w-6" />,
      items: [
        {
          question: "What is your return policy?",
          answer: "We offer a 7-day hassle-free return policy for all unused artisanal goods in their original packaging."
        },
        {
          question: "How long does the refund process take?",
          answer: "Once we receive and inspect the return, refunds are processed within 3-5 business days to the original payment method."
        }
      ]
    },
    {
      category: "Product & Craftsmanship",
      icon: <HelpCircle className="h-6 w-6" />,
      items: [
        {
          question: "Are your products truly handmade?",
          answer: "Yes, every product at ESTATE is sourced directly from master artisans and uses traditional techniques. We focus on authentic craftsmanship and sustainability."
        },
        {
          question: "How do I care for my artisanal items?",
          answer: "Care instructions vary by product. You can find detailed care guides on each product page for specific advice."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Everything you need to know</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4">Help <span className="text-primary italic">Center</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our shipping, returns, and commitment to craftsmanship.
            </p>
          </motion.div>

          <div className="space-y-16">
            {faqs.map((group, index) => (
              <motion.div key={index} variants={fadeIn} className="space-y-8">
                <div className="flex items-center gap-4 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {group.icon}
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-foreground">{group.category}</h2>
                  <div className="h-px flex-1 bg-muted" />
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {group.items.map((item, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`item-${index}-${i}`} 
                      className="border-none bg-muted/30 rounded-3xl px-8 transition-all duration-300 hover:bg-muted/50 data-[state=open]:bg-muted/50 data-[state=open]:ring-1 data-[state=open]:ring-primary/20"
                    >
                      <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6 group">
                        <span className="group-hover:text-primary transition-colors">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={fadeIn}
            className="mt-24 p-12 rounded-[3rem] bg-neutral-900 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-6">
              <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Still have questions?</h3>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                Our team is ready to assist you with any inquiries about our products or services.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-primary text-primary-foreground px-10 h-14 rounded-2xl font-bold hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                    Contact Support
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
