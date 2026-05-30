# Urban Clothing — Backend Documentation

Updated to match current frontend architecture (Redux Toolkit + RTK Query).

---

## Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Runtime | **Node.js** | JavaScript ecosystem consistency |
| Framework | **Express.js** | Minimal, fast REST API framework |
| Database | **MongoDB** + **Mongoose** | Flexible schema, easy JSON |
| Auth | **JWT (jsonwebtoken)** + **bcryptjs** | Stateless auth, password hashing |
| File Uploads | **Multer** + **Cloudinary** | Product image hosting |
| Validation | **express-validator** | Clean request validation |
| Env Config | **dotenv** | Secure config management |
| CORS | **cors** | Frontend-backend cross-origin |
| Dev Tool | **nodemon** | Auto-restart during dev |

---

## Project Structure

```
urban-clothing-backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # Register, login, getMe
│   ├── productController.js # CRUD + search + filters
│   ├── orderController.js  # Create, get, update status
│   └── adminController.js  # Dashboard stats
├── middleware/
│   ├── authMiddleware.js   # Verify JWT
│   ├── adminMiddleware.js  # Restrict to admin
│   ├── errorMiddleware.js  # Global error handler
│   └── uploadMiddleware.js # Multer / Cloudinary
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── utils/
│   └── generateToken.js    # JWT sign helper
├── server.js               # Entry point
├── .env
├── .env.example
└── package.json
```

---

## Data Models (Mongoose)

### User
```js
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, bcrypt hashed),
  isAdmin: { type: Boolean, default: false },
  avatar: String (optional, Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```js
{
  _id: ObjectId,
  title: String (required),
  description: String,
  newPrice: Number (required),    // Current price
  oldPrice: Number (optional),    // Original price for sale display
  category: String (enum: ['mens', 'womens', 'unisex']),
  img: String (required),         // Main image URL
  images: [String] (optional),   // Gallery images
  sizes: [String] (e.g. ['US 7', 'US 8', 'US 9']),
  stock: { type: Number, default: 10 },
  isFeatured: { type: Boolean, default: false },
  tags: [String] (e.g. ['new', 'sale', 'trending']),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```js
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  orderId: String (required, unique, e.g. 'URB-2025-8842'),
  items: [
    {
      product: ObjectId (ref: 'Product'),
      title: String,
      image: String,
      price: Number,
      quantity: Number,
      size: String
    }
  ],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String
  },
  totalAmount: Number,
  shippingCost: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, enum: ['cod', 'card', 'upi'], default: 'cod' },
  createdAt: Date,
  updatedAt: Date
}
```

> **Note:** No Cart model. Cart is client-side (`localStorage`) for guests. For logged-in users, you can optionally add a Cart model — but current frontend stores cart in Redux + `localStorage`.

---

## API Endpoints

Base URL configured in frontend: `VITE_API_URL` (default: `http://localhost:5000/api`)

### Auth (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | Public | `{ name, email, password }` → returns `{ user, token }` |
| POST | `/login` | Public | `{ email, password }` → returns `{ user, token }` |
| GET | `/me` | Bearer | Returns current user (used by `useGetMeQuery`) |

**Response format for auth:**
```json
{
  "success": true,
  "user": { "id", "name", "email", "isAdmin", "avatar" },
  "token": "eyJhbG..."
}
```

### Products (`/api/products`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Public | List all. Supports `?category=&search=&sort=&page=&limit=` |
| GET | `/:id` | Public | Single product |
| POST | `/` | Admin | Create product. Body: product JSON or multipart with image |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |
| GET | `/featured` | Public | Returns `isFeatured: true` products |

**Product list response:**
```json
{
  "success": true,
  "products": [...],
  "page": 1,
  "pages": 3,
  "total": 25
}
```

### Orders (`/api/orders`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Bearer | Place order from cart. Body: `{ items, shippingAddress, paymentMethod }` |
| GET | `/` | Bearer | Get my orders |
| GET | `/:id` | Bearer | Get single order by MongoDB `_id` |
| GET | `/:id/track` | Bearer | Get order by `orderId` string (for tracking page) |
| PUT | `/:id/status` | Admin | Update status. Body: `{ status }` |

**Order response:**
```json
{
  "success": true,
  "order": {
    "_id": "...",
    "orderId": "URB-2025-8842",
    "items": [...],
    "status": "shipped",
    "totalAmount": 5998,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

### Admin (`/api/admin`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stats` | Admin | Dashboard statistics |
| GET | `/orders` | Admin | All orders with pagination |
| GET | `/users` | Admin | All users |
| GET | `/recent-orders` | Admin | Last 10 orders |

**Stats response:**
```json
{
  "success": true,
  "stats": {
    "totalOrders": 156,
    "totalRevenue": 284750,
    "totalProducts": 42,
    "totalUsers": 89,
    "ordersToday": 5,
    "pendingOrders": 12
  }
}
```

---

## Middleware Design

### `authMiddleware`
```js
// 1. Read Authorization: Bearer <token>
// 2. jwt.verify(token, JWT_SECRET)
// 3. Find user in DB
// 4. Attach req.user = { _id, name, email, isAdmin }
// 5. Return 401 if invalid/missing
```

### `adminMiddleware`
```js
// 1. Check req.user.isAdmin === true
// 2. Return 403 if not admin
```

### `errorMiddleware`
```js
// 1. Catch all errors
// 2. Return JSON: { success: false, message, stack?: env===dev }
// 3. Default 500 for unhandled
```

---

## Environment Variables (.env)

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urban-clothing

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173
```

---

## Frontend ↔ Backend Integration

### How the frontend connects

The frontend uses **RTK Query** (`src/store/apiSlice.js`). All API calls go through this layer:

```js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => '/products', providesTags: ['Product'] }),
    getProductById: builder.query({ query: (id) => `/products/${id}` }),
    createProduct: builder.mutation({ query: (body) => ({ url: '/products', method: 'POST', body }), invalidatesTags: ['Product'] }),
    updateProduct: builder.mutation({ query: ({ id, ...body }) => ({ url: `/products/${id}`, method: 'PUT', body }), invalidatesTags: ['Product'] }),
    deleteProduct: builder.mutation({ query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }), invalidatesTags: ['Product'] }),
    getOrders: builder.query({ query: () => '/orders', providesTags: ['Order'] }),
    getOrderById: builder.query({ query: (id) => `/orders/${id}` }),
    createOrder: builder.mutation({ query: (body) => ({ url: '/orders', method: 'POST', body }), invalidatesTags: ['Order'] }),
    login: builder.mutation({ query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }) }),
    register: builder.mutation({ query: (userData) => ({ url: '/auth/register', method: 'POST', body: userData }) }),
    getMe: builder.query({ query: () => '/auth/me', providesTags: ['User'] }),
  }),
});
```

### Auth Flow
1. User logs in → backend returns `{ user, token }`
2. Frontend stores token in Redux `auth` slice + `localStorage`
3. RTK Query automatically attaches `Bearer <token>` to every request via `prepareHeaders`
4. On app load, if token exists in `localStorage`, Redux state is hydrated
5. `useGetMeQuery` can be called to validate token and fetch fresh user data

### Cart Flow (Guest vs Logged-in)
- **Guest users:** Cart stored in `localStorage` via Redux `cartSlice`
- **Logged-in users:** Optionally sync localStorage cart to backend on login. Frontend sends cart items as part of order creation.
- **No cart API needed** unless you want cross-device sync for logged-in users

### Order Tracking Flow
1. User enters order number on `/track-order`
2. Frontend sends `GET /api/orders/:orderId/track`
3. Backend looks up by `orderId` string (not MongoDB `_id`)
4. Returns order with timeline status

### Admin Dashboard Flow
1. Admin logs in → receives token
2. Admin routes check `isAdmin: true` on user
3. Frontend conditionally renders admin nav/link based on `state.auth.user.isAdmin`
4. Admin API calls hit `adminMiddleware` which returns 403 for non-admins

---

## Response Format Convention

All endpoints should return consistent JSON:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Field-level errors if any"]
}
```

---

## Seed Data

When setting up, seed products that match frontend expectations:

```js
{
  title: "CACTUS JACK",
  description: "...",
  newPrice: 8999,
  oldPrice: 9999,
  category: "mens",
  img: "https://.../cactus-jack.jpg",
  sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
  stock: 15,
  isFeatured: true,
  tags: ["new", "trending"]
}
```

Required fields for frontend compatibility: `title`, `newPrice`, `img`, `stock`
Optional but used: `oldPrice`, `category`, `sizes`, `isFeatured`, `tags`

---

## Development Steps

### Phase 1: Setup
1. `mkdir urban-clothing-backend && cd urban-clothing-backend`
2. `npm init -y`
3. `npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator multer cloudinary`
4. `npm install -D nodemon`
5. Create folder structure
6. Set up `server.js` with Express + CORS + JSON parser + error middleware
7. Connect MongoDB in `config/db.js`
8. Add `.env` with values from `.env.example`

### Phase 2: Auth
1. Create `User` model
2. Build `authController`: register (bcrypt hash), login (JWT sign), getMe
3. Create `authMiddleware`
4. Wire `/api/auth` routes
5. Test with Postman

### Phase 3: Products
1. Create `Product` model
2. Build `productController`: getAll, getById, create, update, delete
3. Add search, filter, sort, pagination to getAll
4. Set up Cloudinary + multer for image upload
5. Wire `/api/products` routes
6. Seed initial products

### Phase 4: Orders
1. Create `Order` model with `orderId` generation (`URB-${year}-${random}`)
2. Build `orderController`: createOrder, getMyOrders, getOrderById, updateStatus
3. Wire `/api/orders` routes
4. Add `/:id/track` endpoint for order tracking

### Phase 5: Admin
1. Create `adminController`: getStats, getAllOrders, getAllUsers
2. Create `adminMiddleware`
3. Wire `/api/admin` routes
4. Test admin endpoints with admin token

### Phase 6: Integration
1. Set `VITE_API_URL=http://localhost:5000/api` in frontend `.env`
2. Test login → token stored → authenticated requests work
3. Test product CRUD from admin dashboard
4. Test order placement and tracking

---

## Package List

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator multer cloudinary
npm install --save-dev nodemon
```

---

## Notes for Frontend Developer

| Frontend State | Backend Dependency | Notes |
|----------------|-------------------|-------|
| `cartSlice` (Redux) | None for guests | Optional sync for logged-in users |
| `wishlistSlice` (Redux) | None for guests | Optional sync for logged-in users |
| `authSlice` (Redux) | `/auth/login`, `/auth/register`, `/auth/me` | Token stored in localStorage |
| `apiSlice` (RTK Query) | All product/order endpoints | Auto-caching + revalidation |
| Recently viewed | None | Fully client-side via `localStorage` |
| Order tracking | `GET /orders/:id/track` | Uses `orderId` string, not Mongo `_id` |

**When backend is ready:**
1. Set `VITE_API_URL` in frontend `.env`
2. Replace static `PRODUCTS` import with `useGetProductsQuery()` where needed
3. Product detail page can use `useGetProductByIdQuery(id)`
4. Admin dashboard will use `useGetProductsQuery()` + mutations for CRUD
