# RICHBECKY GALLERY — STAGE 2 BACKEND IMPLEMENTATION & FRONTEND INTEGRATION

## Executive Summary

Stage 2 completes the development backend and integrates it cleanly with the existing **Richbecky Gallery** React/Vite frontend. All core business workflows—authentication, collector account management, artist application processing, artwork curatorial submission/approval, stock reservation, order placement with historical pricing preservation, and multi-role administrative oversight—are operational.

---

## 1. Implemented Systems & Features

### 1.1 Authentication & Session Management
- **Customer Auth**: Collector registration, login, session persistence in `localStorage`, and protected profile access.
- **Artist Studio Auth**: Artist login, discrete studio navigation, application status tracking (`Pending`, `Approved`, `Rejected`), and protected artist dashboard.
- **Executive Admin Governance**: Discrete secure login route (`/admin-login`), session preservation, and protected administrative console operations.

### 1.2 Artist Registration & Application Pipeline
- Flow: **Artist Registration ➔ Application Submission ➔ Curatorial Pending Review ➔ Admin Approval / Rejection ➔ Studio Activation**.
- Approved applications automatically create and activate the artist's studio profile.
- Unapproved artists are strictly prevented from publishing artworks to the public catalogue.

### 1.3 Artwork Curatorial Workflow & Management
- Lifecycle: **Draft ➔ Pending Admin Approval ➔ Approved / Rejected ➔ Published / Sold**.
- Only approved artworks appear in the public catalogue.
- **Original Artwork Logic**: Enforces maximum quantity of 1. Upon sale, availability transitions to `Sold`.
- **Fine Art Print Logic**: Manages stock levels across multiple available units.
- **Artwork Images**: Supports primary images, gallery views, display ordering, alt text, and production-safe URL mapping.

### 1.4 Customer Accounts, Wishlist & Cart
- Customer account profile management, default shipping/billing address management, and order history tracking.
- **Wishlist**: Backend duplicate prevention ensuring unique `(customer_id, artwork_id)` pairs.
- **Cart**: Enforces stock level limits during cart quantity adjustments.

### 1.5 Multi-Currency System & Orders (Without Payment Integration)
- Decouples original listing price + currency (`artworks.price` + `artworks.original_currency`) from customer display currency (`USD`, `NGN`, `GBP`, `EUR`, `CAD`, `AUD`).
- **Checkout Submission**: Validates customer details, cart items, and stock availability, generating development orders with status `Processing` / `Pending Payment`.
- **Historical Price Preservation**: Line items in `order_items` preserve the original listing price and currency snapshot at checkout time.

### 1.6 Commission Foundation & Admin Oversight
- Calculates gallery vs. artist splits (default **15%** gallery commission / **85%** artist share) recorded per order item.
- Admin console features real-time overview metrics, artwork review, application review, order status management, and activity audit logging.

### 1.7 In-App Notifications & Audit Records
- In-app notification creation for Artists, Customers, and Administrators.
- Administrative security audit logs recorded for critical actions.

---

## 2. Development Limitations (Intentionally Excluded in Stage 2)

As specified in the project scope rules, the following production integrations are **intentionally NOT connected** in Stage 2:
- **Payment Gateways**: Paystack, Flutterwave, Stripe, PayPal (Order checkout creates development order records without payment processing).
- **Production Credentials**: Production Supabase database, Resend email provider, production Vercel hosting, custom domain DNS.
- **External Exchange Rate API**: Uses local normalized currency exchange rates relative to USD.
- **External Email Delivery**: Notifications are recorded in-app.

---

## 3. Stage 3 Production Requirements

To deploy to production in **Stage 3**, Richbecky Gallery will require:
1. **Supabase Production Account**: Production Database URL and Service Role Key.
2. **Resend Email Service Account**: API key and domain SPF/DKIM verification for `richbeckygallery.com`.
3. **Payment Gateway Credentials**: Paystack Live Keys and Stripe Live Keys & Webhook secrets.
4. **Vercel & Domain Setup**: Production Vercel account link and custom domain DNS configuration (`richbeckygallery.com`).
