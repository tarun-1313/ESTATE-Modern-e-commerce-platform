import { createClient as createServerClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { Zap, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function FlashDealsPage() {
  const supabase = await createServerClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .lte("price", 3000)
    .order("price", { ascending: true })
    .limit(16)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold">Flash Deals</h1>
          <Badge variant="secondary" className="gap-1 text-xs">
            <Clock className="h-3 w-3" />
            Ends in 6h 23m
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Lightning-fast deals with incredible savings. Limited time offers you don't want to miss!
        </p>

        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="font-medium">Up to 60% OFF</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{products?.length} deals active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            imageUrl={product.image_url}
          />
        ))}
      </div>
    </div>
  )
}
