import { Leaf, Recycle, TreePine, Droplets, Sun, ArrowRight, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-green-900 via-emerald-800 to-green-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-linear-to-r from-green-400/20 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Sustainability at ESTATE</h1>
          <p className="mx-auto max-w-2xl text-xl text-green-100 leading-relaxed">
            Building a fashion future that respects both people and planet
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold">Our Commitment</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At ESTATE, sustainability isn't a marketing buzzword—it's the foundation of everything we do. From the
              materials we source to the way we ship products, every decision is made with environmental and social
              responsibility in mind.
            </p>
          </section>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-none">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/50 mb-3">
                  <TreePine className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Carbon Neutral</CardTitle>
                <CardDescription>100% offset through verified renewable energy projects</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 shadow-none">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Water Conservation</CardTitle>
                <CardDescription>85% reduction in water usage compared to conventional methods</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-none">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/50 mb-3">
                  <Recycle className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Zero Waste</CardTitle>
                <CardDescription>All packaging is recyclable, compostable, or reusable</CardDescription>
              </CardHeader>
            </Card>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Impact Metrics</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Carbon Emissions Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-green-600">2,450</span>
                      <span className="text-sm text-muted-foreground">tons CO₂ saved</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">85% below industry average</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Artisan Livelihoods Supported</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-primary">1,200+</span>
                      <span className="text-sm text-muted-foreground">families empowered</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground">92% fair trade certified partners</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Sustainable Materials</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border bg-card p-4 space-y-2">
                <h3 className="font-semibold">Organic Cotton</h3>
                <p className="text-sm text-muted-foreground">
                  Grown without harmful pesticides or synthetic fertilizers
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 space-y-2">
                <h3 className="font-semibold">Natural Dyes</h3>
                <p className="text-sm text-muted-foreground">Plant-based colors that are biodegradable and non-toxic</p>
              </div>
              <div className="rounded-xl border bg-card p-4 space-y-2">
                <h3 className="font-semibold">Recycled Metals</h3>
                <p className="text-sm text-muted-foreground">
                  Jewelry crafted from reclaimed and ethically sourced materials
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-950/40 dark:to-emerald-950/40 p-8 text-center space-y-6">
            <h2 className="text-3xl font-bold">Shop with Purpose</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Every purchase on ESTATE contributes to a more sustainable future. Our carbon footprint calculator shows
              the environmental impact of each product, empowering you to make informed choices.
            </p>
            <Button asChild size="lg" className="rounded-xl bg-green-600 hover:bg-green-700 text-white">
              <Link href="/shop">
                Discover Sustainable Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
