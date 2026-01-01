"use client"

import { motion } from "framer-motion"
import { Clock, ShieldCheck, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface HomeClientProps {
  products: any[]
  greeting: string
  moodTheme: string
}

export function HomeClient({ products, greeting, moodTheme }: HomeClientProps) {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-neutral-900"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            className="h-full w-full object-cover opacity-60"
          />
        </motion.div>
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-2xl space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-md">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>
                {greeting}, it's {moodTheme} mode. curated for you.
              </span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Ethical Shopping, Curated for Your {moodTheme} Day
            </motion.h1>
            <motion.p variants={fadeIn} className="text-pretty text-lg text-neutral-200 sm:text-xl leading-relaxed">
              Discover our curated selection of sustainably sourced, high-quality products designed for the modern home
              and lifestyle.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 rounded-full px-8 text-base font-semibold transition-all hover:scale-105" asChild>
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white px-8 text-base font-semibold text-white hover:bg-white hover:text-black bg-transparent transition-all"
                asChild
              >
                <Link href="/our-story">Our Story</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: ShieldCheck,
              title: "Authentic Craftsmanship",
              desc: "Every piece is sourced directly from master artisans, ensuring genuine quality and cultural heritage.",
              badges: ["100% Authentic", "Direct from Artisan"],
              color: "primary"
            },
            {
              icon: Zap,
              title: "Dynamic Pricing Insight",
              desc: "Smart sensitivity detection: The \"Premium Leather Tote\" is currently at its lowest price in 30 days.",
              link: "/products",
              linkLabel: "Grab it now",
              color: "yellow"
            },
            {
              icon: TrendingUp,
              title: "Smart Restock Radar",
              desc: "Your favorite ceramic vase is back in stock. Only 5 units remaining in our artisanal batch.",
              urgency: "High",
              color: "green"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-${feature.color === 'primary' ? 'primary' : feature.color + '-500'}/10 text-${feature.color === 'primary' ? 'primary' : feature.color + '-600'}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.desc}
              </p>
              {feature.badges && (
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map((badge, bi) => (
                    <Badge key={bi} variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
              {feature.link && (
                <Link href={feature.link} className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 transition-all">
                  {feature.linkLabel} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              )}
              {feature.urgency && (
                <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/10 border-red-200">
                  Urgency: {feature.urgency}
                </Badge>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-12 flex items-end justify-between gap-4"
        >
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight">Featured Arrivals</h2>
            <p className="text-muted-foreground text-lg">Handpicked pieces from our latest collection.</p>
          </div>
          <Button variant="link" className="group h-auto p-0 text-base font-bold text-primary" asChild>
            <Link href="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products?.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                category={product.category}
                imageUrl={product.image_url}
                isNew={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-neutral-50 py-32 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square overflow-hidden rounded-[3rem] shadow-2xl"
            >
              <img src="/artisanal-craft.jpg" alt="Our philosophy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <h2 className="text-5xl font-bold tracking-tight">Our <span className="text-primary italic font-serif">Philosophy</span></h2>
              <div className="space-y-6 text-xl leading-relaxed text-muted-foreground font-light">
                <p>
                  We believe that the objects we surround ourselves with should be meaningful, durable, and ethically
                  produced. Our mission is to bridge the gap between luxury design and sustainable practices.
                </p>
                <p>
                  Every piece in our collection is vetted for its environmental impact and the craftsmanship behind it.
                  We work directly with artisans to bring you products that tell a story.
                </p>
              </div>
              <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-base font-semibold hover:bg-primary hover:text-white transition-all" asChild>
                <Link href="/sustainability">Learn More About Sustainability</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
