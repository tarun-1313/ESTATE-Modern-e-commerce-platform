import Link from "next/link"
import { ArrowRight, Clock, Zap, ShieldCheck, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()
  const { data: products } = await supabase.from("products").select("*").limit(12)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
  const moodTheme = hour < 12 ? "Energetic" : hour < 18 ? "Productive" : "Relaxing"

  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            className="h-full w-full object-cover opacity-60"
          />
        </div>
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-md">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>
                {greeting}, it's {moodTheme} mode. curated for you.
              </span>
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Ethical Shopping, Curated for Your {moodTheme} Day
            </h1>
            <p className="text-pretty text-lg text-neutral-200 sm:text-xl">
              Discover our curated selection of sustainably sourced, high-quality products designed for the modern home
              and lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 rounded-full px-8 text-base font-semibold" asChild>
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white px-8 text-base font-semibold text-white hover:bg-white hover:text-black bg-transparent"
                asChild
              >
                <Link href="/our-story">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold">Authentic Craftsmanship</h3>
            <p className="text-sm text-muted-foreground">
              Every piece is sourced directly from master artisans, ensuring genuine quality and cultural heritage.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                100% Authentic
              </Badge>
              <Badge variant="secondary">Direct from Artisan</Badge>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold">Dynamic Pricing Insight</h3>
            <p className="text-sm text-muted-foreground">
              Smart sensitivity detection: The "Premium Leather Tote" is currently at its lowest price in 30 days.
            </p>
            <Link href="/products" className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
              Grab it now <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold">Smart Restock Radar</h3>
            <p className="text-sm text-muted-foreground">
              Your favorite ceramic vase is back in stock. Only 5 units remaining in our artisanal batch.
            </p>
            <Badge className="mt-4 bg-red-500/10 text-red-600 hover:bg-red-500/10 border-red-200">Urgency: High</Badge>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Arrivals</h2>
            <p className="text-muted-foreground">Handpicked pieces from our latest collection.</p>
          </div>
          <Button variant="link" className="group h-auto p-0 text-base font-semibold" asChild>
            <Link href="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              category={product.category}
              imageUrl={product.image_url}
              isNew={true}
            />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-neutral-50 py-24 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-3xl">
              <img src="/artisanal-craft.jpg" alt="Our philosophy" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Our Philosophy</h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  We believe that the objects we surround ourselves with should be meaningful, durable, and ethically
                  produced. Our mission is to bridge the gap between luxury design and sustainable practices.
                </p>
                <p>
                  Every piece in our collection is vetted for its environmental impact and the craftsmanship behind it.
                  We work directly with artisans to bring you products that tell a story.
                </p>
              </div>
              <Button variant="outline" className="h-12 rounded-full px-8 text-sm font-semibold bg-transparent" asChild>
                <Link href="/sustainability">Learn More About Sustainability</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
