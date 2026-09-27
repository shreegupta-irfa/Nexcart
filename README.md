# NexCart

NexCart is a full-stack e-commerce application with a React/Vite client and a Node.js/Express REST API. The server uses MVC-style models, controllers, middleware and routes; Supabase PostgreSQL is accessed only from the backend. Authentication is custom bcrypt password hashing plus signed JWTs—Supabase Auth is not used.

## Features

- Customer: registration, login, profile APIs, searchable/paginated catalog, product details, persistent carts, addresses, wishlist, orders, notifications and reviews data models.
- Admin: role-protected product, category, coupon and user APIs. Product price reductions are written to price history.
- Intelligent foundation: backend smart-search parsing (`black shoes under 2000`), recently-viewed and recommendations tables ready for rule-based services.
- Checkout is deliberately marked as test-mode until a payment provider is configured. No card, CVV, UPI PIN, or payment secret is collected or stored.

## Tech stack

React, Vite, React Router, Axios, Node.js, Express, Supabase PostgreSQL, bcryptjs and JWT.

## Layout

`frontend/` and `backend/` are independent applications. The API request path is React → Axios → Express route → auth/validation middleware → controller → model → Supabase.

## Install and run

1. Create a Supabase project. Run [schema.sql](backend/src/config/schema.sql) in its SQL Editor.
2. Copy `backend/.env.example` to `backend/.env`, then add the project URL, its **service-role key**, and a long random `JWT_SECRET`. This file stays server-side.
3. Copy `frontend/.env.example` to `frontend/.env`.

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

The frontend defaults to `http://localhost:5000/api`. Set `CLIENT_URL` in backend `.env` if hosting the client elsewhere.

## Admin setup

Register an account through the API/UI, then in Supabase update only that user’s `users.role` to `admin`. Roles are placed in JWTs at login and enforced by Express middleware; hiding UI alone is never used as authorization.

## Major API endpoints

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Products | `GET /api/products?page=1&limit=20&search=&sort=price_asc`, `GET /api/products/:id`, `GET /api/products/smart-search?q=` |
| Cart | `GET/POST /api/cart`, `PATCH/DELETE /api/cart/:itemId`, `DELETE /api/cart` |
| Resources | `/api/categories`, `/api/addresses`, `/api/wishlist`, `/api/orders`, `/api/reviews`, `/api/notifications`, `/api/coupons` |

Responses use `{ success, message, data }`, with paginated product responses also including `pagination`.

## GitHub

```bash
git init
git add .
git commit -m "Build NexCart"
```

Never add either `.env` file. `.gitignore` already excludes them.
