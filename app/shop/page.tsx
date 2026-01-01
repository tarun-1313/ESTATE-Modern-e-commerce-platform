import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { ShopClient } from "@/components/shop-client"
import { Suspense } from "react"

export default async function ShopPage() {
  const supabase = await createServerSupabaseClient()
  const { data: products } = await supabase.from("products").select("*")

  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopClient initialProducts={products || []} />
    </Suspense>
  )
}
