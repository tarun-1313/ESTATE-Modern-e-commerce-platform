"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

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

export default function JournalPage() {
  const posts = [
    {
      title: "The Art of Handcrafted Pottery",
      excerpt: "Discover the ancient techniques used by our master artisans to create timeless ceramic pieces.",
      date: "May 15, 2024",
      author: "Elena Rossi",
      category: "Craftsmanship",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800"
    },
    {
      title: "Sustainable Living: A Modern Guide",
      excerpt: "How to incorporate ethical and sustainable products into your daily home routine.",
      date: "May 10, 2024",
      author: "Marcus Chen",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800"
    },
    {
      title: "Meet the Maker: Sourcing in Jaipur",
      excerpt: "A deep dive into our partnership with traditional textile weavers in the Pink City.",
      date: "May 5, 2024",
      author: "Aria Smith",
      category: "Behind the Scenes",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800"
    }
  ]

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
              <span>Artisan Stories</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4 italic">ESTATE <span className="text-primary not-italic">Journal</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Deep dives into the world of craftsmanship, sustainability, and the stories behind every piece in our collection.
            </p>
          </motion.div>

          <div className="grid gap-16">
            {posts.map((post, index) => (
              <motion.article 
                key={index} 
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="grid md:grid-cols-2 gap-12 items-center group"
              >
                <div className="relative aspect-square md:aspect-video overflow-hidden rounded-[2.5rem] bg-muted shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-4xl font-black tracking-tight leading-[1.1] group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-black text-lg gap-3 text-primary group/btn" asChild>
                    <Link href="#">
                      Read Full Story 
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeIn} className="mt-24 text-center">
            <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all">
              Discover More Stories
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
