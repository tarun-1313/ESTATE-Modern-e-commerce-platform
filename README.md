# ESTATE - Ethical E-Commerce Platform (Deployment Link: https://estate-modern-e-commerce-platform.vercel.app/ )

## Overview
ESTATE is a modern, high-performance e-commerce platform dedicated to ethical shopping and sustainable craftsmanship. Built with a focus on curated quality, the platform connects conscious consumers with authentic products while providing a seamless, AI-enhanced shopping experience.

## Key Features

### 1. Curated Shopping Experience
- **Personalized Greeting**: Dynamic, time-based greetings and curated content based on the user's current "mode" (Energetic, Productive, Relaxing).
- **Extensive Product Catalog**: A wide range of high-quality products categorized for easy browsing.
- **Detailed Product Pages**: Comprehensive information, high-resolution imagery, and reviews for every item.

### 2. Smart Insights & Urgency
- **Dynamic Pricing Insight**: Real-time alerts for the lowest prices and price drops.
- **Smart Restock Radar**: Notifications for back-in-stock items and low-inventory warnings.
- **Authentic Craftsmanship Badges**: Clear identification of sustainably sourced and artisan-made products.

### 3. AI-Powered Assistance
- **AI Shopping Assistant**: A dedicated AI assistant to help users find products, answer inquiries, and provide personalized recommendations.

### 4. User Account & Management
- **Personalized Dashboard**: A central hub for users to view their orders, manage their account, and track their shopping journey.
- **Order Tracking**: Real-time updates on order status and shipping progress.
- **Rewards Program**: An integrated loyalty system to reward frequent shoppers.

### 5. Secure Transactions
- **Multiple Payment Gateways**: Seamless integration with Stripe and Razorpay for secure and flexible payments.
- **Secure Checkout**: A streamlined and protected checkout process for peace of mind.

### 6. Administrative Tools
- **Admin Dashboard**: A powerful backend interface for managing products, orders, inventory, and users.

### 7. Support & Community
- **Comprehensive Support**: Dedicated pages for FAQ, returns, shipping information, and a contact form.
- **Journal & Story**: Engaging content about the brand's mission, sustainability efforts, and career opportunities.
- **Live Updates**: Real-time news and "live" features to keep the community engaged.

## Technical Stack
- **Framework**: Next.js 15+ (App Router)
- **Library**: React 19
- **Backend/Auth/Database**: Supabase
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Stripe & Razorpay
- **Email**: Nodemailer
- **AI Integration**: AI SDK (Google Gemini)
- **UI Components**: Radix UI (shadcn/ui pattern)

---
ESTATE is more than just a store; it's a commitment to quality, transparency, and the modern lifestyle.


A professional README for this project should include:
1. **Project Title & Catchy Tagline**: (e.g., ESTATE - Ethical Shopping, Curated for You).
2. **Project Overview**: A brief summary of what the project does (copied from the Overview section above).
3. **Key Features List**: A bulleted list of main functionalities.
4. **Tech Stack**: Technologies used (Next.js, Supabase, Tailwind, etc.).
5. **Getting Started**:
    - Prerequisites (Node.js, npm/pnpm).
    - Installation steps (`npm install`).
    - Environment variables setup (link to `.env.example`).
    - Running the development server (`npm run dev`).
6. **Project Structure**: High-level overview of the `app/`, `components/`, and `lib/` directories.
7. **Deployment**: Brief instructions for deploying to Vercel or similar platforms.
8. **Contributing Guidelines**: How others can contribute to the project.
9. **License**: Information about the project's license (e.g., MIT).

## Required .env Variables
The following environment variables are necessary for the website to function correctly:

### Supabase (Database & Auth)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous API key.
- `SUPABASE_SERVICE_ROLE_KEY`: Secret key for administrative backend tasks.
- `SUPABASE_JWT_SECRET`: Secret for signing and verifying JWTs.

### Database Connection (Postgres)
- `POSTGRES_URL`: Main connection string for pooling.
- `POSTGRES_URL_NON_POOLING`: Connection string for direct database access.
- `POSTGRES_USER`: Database username.
- `POSTGRES_PASSWORD`: Database password.
- `POSTGRES_HOST`: Database host address.
- `POSTGRES_DATABASE`: Database name.

### Email Service (SMTP)
- `EMAIL_HOST`: SMTP server host (e.g., `smtp.gmail.com`).
- `EMAIL_PORT`: SMTP server port (usually `587`).
- `EMAIL_USER`: Email address for sending notifications.
- `EMAIL_PASS`: App password or SMTP password.

### AI & External APIs
- `GOOGLE_GENERATIVE_AI_API_KEY`: API key for Gemini AI integration.
- `BYTEZ_API_KEY`: Key for additional AI or processing services.

### Payment Integration
- `STRIPE_SECRET_KEY`: (If Stripe is active) Secret key for payment processing.
- `RAZORPAY_KEY_ID`: (If Razorpay is active) Key ID for payments.
- `RAZORPAY_KEY_SECRET`: (If Razorpay is active) Key secret for payments.
