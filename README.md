# 🎟️ Event Tier Showcase

**Event Tier Showcase** is a full-stack web app built with Next.js 14 (App Router), Clerk.dev authentication, Supabase PostgreSQL, tRPC, TanStack Query, and Tailwind CSS. It showcases events that are restricted by user tier—Free, Silver, Gold, or Platinum.

## 🚀 Features

- 🎫 User sign-up & login using Clerk
- 🧾 Tier stored in Clerk metadata (free by default)
- 📊 Supabase table `events` with tier-based access (Free, Silver, Gold, Platinum)
- ⚙️ TRPC endpoints:
  - `getMany` to fetch events by tier
  - `updateTier` mutation to upgrade user tier
- 📦 React Query + Suspense for smooth loading & cache
- 🎨 Tailwind-styled responsive UI, with upgrade buttons and tiered event cards

## 🧱 Tech Stack

| Layer      | Tool                    |
| ---------- | ----------------------- |
| Frontend   | Next.js 14 (App Router) |
| Auth       | Clerk.dev               |
| Database   | Supabase PostgreSQL     |
| API layers | tRPC + TanStack Query   |
| Styling    | Tailwind CSS            |

## 🛠️ Setup Instructions

### 1. Clone repo

```bash
git clone https://github.com/rishav16-9/event-tier.git
cd event-tier
```

### 2. Install dependency

```bash
npm install
```

### 🧩 Usage flow

- Users sign up/sign in via Clerk.

- Profile includes tier = free by default.

- On Events page:

- Users see events matching their tier.

- If in Free tier, only Free events show.

- Button to upgrade (to Silver → Gold → Platinum).

- After upgrade, UI instantly updates events and buttons.

### 👩‍💻 Demo user credential

```bash
Email: john@demo.com
Password: Demo@123
```
