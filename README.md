# Urban Clothing — Frontend Documentation

Premium urban trekking footwear e-commerce storefront.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS 4.1 |
| Routing | React Router DOM 7 |
| Animations | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| SEO | react-helmet-async |

---

## Project Structure

```
src/
├── components/          # Shared reusable components
│   ├── AnimatedCounter.jsx
│   ├── CartDrawer.jsx
│   ├── CursorLabel.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── JsonLd.jsx
│   ├── LoadingScreen.jsx
│   ├── MagneticButton.jsx
│   ├── Marquee.jsx
│   ├── NavBar.jsx
│   ├── ProductCard.jsx
│   ├── ProductSkeleton.jsx
│   ├── RevealImage.jsx
│   ├── ScrollProgress.jsx
│   ├── ScrollToTop.jsx
│   ├── SearchOverlay.jsx
│   ├── SEO.jsx
│   ├── SizeGuide.jsx
│   ├── TextScramble.jsx
│   ├── TiltCard.jsx
│   └── ui/
│       └── Button.jsx
├── constants/
│   └── config.js        # Theme, cart thresholds, GSAP presets
├── context/             # Global state (Cart, Wishlist)
│   ├── CartContext.jsx
│   └── WishlistContext.jsx
├── data/
│   └── products.js      # Static product data
├── hooks/               # Reusable custom hooks
│   ├── useGsapContext.js
│   ├── useImageLoad.js
│   ├── useInView.js
│   ├── useLenis.js
│   ├── useRecentlyViewed.js
│   └── useScrollAnimation.js
├── pages/               # Route-level pages
│   ├── ContactPage/
│   ├── FaqPage/
│   ├── HomePage/
│   ├── LoginPage/
│   ├── NotFoundPage/
│   ├── ProductDetailPage/
│   ├── RegisterPage/
│   ├── ShopPage/
│   ├── TrackOrderPage/
│   └── WishlistPage/
├── utils/
│   └── formatPrice.js
├── App.jsx              # Root app with routing + transitions
├── index.css            # Global styles, scrollbar, reduced-motion
└── main.jsx             # Entry point
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, featured slider, categories, marquee, testimonials |
| `/shop` | Shop | Infinite scroll product grid + filters |
| `/collections` | Collections | Editorial lookbook grid with lightbox |
| `/product/:id` | Product Detail | Size selector, stock badges, size guide, recently viewed |
| `/wishlist` | Wishlist | Saved products with remove functionality |
| `/track-order` | Track Order | Order tracking with visual timeline |
| `/contact` | Contact | Contact form + info |
| `/faq` | FAQ | Accordion-style questions |
| `/login` | Login | Auth placeholder page |
| `/register` | Register | Auth placeholder page |
| `*` | 404 | Editorial "Not Found" page |

---

## State Management

### Context API (no external state library needed)

**CartContext** (`src/context/CartContext.jsx`)
- `addToCart(product, quantity, size)` — adds item with toast notification
- `removeFromCart(cartItemId)` — removes specific item
- `updateQuantity(cartItemId, newQty)` — increments/decrements qty
- `clearCart()` — empties entire cart
- `toggleDrawer()` / `setDrawerOpen(bool)` — controls cart drawer
- `totalItems`, `totalPrice` — derived totals
- **Persistence**: Cart items saved to `localStorage` and hydrated on load

**WishlistContext** (`src/context/WishlistContext.jsx`)
- `toggleWishlist(product)` — add/remove from wishlist
- `isInWishlist(productId)` — check membership
- `count` — number of wishlisted items
- **Persistence**: Wishlist saved to `localStorage` and hydrated on load

---

## Features

### Order Tracking (`/track-order`)

**How it works:**
- User enters any order number (e.g. `URB-2025-8842`)
- The page generates realistic mock tracking data client-side using a hash of the order ID
- Product, quantity, size, and current status are deterministically derived from the order number hash
- **Does NOT require user login** — this is a demo/shipping status preview feature

**To connect to a real backend:**
Replace the `setTimeout` mock in `TrackOrderPage.jsx` with an actual API call:
```js
const res = await fetch(`/api/orders/${orderId}`);
const order = await res.json();
setOrder(order);
```

### Recently Viewed

**How it works:**
- When a user visits a product detail page, `trackView(productId)` is called
- Product IDs are stored in `localStorage` under key `urban_recently_viewed`
- Max 8 items, most recent first (LRU eviction)
- Displayed as a horizontal scroll row on `ProductDetailPage`
- **Does NOT require user login** — fully client-side

**To connect to a backend (logged-in users):**
Replace `localStorage` calls with authenticated API calls and merge server + local data.

### Wishlist

- Heart toggle on every product card, featured card, shop card, and product detail
- Red fill when liked; hollow outline when not
- Count badge in navbar
- Full wishlist page at `/wishlist`
- **Does NOT require login** — stored in `localStorage`

### Cart Drawer

- Slide-in drawer from right with GSAP animation
- Item quantity controls (+/-)
- Free shipping progress bar (threshold: Rs. 5000)
- Subtotal + shipping calculation
- Staggered item entrance animation

---

## Animation System

### Smooth Scroll (`useLenis`)
- Site-wide buttery scrolling via Lenis
- Integrated with GSAP ScrollTrigger for animation sync
- Respects `prefers-reduced-motion`

### Scroll-Triggered Reveals (`useGsapContext`)
- Every page wraps GSAP animations in `useGsapContext`
- Auto-cleans all ScrollTriggers and tweens on unmount
- Prevents memory leaks

### Component-Level Effects

| Component | Effect |
|-----------|--------|
| `ScrollProgress` | Gold bar at top that fills as you scroll |
| `MagneticButton` | Buttons subtly follow cursor on hover, elastic snap-back |
| `TiltCard` | 3D perspective tilt on mouse move (ProductCard) |
| `TextScramble` | Characters decode from random letters on scroll |
| `CursorLabel` | Gold "VIEW" / "EXPLORE" label follows cursor on product hover |
| `RevealImage` | Clip-path wipe reveal from left or right on scroll |
| `AnimatedCounter` | Numbers count up when scrolled into view |
| `Marquee` | Dual-direction infinite text scroll |

### Page Transitions
- Exit: slide left + fade out (0.25s)
- Enter: slide from right + fade in (0.4s)
- Handled in `AnimatedRoutes` in `App.jsx`

---

## Shared Configuration

### `src/constants/config.js`

```js
THEME.colors.primary     // '#2a2520'
THEME.colors.accent      // '#c4a35a'
THEME.colors.bg          // '#f5efe6'

CART_CONFIG.FREE_SHIPPING_THRESHOLD  // 5000
CART_CONFIG.MAX_RECENTLY_VIEWED      // 8

GSAP_PRESETS.scrollReveal      // { from, to, duration, ease, trigger }
GSAP_PRESETS.scrollRevealFast
GSAP_PRESETS.slideInLeft
GSAP_PRESETS.fadeIn
GSAP_PRESETS.stagger
GSAP_PRESETS.clipReveal
GSAP_PRESETS.counter
GSAP_PRESETS.heroEntrance
```

---

## Accessibility

- `prefers-reduced-motion` globally disables animations and resets smooth scroll
- All interactive elements have `:focus-visible` ring
- `aria-label` on icon buttons
- Skip-to-content link for screen readers
- Custom cursor hidden on touch devices (`@media (hover: none)`)

---

## Resilience

- `ErrorBoundary` wraps all routes — crashes show a graceful fallback UI instead of blank screen
- All `localStorage` reads wrapped in try/catch
- GSAP context cleanup kills all tweens + ScrollTriggers on unmount

---

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

---

## How to Extend

### Add a new page
1. Create folder `src/pages/NewPage/NewPage.jsx`
2. Import and add route in `src/App.jsx`
3. Add nav link in `src/components/NavBar.jsx` (optional)

### Add a new animation preset
1. Add entry to `GSAP_PRESETS` in `src/constants/config.js`
2. Use in page via `gsap.fromTo()` with the preset values

### Connect to a real backend
Replace `localStorage` calls in `CartContext`, `WishlistContext`, and `useRecentlyViewed` with authenticated fetch calls. The `TrackOrderPage` mock generator is clearly marked — swap the `setTimeout` block for an actual API call.
