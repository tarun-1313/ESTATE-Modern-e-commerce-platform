"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Loader2 } from "lucide-react"
import { createClient as createBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const nameValue = formData.get("name") as string
    const emailValue = formData.get("email") as string
    const passwordValue = formData.get("password") as string
    const confirmPasswordValue = formData.get("confirmPassword") as string

    if (!nameValue?.trim()) {
      toast.error("Please enter your name")
      setIsLoading(false)
      return
    }

    if (!emailValue?.trim()) {
      toast.error("Please enter your email")
      setIsLoading(false)
      return
    }

    if (passwordValue !== confirmPasswordValue) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailValue.trim(),
        password: passwordValue,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: nameValue.trim(),
            full_name: nameValue.trim(),
          },
        },
      })

      if (error) {
        toast.error(error.message)
        console.error("[v0] Signup error:", error)
        return
      }

      if (data.session) {
        toast.success("Signed up and logged in successfully!")
        router.push("/dashboard")
        router.refresh()
      } else {
        toast.success("Account created! Please check your email to verify.")
        setTimeout(() => router.push("/login"), 3000)
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred")
      console.error("[v0] Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md border-none shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="space-y-1 bg-primary text-primary-foreground p-8 text-center">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4 p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                defaultValue=""
                required
                disabled={isLoading}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue=""
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                defaultValue=""
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                defaultValue=""
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-8 pt-0">
            <Button type="submit" className="w-full h-11 rounded-xl" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
