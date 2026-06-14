# Urban Clothing API Documentation

Base URL: `http://localhost:5000/api`

Authentication: Bearer token via `Authorization: Bearer <token>` header.

---

## Table of Contents
- [Authentication](#authentication)
- [Auth Endpoints](#auth-endpoints)
- [Product Endpoints](#product-endpoints)
- [Order Endpoints](#order-endpoints)
- [Admin Endpoints](#admin-endpoints)
- [Data Models](#data-models)
- [Error Response Format](#error-response-format)

---

## Authentication

Most endpoints require a valid JWT token:
```
Authorization: Bearer <your_jwt_token>
```

Obtain a token via **POST /auth/login** or **POST /auth/register**.

---

## Auth Endpoints

### 1. POST /auth/register
Creates a new user account. Rate limited: 20 requests / 15 min.

**Request Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "securepass123" }
```

**Curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"securepass123"}'
```

**Success (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "isAdmin": false },
  "token": "eyJhbG..."
}
```

**Errors:** `400` (validation, email exists)

---

### 2. POST /auth/login
Authenticates a user. Rate limited: 20 requests / 15 min.

**Request Body:**
```json
{ "email": "john@example.com", "password": "securepass123" }
```

**Curl:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'
```

**Success (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "isAdmin": false },
  "token": "eyJhbG..."
}
```

**Errors:** `400` (validation), `401` (invalid credentials)

---

### 3. GET /auth/me
Returns the current user's profile.

**Curl:**
```bash
curl http://localhost:5000/api/auth/me -H "Authorization: Bearer <token>"
```

**Success (200):**
```json
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "isAdmin": false }
}
```

**Errors:** `401` (no/invalid token), `404` (user not found)

---

### 4. PUT /auth/profile
Updates name and/or email.

**Request Body:**
```json
{ "name": "Jane Doe", "email": "jane@example.com" }
```

**Curl:**
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

**Success (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { "id": "...", "name": "Jane Doe", "email": "jane@example.com", "isAdmin": false }
}
```

**Errors:** `400` (empty name, email in use), `401`, `404`

---

### 5. PUT /auth/password
Changes password after verifying current password.

**Request Body:**
```json
{ "currentPassword": "oldpass123", "newPassword": "newpass456" }
```

**Curl:**
```bash
curl -X PUT http://localhost:5000/api/auth/password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"oldpass123","newPassword":"newpass456"}'
```

**Success (200):**
```json
{ "success": true, "message": "Password changed successfully" }
```

**Errors:** `400` (missing fields, password < 6 chars), `401` (wrong current password), `404`

---

## Product Endpoints

### 6. GET /products
Returns paginated products with filtering.

**Query:** `?page=1&limit=20&category=mens&search=shirt&sort=price`

**Curl:**
```bash
curl "http://localhost:5000/api/products?page=1&limit=10&category=mens"
```

**Success (200):**
```json
{
  "success": true,
  "products": [ { "_id": "...", "title": "...", "newPrice": 999, "category": "mens", "img": "...", "stock": 50 } ],
  "page": 1,
  "pages": 5,
  "total": 48
}
```

---

### 7. GET /products/featured
Returns featured products.

**Query:** `?limit=10` (max 50)

**Curl:**
```bash
curl "http://localhost:5000/api/products/featured?limit=5"
```

**Success (200):**
```json
{ "success": true, "products": [ ... ] }
```

---

### 8. GET /products/:id
Returns a single product.

**Curl:**
```bash
curl http://localhost:5000/api/products/64f8a1b2c3d4e5f6a7b8c9d1
```

**Success (200):**
```json
{ "success": true, "product": { "_id": "...", "title": "...", "description": "...", "newPrice": 999, "oldPrice": 1499, "category": "mens", "img": "...", "images": [], "sizes": ["S","M","L"], "stock": 50, "isFeatured": true, "tags": ["cotton"], "createdAt": "...", "updatedAt": "..." } }
```

**Errors:** `400` (invalid ID), `404` (not found)

---

### 9. POST /products
Creates a product (Admin only). `multipart/form-data`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| image | file | Yes | JPEG/PNG, max 5MB |
| title | string | Yes | Min 1 char |
| description | string | No | |
| newPrice | number | Yes | Min 0 |
| oldPrice | number | No | Must be >= newPrice |
| category | string | Yes | `mens`, `womens`, `unisex` |
| stock | number | Yes | Min 0 |
| isFeatured | boolean | No | Default false |
| tags | string | No | Comma-separated |
| sizes | string | No | Comma-separated |

**Curl:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <admin_token>" \
  -F "image=@shirt.jpg" -F "title=Classic Shirt" -F "newPrice=999" \
  -F "category=mens" -F "stock=50"
```

**Success (201):**
```json
{ "success": true, "product": { "_id": "...", "title": "Classic Shirt", ... } }
```

**Errors:** `400` (validation, image required, price error), `401`, `403`

---

### 10. PUT /products/:id
Updates a product (Admin only). `multipart/form-data`.

**Curl:**
```bash
curl -X PUT http://localhost:5000/api/products/64f8... \
  -H "Authorization: Bearer <admin_token>" \
  -F "title=Updated Title" -F "stock=45"
```

**Success (200):**
```json
{ "success": true, "product": { "_id": "...", "title": "Updated Title", ... } }
```

**Errors:** `400`, `401`, `403`, `404`

---

### 11. DELETE /products/:id
Deletes a product (Admin only). Cannot delete if in active orders.

**Curl:**
```bash
curl -X DELETE http://localhost:5000/api/products/64f8... \
  -H "Authorization: Bearer <admin_token>"
```

**Success (200):**
```json
{ "success": true, "message": "Product deleted" }
```

**Errors:** `400` (in active order), `401`, `403`, `404`

---

## Order Endpoints

### 12. POST /orders
Places a new order. Uses atomic transaction (stock + order together).

**Request Body:**
```json
{
  "items": [
    { "product": "64f8...", "quantity": 2, "size": "L" }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "phone": "9876543210"
  },
  "paymentMethod": "cod"
}
```

**Curl:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"product":"64f8...","quantity":2,"size":"L"}],"shippingAddress":{"name":"John","address":"123 Main","city":"Mumbai","state":"MH","pincode":"400001","phone":"9876543210"},"paymentMethod":"cod"}'
```

**Success (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "...", "user": "...", "orderId": "URB-2024-7392",
    "items": [{ "product": "...", "title": "...", "img": "...", "size": "L", "price": 999, "quantity": 2 }],
    "shippingAddress": { "name": "...", "address": "...", "city": "...", "state": "...", "pincode": "...", "phone": "..." },
    "paymentMethod": "cod", "paymentStatus": "pending", "status": "placed",
    "totalAmount": 1998,
    "statusTimestamps": { "placed": "2024-01-15T10:30:00.000Z" },
    "createdAt": "...", "updatedAt": "..."
  }
}
```

**Errors:** `400` (invalid items, out of stock, invalid payment), `401`, `404` (product not found)

---

### 13. GET /orders
Returns the authenticated user's orders.

**Curl:**
```bash
curl http://localhost:5000/api/orders -H "Authorization: Bearer <token>"
```

**Success (200):**
```json
{
  "success": true, "message": "Orders fetched successfully",
  "count": 3,
  "orders": [ { "_id": "...", "orderId": "URB-2024-7392", "items": [ ... ], "status": "placed", "totalAmount": 1998 } ]
}
```

---

### 14. GET /orders/:id
Returns a single order. Users see their own; admins see any.

**Curl:**
```bash
curl http://localhost:5000/api/orders/64f8... -H "Authorization: Bearer <token>"
```

**Success (200):**
```json
{ "success": true, "message": "Order fetched successfully", "order": { ... } }
```

**Errors:** `400` (invalid ID), `403` (not authorized), `404`

---

### 15. GET /orders/:orderId/track
Returns order with status timeline. `:orderId` = `URB-2024-7392`.

**Curl:**
```bash
curl http://localhost:5000/api/orders/URB-2024-7392/track -H "Authorization: Bearer <token>"
```

**Success (200):**
```json
{
  "success": true,
  "order": { "orderId": "URB-2024-7392", "status": "shipped", ... },
  "timeline": [
    { "status": "placed", "completed": true, "date": "2024-01-15T10:30:00.000Z" },
    { "status": "confirmed", "completed": true, "date": "2024-01-15T11:00:00.000Z" },
    { "status": "shipped", "completed": true, "date": "2024-01-16T09:00:00.000Z" },
    { "status": "out_for_delivery", "completed": false, "date": null },
    { "status": "delivered", "completed": false, "date": null }
  ]
}
```

Cancelled orders return: `timeline: [{ status: "cancelled", completed: true, date: "..." }]`

---

### 16. PUT /orders/:id/cancel
Cancels own order (placed/confirmed only). Stock restored atomically.

**Curl:**
```bash
curl -X PUT http://localhost:5000/api/orders/64f8.../cancel -H "Authorization: Bearer <token>"
```

**Success (200):**
```json
{
  "success": true,
  "message": "Order cancelled successfully. Stock has been restored.",
  "order": { "_id": "...", "status": "cancelled", ... }
}
```

**Errors:** `400` (already cancelled, status not cancellable), `403` (not owner), `404`

---

### 17. PUT /orders/:orderId/status
Admin updates order status. Enforces valid transitions.

**Valid Transitions:**
| From | To |
|------|-----|
| placed | confirmed, cancelled |
| confirmed | shipped, cancelled |
| shipped | out_for_delivery, cancelled |
| out_for_delivery | delivered, cancelled |
| delivered | (none) |
| cancelled | (none) |

**Request Body:**
```json
{ "status": "shipped" }
```

**Curl:**
```bash
curl -X PUT http://localhost:5000/api/orders/URB-2024-7392/status \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"shipped"}'
```

**Success (200):**
```json
{ "success": true, "message": "Order status updated", "order": { ... } }
```

**Errors:** `400` (missing status, invalid status, invalid transition), `401`, `403`, `404`

---

### 18. GET /orders/all
Returns all orders (Admin only). Paginated.

**Query:** `?page=1&limit=10`

**Curl:**
```bash
curl "http://localhost:5000/api/orders/all?page=1&limit=10" -H "Authorization: Bearer <admin_token>"
```

**Success (200):**
```json
{
  "success": true, "message": "Orders fetched successfully",
  "count": 10, "total": 156, "page": 1, "pages": 16,
  "orders": [ ... ]
}
```

---

## Admin Endpoints

### 19. GET /admin/stats
Dashboard statistics.

**Curl:**
```bash
curl http://localhost:5000/api/admin/stats -H "Authorization: Bearer <admin_token>"
```

**Success (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 245, "totalProducts": 89, "totalOrders": 512,
    "totalRevenue": 128450, "ordersToday": 12, "pendingOrders": 34
  }
}
```

---

### 20. GET /admin/users
All users (password excluded).

**Curl:**
```bash
curl http://localhost:5000/api/admin/users -H "Authorization: Bearer <admin_token>"
```

**Success (200):**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "...", "email": "...", "isAdmin": false, "createdAt": "...", "updatedAt": "..." }
  ]
}
```

---

### 21. GET /admin/orders
All orders (Admin only). Same response as `GET /orders/all`.

**Query:** `?page=1&limit=10`

**Curl:**
```bash
curl "http://localhost:5000/api/admin/orders?page=1&limit=10" -H "Authorization: Bearer <admin_token>"
```

---

### 22. GET /admin/recent-orders
Last 10 orders with user name/email populated.

**Curl:**
```bash
curl http://localhost:5000/api/admin/recent-orders -H "Authorization: Bearer <admin_token>"
```

**Success (200):**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "orderId": "URB-2024-7392", "user": { "name": "...", "email": "..." }, "status": "placed", "totalAmount": 1998 }
  ]
}
```

---

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "String (required, trimmed)",
  "email": "String (required, unique, lowercase, valid email)",
  "password": "String (required, 6-128 chars, bcrypt hashed)",
  "isAdmin": "Boolean (default: false)",
  "avatar": "String (optional, valid URL)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Product
```json
{
  "_id": "ObjectId",
  "title": "String (required, min 1 char, trimmed)",
  "description": "String (trimmed)",
  "newPrice": "Number (required, min 0)",
  "oldPrice": "Number (min 0, must be >= newPrice)",
  "category": "String (enum: mens, womens, unisex)",
  "img": "String (required, valid HTTP/HTTPS URL)",
  "images": "[String]",
  "sizes": "[String]",
  "stock": "Number (default: 10, min 0)",
  "isFeatured": "Boolean (default: false)",
  "tags": "[String]",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Order
```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref: User)",
  "orderId": "String (unique, e.g., URB-2024-7392)",
  "items": [
    {
      "product": "ObjectId (ref: Product)",
      "title": "String",
      "img": "String",
      "size": "String",
      "price": "Number",
      "quantity": "Number (min 1)"
    }
  ],
  "shippingAddress": {
    "name": "String",
    "address": "String",
    "city": "String",
    "state": "String",
    "pincode": "String",
    "phone": "String"
  },
  "paymentMethod": "String (enum: cod, card, upi)",
  "paymentStatus": "String (enum: pending, paid, failed, refunded, default: pending)",
  "status": "String (enum: placed, confirmed, shipped, out_for_delivery, delivered, cancelled, default: placed)",
  "totalAmount": "Number (min 0)",
  "statusTimestamps": {
    "placed": "Date",
    "confirmed": "Date",
    "shipped": "Date",
    "out_for_delivery": "Date",
    "delivered": "Date",
    "cancelled": "Date"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["optional", "array", "of", "validation", "errors"]
}
```

**Common Status Codes:**
| Code | Meaning | Typical Causes |
|------|---------|---------------|
| 400 | Bad Request | Validation errors, invalid input, malformed ID |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Valid token but insufficient privileges (non-admin) |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate resource (e.g., email already exists) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error (should be rare) |
