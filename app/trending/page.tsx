import { createClient as createServerClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { TrendingUp, Flame, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function TrendingPage() {
  const supabase = await createServerClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .gte("price", 3000)
    .order("price", { ascending: false })
    .limit(16)

  const topPicks = products?.slice(0, 4) || []
  const hotDeals = products?.slice(4, 8) || []
  const newArrivals = products?.slice(8, 12) || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Trending Now</h1>
          <Flame className="h-6 w-6 text-orange-500" />
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Discover what's hot right now. Curated picks based on popularity, reviews, and sales.
        </p>
      </div>

      <Tabs defaultValue="top" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="top" className="gap-2">
            <Star className="h-4 w-4" />
            Top Picks
          </TabsTrigger>
          <TabsTrigger value="hot" className="gap-2">
            <Flame className="h-4 w-4" />
            Hot Deals
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            New Arrivals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topPicks.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              imageUrl={product.image_url}
              isNew={true}
            />
          ))}
        </TabsContent>

        <TabsContent value="hot" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotDeals.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              imageUrl={product.image_url}
            />
          ))}
        </TabsContent>

        <TabsContent value="new" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              imageUrl={product.image_url}
              isNew={true}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
