"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image_url: string
}

interface ShopClientProps {
  initialProducts: Product[]
}

const CATEGORIES = [
  "All",
  "Ethnic Wear",
  "Jewellery",
  "Home Decor",
  "Garden",
  "Accessories",
  "Gift Items",
  "Men Fashion",
  "Bags",
  "Bedding",
  "Lighting",
  "Decor",
  "Hobby",
  "Lifestyle",
  "Contemporary",
  "Beauty",
  "Collectibles",
  "Food & Beverage",
  "Kitchenware",
  "Bath",
  "Stationery",
  "Religious",
  "Footwear",
  "Religious Art",
  "Fitness",
  "Furniture",
  "Personal Care",
  "Fabric",
  "Toys",
  "Kids Fashion",
]

export function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const q = searchParams.get("q")
    if (q !== null) {
      setSearchQuery(q)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [initialProducts, selectedCategory, searchQuery])

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">Products Collection</h1>
            <p className="text-muted-foreground">Explore our curated selection of high-quality products.</p>
          </div>

          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-2xl border-none bg-muted/50 pl-11 pr-4 text-base focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 rounded-xl bg-transparent px-4 gap-2 border-dashed">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-fade-right">
              {CATEGORIES.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "secondary" : "outline"}
                  className={`cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                      : "bg-transparent hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              category={product.category}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <Search className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h3 className="text-xl font-bold">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSelectedCategory("All")
              setSearchQuery("")
            }}
            className="mt-4"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
