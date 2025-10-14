# Appointment Booking SaaS

A complete, production-ready appointment booking system built with Next.js 14, TypeScript, Prisma, and Stripe. Perfect for salons, clinics, studios, and service businesses.

## Features

- 🏢 **Multi-tenant Architecture** - Each business gets their own branded booking page
- 👥 **Staff Management** - Assign services to specific staff members
- 📅 **Smart Availability** - Complex scheduling with holidays and exceptions
- 💳 **Integrated Payments** - Accept deposits and full payments via Stripe
- 📧 **Multi-channel Notifications** - Email, SMS, and WhatsApp reminders
- 🌍 **Multi-language Support** - Available in English, German, Spanish and more
- 🎨 **Professional UI** - Beautiful, responsive design with dark/light mode
- 🔒 **Secure & Scalable** - Built with security and performance in mind

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email/password and Google OAuth
- **Payments**: Stripe Payment Intents
- **UI**: Tailwind CSS + Headless UI
- **Internationalization**: next-intl
- **Email**: Resend with React Email templates
- **Notifications**: Optional WhatsApp/SMS via Twilio
- **Jobs**: BullMQ with Upstash Redis (optional)
- **Testing**: Vitest + Playwright

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Resend account (for emails)

### 1. Clone and Install

```bash
git clone <repository-url>
cd appointment-booking-saas
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Fill in your environment variables in `.env`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_strong_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_DEFAULT=price_... # Your yearly subscription price ID
STRIPE_TAX_ENABLED=true

# Email
RESEND_API_KEY=re_...
EMAIL_FROM="Bookings <no-reply@your-domain.com>"

# Optional: WhatsApp/Twilio
WHATSAPP_ENABLED=false
WHATSAPP_CLOUD_TOKEN=
WHATSAPP_PHONE_ID=
WHATSAPP_BUSINESS_ID=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=

# Optional: Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Optional: Sentry
SENTRY_DSN=
SENTRY_ENABLED=false
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

After seeding, you can access:

- **Admin Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Demo Booking Page**: [http://localhost:3000/demo](http://localhost:3000/demo)

**Demo Credentials:**
- Email: `admin@demo.com`
- Password: `password123`

## Stripe Webhook Setup

For local development, use the Stripe CLI:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret to your `.env` file as `STRIPE_WEBHOOK_SECRET`.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your Vercel project settings:

```
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
EMAIL_FROM="Bookings <no-reply@your-domain.com>"
```

## Project Structure

```
/app
  (marketing)/          # Marketing pages
  (dashboard)/          # Admin dashboard
  (booking)/           # Public booking pages
  api/                 # API routes
/components
  ui/                  # Reusable UI components
  forms/               # Form components
  layout/              # Layout components
  providers/           # Context providers
/emails               # Email templates
/lib                  # Utilities and configurations
/locales             # Internationalization files
/prisma              # Database schema and migrations
/tests               # Test files
```

## Key Features

### Multi-tenant Booking System

Each organization gets a unique booking URL:
- `https://your-domain.com/demo` - Demo salon
- `https://your-domain.com/beauty-spa` - Beauty spa
- `https://your-domain.com/fitness-studio` - Fitness studio

### Smart Availability Engine

- Organization-wide opening hours
- Staff-specific schedules
- Holiday management
- Exception handling
- Buffer time between appointments
- Timezone support

### Payment Integration

- Stripe Payment Intents
- Deposit or full payment options
- Automatic tax calculation (EU)
- Refund management
- Subscription billing

### Multi-language Support

- English (EN)
- German (DE) 
- Spanish (ES)
- Scaffolds for Arabic (AR), Indonesian (ID), French (FR)
- RTL support for Arabic

## API Documentation

### Organizations

```typescript
GET /api/organizations
POST /api/organizations
GET /api/organizations/[orgId]
PATCH /api/organizations/[orgId]
DELETE /api/organizations/[orgId]
```

### Services

```typescript
GET /api/services?orgId=...
POST /api/services
GET /api/services/[serviceId]
PATCH /api/services/[serviceId]
DELETE /api/services/[serviceId]
```

### Bookings

```typescript
GET /api/bookings?orgId=...
POST /api/bookings
GET /api/bookings/[bookingId]
PATCH /api/bookings/[bookingId]
DELETE /api/bookings/[bookingId]
```

### Availability

```typescript
GET /api/slots?orgId=...&serviceId=...&date=...&timezone=...
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@your-domain.com or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
