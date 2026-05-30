# Urban Clothing — Frontend Documentation

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4.1.10
- **Animation:** GSAP 3.13 + Draggable + ScrollTrigger
- **Routing:** React Router DOM v7 (BrowserRouter)
- **State Management:** React Context + useReducer (Auth, Cart)
- **Deployment:** GitHub Pages (`gh-pages`)

## Architecture (Refactored)

```
src/
├── api/                  # Backend-ready HTTP client layer
│   ├── client.js         # Fetch wrapper with auth headers
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── components/           # Shared reusable UI components
│   ├── ui/
│   │   ├── Button.jsx
│   │   └── LoadingSpinner.jsx
│   ├── ProductCard.jsx
│   ├── CartDrawer.jsx    # Slide-out cart panel
│   ├── NavBar.jsx        # Desktop sidebar + Mobile top nav
│   ├── Footer.jsx
│   └── GooeyCursor.jsx   # Custom trailing cursor
├── context/              # Global state (React Context + useReducer)
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── hooks/                # Reusable logic
│   ├── useLocalStorage.js
│   └── useScrollAnimation.js
├── data/
│   └── products.js       # Centralized static data (temp until API)
├── utils/
│   ├── formatPrice.js
│   └── constants.js
└── pages/                # Page-level components (feature-based)
    ├── HomePage/
    │   ├── HeroSection.jsx
    │   ├── FeaturedCategories.jsx
    │   ├── MarqueeBanner.jsx
    │   ├── AboutSection.jsx
    │   ├── FeaturedProducts.jsx
    │   └── Testimonials.jsx
    ├── ShopPage/
    │   └── ShopPage.jsx         # Dual-column infinite scroll
    ├── CollectionsPage/
    │   └── CollectionsPage.jsx  # Draggable carousel
    ├── ProductDetailPage/
    │   └── ProductDetailPage.jsx
    ├── LoginPage/
    │   └── LoginPage.jsx
    └── RegisterPage/
        └── RegisterPage.jsx
```

## Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing: Hero, Categories, Marquee, About, Featured Products, Testimonials, Footer |
| `/shop` | `ShopPage` | Dual-column infinite-scroll product showcase with GSAP y-axis loop |
| `/collections` | `CollectionsPage` | Draggable horizontal carousel with progress bar |
| `/product/:id` | `ProductDetailPage` | Size selector, quantity, add to cart, related products |
| `/login` | `LoginPage` | Auth form (backend-ready) |
| `/register` | `RegisterPage` | Registration form (backend-ready) |

## State Management

### AuthContext (useReducer)
- `user`, `token`, `isAuthenticated`, `isLoading`, `error`
- Actions: `AUTH_START`, `AUTH_SUCCESS`, `AUTH_FAILURE`, `LOGOUT`, `UPDATE_USER`
- `localStorage.setItem('token', ...)` on login

### CartContext (useReducer)
- `items`, `totalItems`, `totalPrice`, `isOpen`
- Actions: `CART_LOADED`, `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`, `TOGGLE_DRAWER`
- `localStorage.setItem('cart', ...)` persistence
- Auto-opens drawer on add

## Data Model
```js
{
  id: number,
  img: string,           // static import path (CDN URLs from API when ready)
  title: string,
  description: string,
  price: number,
  oldPrice: number,
  category: 'mens'|'womens'|'accessories'|'shoes',
  sizes: string[],
  stock: number,
  isFeatured: boolean,
  tags: string[]
}
```

## Completed Features

### Core E-Commerce
- **Cart System:** Slide-out drawer, quantity +/-, remove item, total calculation, localStorage persistence, navbar badge
- **Product Detail Page:** Full-size image, size selector, quantity picker, discount badge, related products grid, breadcrumb
- **Auth UI:** Login and Register pages with form validation, ready for backend JWT integration

### Search & Discovery
- **Search:** Real-time product title search on Shop page
- **Sort:** Price ascending/descending, newest first
- **Filters:** Category filtering (ready for backend)

### Responsive Design
- **Mobile nav:** Hamburger menu, backdrop blur, animated icon
- **Mobile cart icon** in top nav with badge
- **Responsive grids:** 1-col mobile / 2-col tablet / 3-col desktop on Shop
- **Viewport scaling:** All `vw`/`vh` units paired with `md:` breakpoints
- **Touch-friendly:** Cursor hidden on touch devices, larger tap targets

### Animations & Interactions
- **GSAP ScrollTrigger** for AboutSection reveal
- **GSAP Draggable** for FeaturedProducts strip and Collections carousel
- **Infinite marquee** banner with CSS keyframes
- **Hover-reveal text** on all nav links and footer links
- **Gooey cursor** with 20-circle trail + mix-blend-difference
- **Smooth scroll** behavior and custom selection color

## Styling System
- **Colors:** `#141414` black, `#e7d6c4` beige card, `#ddc92a` accent yellow, `#f8f5eb` footer cream, `#FAF7EE` page bg
- **Font:** Savate (Google Fonts), fallback sans-serif
- **Border style:** 3px-5px solid `#141414` throughout for brand consistency
- **Cursor:** `cursor: none` on desktop, auto on touch devices
- **Custom utilities:** `hide-scrollbar` class, selection color, smooth scroll

## Environment Variables
```bash
VITE_API_URL=http://localhost:5000/api
```

## Build & Deploy
```bash
npm run dev           # local dev
npm run build         # production build
npm run deploy        # gh-pages deploy
```

## Backend Integration Checklist (When Ready)
1. In `AuthContext.jsx`: replace placeholder login/register with `authApi.login()` / `authApi.register()`
2. In `ShopPage.jsx`: replace `PRODUCTS` static import with `productsApi.getAll()`
3. In `ProductDetailPage.jsx`: fetch product by ID from API
4. In `CartContext.jsx`: sync cart with `cartApi` calls when user is authenticated
5. Add loading skeletons and error boundaries for API calls
6. Replace static image imports with CDN URLs from backend
