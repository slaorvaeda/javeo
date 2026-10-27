# Javeo Workspace Memory & Conventions

This workspace memory file documents the operational rules, backend integration details, and coding conventions for the Javeo e-commerce ecosystem.

## Core Tenancy & API
- **Store ID**: `javeo-store-uuid-3333-4444`
- **Backend API Base**: `http://localhost:8085/api` (Local) and `https://api.clickkarte.com/api` (Production)
- **Backend Server Code**: `/Users/priyanshunayak/Desktop/cpanael/server2`
- **Frontend App**: `/Users/priyanshunayak/Desktop/javeo/web`

## Essential Architectural Rules
1. **Never use dummy alert() calls for cart or checkout actions**:
   - Always use `addToCart(productId, quantity, variantId)` from `src/context/CartContext.js`.
   - The cart automatically syncs with cPanel backend endpoint `/api/cart`.
   - Session tokens are stored under `javeo_cart_session`.
2. **Customer Authentication & Profiles**:
   - Customer accounts are managed via `src/context/AuthContext.js` and `/api/customer/*`.
   - JWT tokens are stored under `javeo_customer_token` and auto-injected by `src/utils/api.js`.
   - The `Customer` table includes: `skinType`, `skinConcerns`, `avatarUrl`, `status`.
   - The `CustomerAddress` table includes: `name`, `phone`, `tag` (Home, Work, Other).
3. **Cart Drawer & Navigation**:
   - `CartDrawer` provides slide-over feedback, quantity steppers, and free shipping progress toward ₹1,000.
   - Navbar bag icon reflects live `itemCount` and opens the drawer.
   - Navbar account link routes to `/account` with active member indicator.
4. **Detailed Reference**:
   - See [web/remember/ARCHITECTURE_AND_API.md](file:///Users/priyanshunayak/Desktop/javeo/web/remember/ARCHITECTURE_AND_API.md) for full endpoint specifications, payload examples, and schema definitions.
