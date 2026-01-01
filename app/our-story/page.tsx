"use client"

import { Heart, Users, Globe, Award, ArrowRight, Sparkles, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

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

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/story 1.webp"
            alt="Artisan at work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="mb-6 text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl">
              Our <span className="text-primary italic font-serif">Story</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-neutral-300 leading-relaxed font-light">
              From a vision of sustainable luxury to India's premier artisanal e-commerce platform.
              Crafting heritage for the modern world.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-neutral-400">Scroll to explore</span>
            <div className="h-12 w-px bg-linear-to-b from-primary to-transparent" />
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-32">
          
          {/* The Beginning */}
          <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>The Foundation</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Where heritage meets modern vision.</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  ESTATE was born from a simple realization: the world's most exquisite craftsmanship was hidden in
                  India's villages and workshops, unknown to global consumers seeking authentic, sustainable luxury.
                </p>
                <p>
                  In 2020, during a journey through Rajasthan's artisan communities, our founders witnessed master
                  craftspeople creating breathtaking pieces with centuries-old techniques—yet struggling to reach modern
                  markets.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src="/story 2.webp"
                alt="Artisan workshop"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                  Artisan workshop
                </span>
              </div>
            </motion.div>
          </section>

          {/* Philosophy Section */}
          <section className="space-y-12">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl font-bold tracking-tight">Our Core Philosophy</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                We believe in commerce with a conscience, where every transaction empowers a community.
              </p>
            </motion.div>
            
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: Users,
                  title: "People First",
                  desc: "We ensure fair wages and sustainable livelihoods for our artisan partners."
                },
                {
                  icon: Globe,
                  title: "Planet Conscious",
                  desc: "From plastic-free packaging to carbon-neutral shipping, we protect our home."
                },
                {
                  icon: Award,
                  title: "Uncompromising Quality",
                  desc: "Every piece is rigorously inspected to meet global luxury standards."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className="group rounded-3xl border bg-muted/30 p-8 space-y-4 hover:bg-primary/5 transition-colors duration-500"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Impact Image Section */}
          <section className="relative h-[60vh] rounded-3xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=2000&auto=format&fit=crop"
              alt="Sustainable Craftsmanship"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center text-white space-y-6 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold italic font-serif">"Preserving heritage, one stitch at a time."</h2>
                <div className="h-px w-24 bg-primary mx-auto" />
                <p className="text-lg text-neutral-200">
                  Sustainability at ESTATE isn't just about materials; it's about preserving human legacy through intentional, slow commerce.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Milestones */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Our Journey</h2>
                <p className="text-muted-foreground">The path from a vision to a global community.</p>
              </div>
              <div className="h-px flex-1 bg-muted hidden md:block mb-4 mx-8" />
            </div>
            
            <div className="grid gap-12 md:grid-cols-3">
              {[
                { year: "2020", title: "The Spark", desc: "Launched with 5 artisan partners in Rajasthan." },
                { year: "2022", title: "Recognition", desc: "Awarded 'Best Sustainable Platform' by Ministry of Textiles." },
                { year: "2024", title: "Global Impact", desc: "Serving 25 countries with 200+ artisan partners." }
              ].map((milestone, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-4 relative"
                >
                  <span className="text-5xl font-black text-primary/10 absolute -top-8 -left-2">{milestone.year}</span>
                  <div className="pt-4 space-y-2 relative z-10">
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-neutral-900 text-white p-12 md:p-20 text-center space-y-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -ml-32 -mb-32" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to be part of the story?</h2>
              <p className="mx-auto max-w-2xl text-neutral-400 text-lg">
                Join our community of conscious consumers and support the next generation of master artisans.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg group">
                  <Link href="/products">
                    Shop Collection
                    <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-transparent border-white/20 hover:bg-white/10 text-white">
                  <Link href="/journal">
                    Read Our Journal
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
