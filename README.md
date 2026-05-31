# 🏦 Loan Management System (LMS)

A full-stack loan management platform built with **Next.js 16**, **Express 5**, **TypeScript**, and **MongoDB**. Supports a complete loan lifecycle — from borrower application through BRE scoring, sanction, disbursement, and payment collection — with role-based access control across five operational roles.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Roles & Permissions](#roles--permissions)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seeding Default Users](#seeding-default-users)
- [API Reference](#api-reference)
- [Frontend Pages](#frontend-pages)
- [Frontend ↔ Backend Integration Map](#frontend--backend-integration-map)
- [Backend Routes Ready to Integrate](#backend-routes-ready-to-integrate)
- [Loan Lifecycle](#loan-lifecycle)

---

## ✨ Features

- **JWT Authentication** — register, login, protected routes
- **Role-Based Access Control** — five distinct operational roles
- **Business Rule Engine (BRE)** — auto-validates age, salary, PAN, employment before loan creation
- **Complete Loan Lifecycle** — APPLIED → SANCTIONED → DISBURSED → CLOSED (or REJECTED)
- **Payment Collection** — UTR-based payment recording with auto-close on full repayment
- **Admin Dashboard** — real-time stats (users, loans by status)
- **File Upload Ready** — Multer-powered salary slip upload endpoint (backend built, frontend integration pending)
- **Role-Seeded Users** — one-command seed script to populate all operational roles

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| File Upload | Multer |
| HTTP Client | Axios |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────┐        ┌──────────────────────────────────┐
│        Next.js Frontend      │        │         Express Backend           │
│                             │        │                                  │
│  /login  /register          │◄──────►│  POST /api/auth/register         │
│  /dashboard (role router)   │        │  POST /api/auth/login            │
│  /borrower  (apply, loans)  │        │  GET  /api/auth/me               │
│  /sanction                  │        │                                  │
│  /disbursement              │        │  POST /api/loans/apply           │
│  /collection                │        │  GET  /api/loans/my-loans        │
│  /admin                     │        │  GET  /api/loans/applied         │
│                             │        │  GET  /api/loans/sanctioned      │
│  services/api.ts            │        │  GET  /api/loans/disbursed       │
│  (Axios + Bearer token)     │        │  GET  /api/loans/:id             │
│                             │        │  PATCH /api/loans/:id/sanction   │
└─────────────────────────────┘        │  PATCH /api/loans/:id/reject     │
                                       │  PATCH /api/loans/:id/disburse   │
                                       │                                  │
                                       │  POST /api/payments/:loanId      │
                                       │                                  │
                                       │  GET  /api/admin/stats           │
                                       └──────────────────────────────────┘
```

---

## 👥 Roles & Permissions

| Role | Default Email | Access |
|---|---|---|
| `BORROWER` | (self-registered) | Apply for loans, view own loans |
| `SANCTION` | sanction@lms.com | View applied loans, sanction or reject |
| `DISBURSEMENT` | disbursement@lms.com | View sanctioned loans, disburse |
| `COLLECTION` | collection@lms.com | View disbursed loans, record payments |
| `ADMIN` | admin@lms.com | All of the above + user/loan stats |

> All seeded users have default password: `123456`

---

## 📁 Project Structure

```
LMS/
├── backend-fixed/                  # Express + TypeScript API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authControllers.ts  # Register, Login
│   │   │   ├── loanControllers.ts  # Full loan CRUD + lifecycle
│   │   │   ├── paymentControllers.ts
│   │   │   └── adminControllers.ts # Dashboard stats
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # JWT verification
│   │   │   ├── roleMiddleware.ts   # Role-based guard
│   │   │   └── uploadMiddleware.ts # Multer config
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Loan.ts
│   │   │   └── Payment.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── loanRoutes.ts
│   │   │   ├── paymentRoutes.ts
│   │   │   ├── adminRoutes.ts
│   │   │   └── dashboardRoutes.ts  # Placeholder (not yet mounted)
│   │   ├── services/
│   │   │   └── breService.ts       # Business Rule Engine
│   │   ├── seed/
│   │   │   └── seedUsers.ts        # Seed operational role users
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── lms-frontend/                   # Next.js App Router frontend
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx            # Landing page
    │   │   ├── login/page.tsx
    │   │   ├── register/page.tsx
    │   │   ├── dashboard/page.tsx  # Role-based router
    │   │   ├── borrower/
    │   │   │   ├── page.tsx
    │   │   │   ├── apply-loan/page.tsx
    │   │   │   └── my-loan/page.tsx
    │   │   ├── sanction/page.tsx
    │   │   ├── disbursement/page.tsx
    │   │   ├── collection/page.tsx
    │   │   └── admin/page.tsx
    │   ├── components/
    │   │   └── Navbar.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   └── services/
    │       └── api.ts              # Axios instance + auth interceptor
    ├── .env.local.example
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/Akash8340/Loan-Management-System.git
cd Loan-Management-System
```

### 2. Backend Setup

```bash
cd backend-fixed
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env

npm install
npm run dev
# Server starts on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd lms-frontend
cp .env.local.example .env.local
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

npm install
npm run dev
# App starts on http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend — `backend-fixed/.env`

```env
# MongoDB connection string (required)
MONGO_URI=mongodb://localhost:27017/loan-management

# JWT signing secret — use a long random string (required)
JWT_SECRET=your_super_secret_key_here

# Server port (optional, defaults to 5000)
PORT=5000

# Frontend URL for CORS — set in production (optional)
CLIENT_URL=http://localhost:3000
```

### Frontend — `lms-frontend/.env.local`

```env
# Backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## 🌱 Seeding Default Users

The seed script creates one user for each operational role so you can test immediately without manual setup.

```bash
cd backend-fixed
# Add this one-time call inside server.ts connectDB callback, or run separately:
npx ts-node src/seed/seedUsers.ts
```

| Role | Email | Password |
|---|---|---|
| ADMIN | admin@lms.com | 123456 |
| SANCTION | sanction@lms.com | 123456 |
| DISBURSEMENT | disbursement@lms.com | 123456 |
| COLLECTION | collection@lms.com | 123456 |
| SALES | sales@lms.com | 123456 |

> **Note:** The `BORROWER` role is assigned automatically to anyone who self-registers via `/register`.

---

## 📡 API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ✗ | Register new user (default role: BORROWER) |
| `POST` | `/api/auth/login` | ✗ | Login, returns JWT token |
| `GET` | `/api/auth/me` | ✓ | Get current authenticated user |

**Register / Login payload:**
```json
{
  "name": "Akash Kumar",
  "email": "akash@example.com",
  "password": "secret123"
}
```

---

### Loans

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `POST` | `/api/loans/apply` | Any logged-in | Apply for a loan (runs BRE) |
| `GET` | `/api/loans/my-loans` | Any logged-in | Get own loans |
| `GET` | `/api/loans/applied` | SANCTION, ADMIN | All loans in APPLIED status |
| `GET` | `/api/loans/sanctioned` | DISBURSEMENT, ADMIN | All loans in SANCTIONED status |
| `GET` | `/api/loans/disbursed` | COLLECTION, ADMIN | All loans in DISBURSED status |
| `GET` | `/api/loans/` | ADMIN | All loans |
| `GET` | `/api/loans/:id` | Any logged-in | Get loan by ID |
| `PATCH` | `/api/loans/:id/sanction` | SANCTION, ADMIN | Sanction a loan (must be APPLIED) |
| `PATCH` | `/api/loans/:id/reject` | SANCTION, ADMIN | Reject a loan (must be APPLIED or SANCTIONED) |
| `PATCH` | `/api/loans/:id/disburse` | DISBURSEMENT, ADMIN | Disburse a loan (must be SANCTIONED) |

**Apply Loan payload:**
```json
{
  "fullName": "Akash Kumar",
  "pan": "ABCDE1234F",
  "dob": "1995-06-15",
  "monthlySalary": 50000,
  "employmentMode": "SALARIED",
  "loanAmount": 200000,
  "tenure": 24
}
```

**BRE Rules (auto-validated on apply):**
- Age must be between 23 and 50
- Monthly salary ≥ ₹25,000
- Valid PAN format (`AAAAA9999A`)
- Employment mode must not be `UNEMPLOYED`

---

### Payments

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `POST` | `/api/payments/:loanId` | COLLECTION, ADMIN | Record a payment (loan must be DISBURSED) |

**Payment payload:**
```json
{
  "utrNumber": "UTR2026053001",
  "amount": 10000,
  "paymentDate": "2026-05-30"
}
```

> When `outstandingAmount` reaches 0, the loan status is automatically set to `CLOSED`.

---

### Admin

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/api/admin/stats` | ADMIN | Dashboard stats (users, loans by status) |

**Response:**
```json
{
  "totalUsers": 12,
  "totalLoans": 45,
  "applied": 10,
  "sanctioned": 8,
  "disbursed": 20,
  "closed": 7
}
```

---

## 🖥 Frontend Pages

| Route | Role | Description |
|---|---|---|
| `/` | Public | Landing page with Login / Register links |
| `/login` | Public | JWT login form |
| `/register` | Public | Registration form (creates BORROWER role) |
| `/dashboard` | Any | Reads role from localStorage, redirects to correct portal |
| `/borrower` | BORROWER | Dashboard with Apply Loan and My Loans cards |
| `/borrower/apply-loan` | BORROWER | Loan application form |
| `/borrower/my-loan` | BORROWER | Table of own loans with status and amounts |
| `/sanction` | SANCTION | Table of APPLIED loans with Approve / Reject actions |
| `/disbursement` | DISBURSEMENT | Table of SANCTIONED loans with Disburse action |
| `/collection` | COLLECTION | Table of DISBURSED loans with Add Payment action |
| `/admin` | ADMIN | Stats grid (total users, loans by each status) |

---

## 🔗 Frontend ↔ Backend Integration Map

| Frontend Page | API Call | Backend Route |
|---|---|---|
| `/login` | `POST /auth/login` | `loginUser` |
| `/register` | `POST /auth/register` | `registerUser` |
| `/borrower/apply-loan` | `POST /loans/apply` | `applyLoan` |
| `/borrower/my-loan` | `GET /loans/my-loans` | `getMyLoans` |
| `/sanction` | `GET /loans/applied` | `getAppliedLoans` |
| `/sanction` | `PATCH /loans/:id/sanction` | `sanctionLoan` |
| `/sanction` | `PATCH /loans/:id/reject` | `rejectLoan` |
| `/disbursement` | `GET /loans/sanctioned` | `getSanctionedLoans` |
| `/disbursement` | `PATCH /loans/:id/disburse` | `disburseLoan` |
| `/collection` | `GET /loans/disbursed` | `getDisbursedLoans` |
| `/collection` | `POST /payments/:loanId` | `addPayment` |
| `/admin` | `GET /admin/stats` | `getDashboardStats` |

---

## 🔌 Backend Routes Ready to Integrate

The following backend routes are fully built and tested but not yet wired to the frontend. They are ready to integrate at any time:

### `GET /api/auth/me`
Returns the current authenticated user's profile (excluding password). Ready to power a profile dropdown, account settings page, or session persistence on refresh.

```tsx
// Example usage in any page
const res = await api.get("/auth/me");
const { user } = res.data;
```

---

### `GET /api/loans/:id`
Returns full details of a single loan. Ready to power a loan detail/status page — useful for borrowers who want to see interest breakdown, tenure, and repayment schedule.

```tsx
const res = await api.get(`/loans/${loanId}`);
```

---

### `GET /api/loans/` *(Admin only)*
Returns all loans across all borrowers with borrower name and email populated. Ready for an admin loan management table with search/filter.

```tsx
const res = await api.get("/loans/"); // ADMIN token required
```

---

### `POST /api/loans/:id/upload-slip` *(Multer — multipart/form-data)*
Allows uploading a salary slip PDF/image against a loan. The file is stored in `uploads/` and the path is saved on the loan document.

```tsx
const formData = new FormData();
formData.append("salarySlip", file);
await api.post(`/loans/${loanId}/upload-slip`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
```
> To integrate: add a file input on the Apply Loan page or a dedicated document upload page. The `salarySlip` field is already on the Loan model.

---

### Dashboard Routes (`/api/dashboard/*`)
`dashboardRoutes.ts` is scaffolded in the codebase and imported-ready in `server.ts`. It is not yet mounted or implemented — reserved for future role-specific dashboard metrics (e.g. collection efficiency, sanction rate, disbursement volume by date range).

---

## 🔄 Loan Lifecycle

```
                    ┌─────────┐
   POST /apply ───► │ APPLIED │
                    └────┬────┘
                         │
            ┌────────────┴────────────┐
            │                         │
     PATCH /sanction           PATCH /reject
            │                         │
            ▼                         ▼
      ┌───────────┐             ┌──────────┐
      │ SANCTIONED│             │ REJECTED │
      └─────┬─────┘             └──────────┘
            │
     PATCH /disburse
            │
            ▼
      ┌──────────┐
      │ DISBURSED│ ◄── POST /payments/:id (repeat until balance = 0)
      └─────┬────┘
            │
     outstanding = 0
            │
            ▼
       ┌────────┐
       │ CLOSED │
       └────────┘
```

---

## 📝 Notes

- All registered users default to the `BORROWER` role. Operational roles (`SANCTION`, `DISBURSEMENT`, `COLLECTION`, `ADMIN`) must be assigned via the seed script or directly in the database.
- The `SALES` role is defined in the schema and seeded but has no dedicated routes or frontend page yet.
- The `AuthContext` in the frontend is scaffolded for React Context-based auth state but is not yet wired to pages — all pages currently read user data directly from `localStorage`.
- `authService.ts`, `loanService.ts`, and `paymentService.ts` are scaffolded as service layer files but are currently empty — API calls are made directly in each page component.

