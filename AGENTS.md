# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Moha Styling is a portfolio website for a professional food stylist. The site emphasizes cinematic, editorial design with fluid/wave motion effects and liquid glass aesthetics. The entire UI is in Korean.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack & Architecture

### Core
- **Next.js 15** with App Router (not Pages Router)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components built with Radix UI primitives

### Typography System
Three custom fonts are loaded in `app/layout.tsx`:
- **Playfair Display** (`--font-playfair`) - Latin serif for English headings
- **Noto Serif KR** (`--font-noto-serif`) - Korean serif (though variable name suggests KR, font family in Tailwind is `sans`)
- **Pretendard** (`--font-pretendard`) - Local Korean sans-serif font with 9 weights (100-900)

Font files are located in `public/fonts/` as `.otf` files.

### Color Strategy
Defined in `tailwind.config.ts`:
- Neutral base palette (50-950) for backgrounds
- Accent color: `#e07a5f` (terracotta) - NOT purple gradients
- CSS variables for shadcn/ui theming in `app/globals.css`

## Project Structure

### Pages (`app/`)
- `landing/page.tsx` - Entry page with ripple effect
- `home/page.tsx` - Hero carousel + intro section
- `portfolio/page.tsx` - Filterable portfolio grid with modal
- `about/page.tsx` - Profile and history
- `admin/login/page.tsx` - Admin authentication
- `admin/dashboard/page.tsx` - Portfolio CRUD interface

### API Routes (`app/api/`)
- `portfolio/route.ts` - Portfolio CRUD with Basic auth
- `upload/route.ts` - Image upload (MinIO integration pending)
- `contact/route.ts` - Contact form (email sending pending)

**Authentication**: All admin APIs use Basic auth with `ADMIN_ID:ADMIN_PASSWORD` from environment variables. In production, replace with proper JWT/session-based auth.

### Components (`components/`)
- `home/` - Hero carousel, intro section
- `portfolio/` - Category tabs, grid, modal
- `about/` - Profile card
- `admin/` - Login form
- `common/` - Contact button, modal
- `layout/` - Header, footer

### Types (`types/`)
- `portfolio.ts` - `PortfolioItem` interface with categories: `food | beauty | product | video`

## Key Design Principles

### Visual Identity (from `plan.md`)
1. **Fluid/Wave Motion** - Water-like distortion, ripple effects on hover/click
2. **Liquid Glass** - Frosted glass layers with `backdrop-filter: blur()`
3. **Expressive Typography** - No Inter/Roboto defaults; dramatic font scale
4. **Neutral base + Bold accents** - White/gray/black with `#e07a5f` accent
5. **High-Impact Motion** - Staggered reveals, Framer Motion transitions

### Ripple Effect Implementation
Uses `jquery.ripples` library on landing page:
- Mouse move → subtle ripple distortion
- Click → strong ripple expansion
- Client-side only (requires dynamic import in Next.js)

### What to Avoid
- Generic landing page layouts
- Inter, Roboto, or system fonts
- Purple gradient on white
- Boring flat UI
- Repetitive card layouts

## Environment Variables

Required in `.env.local` (see `.env.example`):
```bash
# MinIO (object storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...
MINIO_BUCKET=mohastyling
MINIO_USE_SSL=false

# Admin
ADMIN_ID=admin
ADMIN_PASSWORD=...

# Email (Resend)
RESEND_API_KEY=...
CONTACT_EMAIL=contact@mohastyling.com
```

## Pending Implementation

The following features are scaffolded but not fully implemented (marked with TODO in code):

1. **MinIO Upload** (`app/api/upload/route.ts`) - File uploads to object storage
2. **Email Sending** (`app/api/contact/route.ts`) - Contact form emails via Resend
3. **Database** - Portfolio data currently uses in-memory array in API route

## Utility Functions

`lib/utils.ts`:
- `cn()` - Merge clsx and tailwind-merge for conditional classes
- `formatDate()` - Format dates to Korean locale format

## Path Aliases

`@/*` is aliased to the project root (configured in `tsconfig.json`).
