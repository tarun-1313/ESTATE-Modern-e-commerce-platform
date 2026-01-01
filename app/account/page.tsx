"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, LogOut, Loader2 } from "lucide-react"
import { createClient as createBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out successfully")
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{user.user_metadata?.name || "User"}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Account Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="destructive" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start bg-transparent"
              onClick={() => router.push("/dashboard")}
            >
              View Dashboard
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" onClick={() => router.push("/cart")}>
              My Cart
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" onClick={() => router.push("/shop")}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
