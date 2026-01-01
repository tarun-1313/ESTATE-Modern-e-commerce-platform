import { notFound } from "next/navigation"
import { Star, ShieldCheck, Truck, RotateCcw, Leaf, MessageSquare, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import { ProductClient } from "./product-client"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Gallery - Now in ProductClient */}
        <ProductClient product={product} />

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="rounded-full px-3 py-1 uppercase tracking-wider">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                <Leaf className="h-3 w-3" />
                <span>1.2kg CO2e</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-tighter border-l pl-2">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified Authentic</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 uppercase tracking-tighter border-l pl-2">
                <Eye className="h-3 w-3" />
                <span>12 viewing now</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              <div className="flex items-center gap-1 text-sm">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground">(48 reviews)</span>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>
          </div>


          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 rounded-2xl border p-6 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold">2-Year Warranty</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Product Q&A
                </h3>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary animate-pulse">
                  LIVE
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl bg-muted/30 p-4 text-sm space-y-2">
                  <p className="font-bold">
                    User_482:{" "}
                    <span className="font-normal text-muted-foreground italic ml-2">
                      "Is the ceramic heat-resistant for oven use?"
                    </span>
                  </p>
                  <p className="text-primary font-medium flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      <span className="font-bold">Brand Architect:</span>{" "}
                      <span className="font-normal text-foreground ml-1">
                        "Yes, it is oven-safe up to 450°F (232°C). It uses a special thermal-resistant glaze."
                      </span>
                    </span>
                  </p>
                </div>
                <Button variant="outline" className="w-full text-xs h-10 rounded-xl bg-transparent hover:bg-muted">
                  Ask a Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
