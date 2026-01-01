import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Radio, Users, Clock } from "lucide-react"

export default async function LivePage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .lte("stock_quantity", 30)
    .order("stock_quantity", { ascending: true })
    .limit(12)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="h-8 w-8 text-red-500" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <h1 className="text-4xl font-bold">Live Commerce</h1>
          <Badge variant="destructive" className="text-xs">
            LIVE NOW
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Limited stock items with real-time availability. Act fast before they're gone!
        </p>

        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">2,847 shoppers online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Updated 3 seconds ago</span>
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
