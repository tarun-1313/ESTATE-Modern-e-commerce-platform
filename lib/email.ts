import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "tarunchaudhari1313@gmail.com",
    pass: process.env.EMAIL_PASS || "",
  },
})

export async function sendOrderConfirmationEmail(orderData: {
  email: string
  orderId: string
  trackingNumber: string
  totalAmount: number
  items: any[]
  shippingAddress: string
  estimatedDelivery: string
}) {
  const itemsHtml = orderData.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || "Product"}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
    </tr>
  `
    )
    .join("")

  const mailOptions = {
    from: `"ESTATE Artisanal Hub" <${process.env.EMAIL_USER || "tarunchaudhari1313@gmail.com"}>`,
    to: orderData.email,
    subject: `Order Confirmed - #${orderData.orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #fff; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #000; margin: 0; font-size: 28px; letter-spacing: -1px;">ESTATE</h1>
          <p style="color: #666; font-style: italic;">Artisanal Excellence</p>
        </div>

        <h2 style="font-size: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Order Confirmation</h2>
        <p>Hello,</p>
        <p>Thank you for your order! Your purchase has been booked successfully. We are now preparing your artisanal items for shipment.</p>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Order ID:</strong> #${orderData.orderId}</p>
          <p style="margin: 5px 0;"><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>
          <p style="margin: 5px 0;"><strong>Estimated Delivery:</strong> ${new Date(orderData.estimatedDelivery).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <h3 style="font-size: 18px; margin-top: 30px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; color: #000; font-size: 18px;">₹${orderData.totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px;">
          <h3 style="font-size: 16px; margin-bottom: 10px;">Shipping Address</h3>
          <p style="background-color: #fff; border: 1px solid #eee; padding: 15px; border-radius: 8px; font-size: 14px; white-space: pre-line; line-height: 1.6;">
            ${orderData.shippingAddress}
          </p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>If you have any questions, please contact us at tarunchaudhari1313@gmail.com</p>
          <p>&copy; ${new Date().getFullYear()} ESTATE Artisanal Hub. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return { success: false, error }
  }
}
