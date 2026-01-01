import Razorpay from "razorpay"
import crypto from "crypto"

// Initialize Razorpay instance (server-side only)
function getRazorpayInstance() {
  if (typeof window !== "undefined") {
    throw new Error("Razorpay server instance cannot be initialized on the client")
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

// Verify Razorpay payment signature
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  if (typeof window !== "undefined") return false

  const text = `${orderId}|${paymentId}`
  const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(text).digest("hex")

  return generated_signature === signature
}

// The public key will now be fetched via a secure Server Action.
