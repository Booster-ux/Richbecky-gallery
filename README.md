# Richbecky Gallery — Fine Art Marketplace & Digital Gallery

![Richbecky Gallery](public/logo.png)

A luxury digital art marketplace connecting collectors with master contemporary original artworks and limited-edition fine art prints.

## 🌟 Brand & Visual Direction
- **Primary Color**: Deep Navy Blue (`#0F2537`)
- **Accent Color**: Champagne Gold (`#D4AF37`)
- **Background**: Warm White / Ivory (`#FAF8F5`)
- **Typography**: `Cinzel`, `Playfair Display`, and `Inter`

## 🚀 Pages & Features Built

1. **Homepage**: Hero exhibition featuring *"Serenade in Blue & Gold"*, Categories grid, Featured Artworks, New Arrivals, Artist Spotlight, and Certificate of Authenticity guarantee section.
2. **Artwork Catalogue**: Multi-criteria live filtering (Category, Artist, Price Range, Medium, Size, Original vs Print), Search input, and Sorting (Price, Title, Newest).
3. **Artwork Details**: High-res image gallery, Lightbox zoom, Certificate of Authenticity callout for Original Artworks, Stock counter for Fine Art Prints, Buy Now, Add to Cart, and Related Artworks.
4. **Artist Profile**: Gallery avatar, biography, solo exhibition credentials, collection grid, and follow artist toggle.
5. **Shopping Cart**: Functional cart with session persistence (`localStorage`) enforcing quantity rules (strictly 1 for Original Artworks).
6. **Checkout UI**: Customer & Shipping address forms, payment selector (Card / Bank Transfer) with explicit backend integration notice.
7. **Customer Account**: Personal profile, order history timeline, saved wishlist, and addresses.
8. **Wishlist**: Saved artworks grid with instant add-to-cart.
9. **Artist Registration**: Artist representation application form.
10. **Artist Dashboard**: Studio overview metrics, portfolio list with approval statuses (*Approved*, *Pending Admin Approval*, *Rejected*), and earnings summary.
11. **Add Artwork**: Upload form displaying clear status **"Pending Admin Approval"**.
12. **Admin Dashboard**: Executive console featuring an **Artwork Approval Queue** with **Approve** and **Reject** actions that dynamically publish pending works to the main Catalogue.
13. **Order Confirmation**: Receipt view with order reference ID and shipping breakdown.

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Vanilla CSS
- **Icons**: Lucide Icons (`lucide-react`)

## 💻 Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/Booster-ux/Richbeckygallery.git

# 2. Navigate to project folder
cd Richbeckygallery

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
