import { Award, Gift, Star, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function RewardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Rewards Program</h1>
          <Badge className="gap-1">
            <Star className="h-3 w-3" />
            Gold Tier
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Earn points with every purchase and unlock exclusive benefits, early access, and special discounts.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Your Points Balance
          </CardTitle>
          <CardDescription>Earn 1 point for every ₹100 spent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">2,450</span>
            <span className="text-muted-foreground mb-1">points available</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Platinum Tier</span>
              <span className="font-medium">2,450 / 5,000</span>
            </div>
            <Progress value={49} className="h-2" />
            <p className="text-xs text-muted-foreground">Earn 2,550 more points to unlock Platinum benefits</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-amber-600">Current Tier</Badge>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-600" />
              Gold
            </CardTitle>
            <CardDescription>1,000 - 4,999 points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-600 mt-0.5" />
              <span>15% off on all purchases</span>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-600 mt-0.5" />
              <span>Early access to flash sales</span>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-600 mt-0.5" />
              <span>Free shipping on orders over ₹1,500</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardHeader>
            <Badge variant="secondary" className="w-fit mb-2">
              Next Tier
            </Badge>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Platinum
            </CardTitle>
            <CardDescription>5,000 - 9,999 points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5" />
              <span>20% off on all purchases</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5" />
              <span>VIP customer support</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5" />
              <span>Exclusive access to limited editions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardHeader>
            <Badge variant="outline" className="w-fit mb-2">
              Ultimate Tier
            </Badge>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Diamond
            </CardTitle>
            <CardDescription>10,000+ points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Gift className="h-4 w-4 mt-0.5" />
              <span>25% off + birthday gifts</span>
            </div>
            <div className="flex items-start gap-2">
              <Gift className="h-4 w-4 mt-0.5" />
              <span>Personal shopping assistant</span>
            </div>
            <div className="flex items-start gap-2">
              <Gift className="h-4 w-4 mt-0.5" />
              <span>Invites to exclusive events</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redeem Your Points</CardTitle>
          <CardDescription>Convert points to discounts on your next purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <span className="text-2xl font-bold">500</span>
              <span className="text-xs text-muted-foreground">points</span>
              <span className="text-sm font-medium">= ₹250 OFF</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <span className="text-2xl font-bold">1,000</span>
              <span className="text-xs text-muted-foreground">points</span>
              <span className="text-sm font-medium">= ₹600 OFF</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <span className="text-2xl font-bold">2,000</span>
              <span className="text-xs text-muted-foreground">points</span>
              <span className="text-sm font-medium">= ₹1,500 OFF</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <span className="text-2xl font-bold">5,000</span>
              <span className="text-xs text-muted-foreground">points</span>
              <span className="text-sm font-medium">= ₹5,000 OFF</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
