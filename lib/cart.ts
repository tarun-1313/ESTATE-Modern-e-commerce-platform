export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  category: string
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export function addToCart(product: Omit<CartItem, "quantity">): void {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("cart-updated"))
}

export function updateCartItemQuantity(id: string, quantity: number): void {
  const cart = getCart()
  const item = cart.find((item) => item.id === id)

  if (item) {
    item.quantity = Math.max(1, quantity)
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
  }
}

export function removeFromCart(id: string): void {
  const cart = getCart().filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("cart-updated"))
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function clearCart(): void {
  localStorage.removeItem("cart")
  window.dispatchEvent(new Event("cart-updated"))
}
