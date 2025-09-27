# CashDash

CashDash is a SaaS-style cash management dashboard.  
It helps track cash balance, monthly burn rate, runway, and import transactions from CSV.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript, TailwindCSS)  
- **Backend**: API Routes (REST) and GraphQL (planned)  
- **Database**: PostgreSQL (Neon) with Prisma ORM  
- **Deployment**: Vercel  
- **Authentication**: NextAuth (planned)  
- **Payments**: Stripe (planned)  

---

## Features

### Implemented
- Dashboard (`/`) with KPIs:
  - Cash balance
  - Monthly burn rate
  - Runway
- Cashflow chart (Recharts)
- Transactions list (`/transactions`)
- CSV import (`/api/ingest`)
- Vercel deployment with Neon database
- Development seeding with Prisma

### In Progress
- Pagination and filters (date, category) for transactions
- UI/UX improvements (feedback, currency formatting, accessibility)

### Planned Roadmap
- [ ] GraphQL API (`/api/graphql`) with queries for KPIs and transactions  
- [ ] Multi-tenant authentication with NextAuth  
- [ ] Advanced KPIs: DSO, DPO, stock turnover  
- [ ] Landing page and pricing with Stripe integration  
- [ ] Tests and CI/CD with Vitest, ESLint, GitHub Actions  
- [ ] Performance and accessibility (Lighthouse ≥90)  
- [ ] (Optional) Java Spring Boot microservice for forecasting (`/forecast`)  

---

## Local Development

```bash
git clone https://github.com/<user>/cashdash
cd cashdash
pnpm install
cp .env.example .env   # configure DATABASE_URL
pnpm prisma migrate dev
pnpm dev




### Bonus Roadmap (Phases)

Phase 1 (MVP): Dashboard, Transactions, CSV Import

Phase 2: GraphQL API & BFF

Phase 3: Multi-tenant authentication

Phase 4: Performance, accessibility, CI/CD

Phase 5: Landing page, pricing, Stripe integration