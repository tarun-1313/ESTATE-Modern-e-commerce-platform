import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              ESTATE
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curating high-quality, sustainable essentials for the modern lifestyle. Handcrafted with intention and
              designed to last a lifetime.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Shop</h3>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/new" className="hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop/best-sellers" className="hover:text-foreground transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop/sale" className="hover:text-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Company</h3>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/our-story" className="hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-foreground transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Help</h3>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/shipping" className="hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Estate Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
