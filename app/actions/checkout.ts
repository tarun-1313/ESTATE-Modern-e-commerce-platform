"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { sendOrderConfirmationEmail } from "@/lib/email"

export async function simulatePayment(orderData: {
  amount: number
  paymentMethod: string
  items: any[]
  shippingAddress: string
}) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      throw new Error("User email not found")
    }

    const trackingNumber = `ESTATE${Date.now().toString().slice(-8)}`
    
    const estimatedDeliveryDate = new Date()
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + (orderData.paymentMethod === "cod" ? 7 : 5))

    const paymentStatus = orderData.paymentMethod === "cod" ? "pending" : "paid"
    const deliveryStatus = "processing"

    const finalAmount = orderData.paymentMethod === "cod" ? orderData.amount + 50 : orderData.amount

    // Simulate processing delay based on payment method
    await new Promise((resolve) => setTimeout(resolve, orderData.paymentMethod === "cod" ? 1000 : 1500))

    // Create order with comprehensive details
    const { data: createdOrderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: paymentStatus === "paid" ? "paid" : "pending",
        total_amount: finalAmount,
        payment_method: orderData.paymentMethod,
        payment_status: paymentStatus,
        shipping_address: orderData.shippingAddress,
        tracking_number: trackingNumber,
        delivery_status: deliveryStatus,
        estimated_delivery_date: estimatedDeliveryDate.toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError) {
      console.error("[v0] Order insertion error:", orderError)
      throw new Error(`Order creation failed: ${orderError.message}`)
    }

    if (!createdOrderData) {
      throw new Error("Order was not created - no data returned")
    }

    // Store individual order items for tracking
    const orderItems = orderData.items.map((item) => ({
      order_id: createdOrderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Failed to store order items:", itemsError)
      // Continue even if items storage fails
    }

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail({
        email: user.email,
        orderId: createdOrderData.id,
        trackingNumber: trackingNumber,
        totalAmount: finalAmount,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        estimatedDelivery: estimatedDeliveryDate.toISOString(),
      })
    } catch (emailError) {
      console.error("[v0] Failed to send confirmation email:", emailError)
      // We don't throw here to avoid failing the order if only the email fails
    }

    console.log("[v0] Order created successfully:", {
      orderId: createdOrderData.id,
      trackingNumber,
      paymentMethod: orderData.paymentMethod,
      deliveryStatus,
    })

    return { 
      success: true, 
      orderId: createdOrderData.id,
      trackingNumber,
      estimatedDelivery: estimatedDeliveryDate.toISOString(),
    }
  } catch (error: any) {
    console.error("[v0] Payment simulation error:", error)
    return { success: false, error: error.message || "Failed to process payment" }
  }
}
