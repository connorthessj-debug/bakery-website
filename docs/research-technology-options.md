

# Technology Options Research Report
**Project:** Bakery Website for "le besian balls"
**Prepared by:** Quinn, Research Analyst
**Date:** Research Phase — Planning Stage

---

## Executive Summary

After evaluating 15+ technology options across frontend, backend, CMS, e-commerce, and hosting categories, I recommend a **Next.js + Tailwind CSS + Snipcart + Sanity CMS** stack deployed on **Vercel**. This stack provides the best balance of performance, ease of content management for a non-technical bakery owner, and e-commerce capability — all at a low operational cost.

For clients with tighter budgets or simpler needs, I've also provided Budget and Premium tier alternatives.

---

## 1. Requirements Recap (Driving Technology Decisions)

Based on our prior requirements analysis, the technology must support:

| Requirement | Technology Implication |
|---|---|
| Product showcase with images | Fast image optimization, gallery components |
| Online ordering / e-commerce | Shopping cart, payment processing, order management |
| Menu / category browsing | Dynamic content, filtering, CMS-driven |
| Contact & location info | Google Maps integration, contact forms |
| Mobile-responsive design | Responsive framework, mobile-first approach |
| Client can update content | Headless CMS with intuitive dashboard |
| Fast load times | Static generation / CDN delivery (bakery = image-heavy) |
| SEO visibility (local bakery) | Server-side rendering, meta tags, structured data |
| Low ongoing maintenance cost | Managed hosting, minimal server management |

---

## 2. Technology Categories Evaluated

### 2A. Frontend Framework

| Option | Pros | Cons | Bakery Fit |
|---|---|---|---|
| **Next.js (React)** | SSG + SSR, image optimization built-in, huge ecosystem, Vercel deployment | Slightly steeper learning curve than plain HTML | ⭐⭐⭐⭐⭐ |
| **Astro** | Ultra-fast static sites, partial hydration, great for content sites | Smaller ecosystem, less e-commerce tooling | ⭐⭐⭐⭐ |
| **Gatsby (React)** | Great for static content sites, plugin ecosystem | Slow build times, declining community momentum, complex data layer | ⭐⭐⭐ |
| **Plain HTML/CSS/JS** | Simple, no build tools, cheap hosting | Hard to maintain, no CMS integration, poor scalability | ⭐⭐ |
| **WordPress (PHP)** | Massive ecosystem, client-familiar | Slow without optimization, security concerns, plugin bloat, hosting overhead | ⭐⭐⭐ |

**Verdict:** **Next.js** — Its built-in `<Image>` component is critical for a bakery site (which will be image-heavy with product photography). Static Site Generation (SSG) means pages load instantly from a CDN. The App Router provides excellent SEO out of the box.

**Source:** [Next.js Documentation](https://nextjs.org/docs) | [Web.dev Performance Guide](https://web.dev/performance/)

---

### 2B. Styling / UI Framework

| Option | Pros | Cons | Bakery Fit |
|---|---|---|---|
| **Tailwind CSS** | Utility-first, rapid prototyping, highly customizable, small bundle | Verbose class names, learning curve | ⭐⭐⭐⭐⭐ |
| **Shadcn/UI + Tailwind** | Pre-built accessible components, copy-paste (not dependency) | More suited to dashboards/apps | ⭐⭐⭐⭐ |
| **Bootstrap** | Well-known, quick setup | Generic look, harder to customize for brand identity | ⭐⭐⭐ |
| **Styled Components** | CSS-in-JS, scoped styles | Runtime overhead, less performant | ⭐⭐⭐ |

**Verdict:** **Tailwind CSS** — A bakery website needs strong brand identity (warm colors, custom typography, artisan feel). Tailwind makes it easy to create a fully custom design without fighting a framework's default look. Pair with a few **Shadcn/UI** components (modals, navigation) for accessibility.

**Source:** [Tailwind CSS Docs](https://tailwindcss.com/docs) | [Shadcn/UI](https://ui.shadcn.com/)

---

### 2C. Content Management System (CMS)

This is **critical** — the bakery owner needs to update menus, prices, product photos, and announcements without calling a developer.

| Option | Pros | Cons | Bakery Fit |
|---|---|---|---|
| **Sanity** | Real-time editing, customizable schemas, generous free tier (100K API calls/mo), image pipeline built-in | Requires initial schema setup | ⭐⭐⭐⭐⭐ |
| **Contentful** | Polished UI, good docs | Free tier limited (5 users, 25K records), pricing scales steeply | ⭐⭐⭐⭐ |
| **Strapi (self-hosted)** | Open source, full control, REST + GraphQL | Requires server hosting & maintenance, more DevOps | ⭐⭐⭐ |
| **WordPress (headless)** | Client may already know WP | Overkill as headless CMS, security surface, hosting cost | ⭐⭐⭐ |
| **Notion as CMS** | Ultra-simple for client | Fragile API, not designed for production CMS | ⭐⭐ |
| **Markdown/MDX files** | Simple, version controlled | Client can't edit without GitHub knowledge | ⭐⭐ |

**Verdict:** **Sanity** — The bakery owner gets a visual, intuitive dashboard called **Sanity Studio** (can even be embedded at `/admin` on the website itself). The built-in image pipeline handles cropping, resizing, and optimization automatically — perfect for product photos. The free tier is more than sufficient for a bakery.

**Bakery-specific rationale:** The owner can log in, add a new "Seasonal Special" pastry with photo and price, and it appears on the site within seconds. No developer needed. This is the #1 factor for long-term client satisfaction.

**Source:** [Sanity.io](https://www.sanity.io/) | [Sanity Free Plan Details](https://www.sanity.io/pricing)

---

### 2D. E-Commerce / Online Ordering

| Option | Pros | Cons | Bakery Fit |
|---|---|---|---|
| **Snipcart** | Drop-in cart, works with any frontend, handles payments/taxes/shipping, dashboard for orders | $20/mo minimum (or 2% transaction fee) | ⭐⭐⭐⭐⭐ |
| **Shopify Storefront API (headless)** | Robust e-commerce, handles everything | $39/mo minimum, complex integration, overkill for bakery | ⭐⭐⭐ |
| **Stripe Checkout** | Low fees (2.9% + 30¢), simple | Must build cart/inventory yourself, no order dashboard | ⭐⭐⭐⭐ |
| **Square Online** | Free tier, POS integration (if bakery has physical store) | Limited customization, separate from main site | ⭐⭐⭐ |
| **WooCommerce** | Full-featured, free plugin | Requires WordPress, heavy, slow | ⭐⭐ |
| **No e-commerce (order via form/phone)** | Simplest, no transaction fees | Poor UX, manual order processing | ⭐⭐⭐ |

**Verdict — Recommended:** **Snipcart** — It overlays onto any existing site with minimal code. The bakery owner gets an order management dashboard, email notifications, and customers get a smooth checkout. It supports pickup/delivery options which bakeries need.

**Verdict — Budget Alternative:** **Stripe Checkout** — If the client wants to minimize monthly costs, we build a simple cart and use Stripe Checkout sessions. Lower cost but more development time and no built-in order dashboard.

**Verdict — Simplest:** **Contact form / phone ordering** — If the client isn't ready for online ordering, we build a beautiful menu showcase with a "Call to Order" or inquiry form. E-commerce can be added later.

**Source:** [Snipcart](https://snipcart.com/) | [Stripe Checkout](https://stripe.com/payments/checkout)

---

### 2E. Hosting & Deployment

| Option | Pros | Cons | Bakery Fit |
|---|---|---|---|
| **Vercel** | Built for Next.js, free tier (100GB bandwidth), auto-deploy from GitHub, global CDN, analytics | Costs increase at scale (unlikely for bakery) | ⭐⭐⭐⭐⭐ |
| **Netlify** | Great free tier, form handling built-in, deploy previews | Slightly less optimized for Next.js than Vercel | ⭐⭐⭐⭐ |
| **AWS Amplify** | Scalable, AWS ecosystem | Complex setup, overkill | ⭐⭐⭐ |
| **Shared Hosting (GoDaddy, etc.)** | Cheap, familiar | Slow, no CI/CD, not suited for modern frameworks | ⭐⭐ |
| **DigitalOcean App Platform** | Good pricing, more control | More DevOps knowledge needed | ⭐⭐⭐ |

**Verdict:** **Vercel** — Zero-config deployment for Next.js. Push to GitHub → site is live. Free tier covers a bakery site comfortably. Automatic HTTPS, global CDN, and preview deployments for every pull request.

**Source:** [Vercel Pricing](https://vercel.com/pricing) | [Vercel + Next.js](https://vercel.com/solutions/nextjs)

---

### 2F. Additional Tools & Services

| Need | Recommended Tool | Cost | Notes |
|---|---|---|---|
| **Domain** | Namecheap or Cloudflare Registrar | ~$10-15/yr | Client may already own a domain |
| **Email contact form** | Resend or EmailJS | Free tier | Sends order inquiries to bakery email |
| **Maps** | Google Maps Embed or Mapbox | Free tier | Show bakery location |
| **Analytics** | Vercel Analytics or Plausible | Free / $9/mo | Privacy-friendly, simple |
| **Image storage** | Sanity CDN (included) | Free | Auto-optimized images |
| **SEO** | Next.js Metadata API + JSON-LD | Free | Local business structured data for Google |
| **Fonts** | Google Fonts (via `next/font`) | Free | Self-hosted for performance |

---

## 3. Recommended Stack Summary

### 🏆 RECOMMENDED (Best Balance)

| Layer | Technology | Monthly Cost |
|---|---|---|
| Frontend | Next.js 14 (App Router) | $0 |
| Styling | Tailwind CSS + Shadcn/UI | $0 |
| CMS | Sanity (Free tier) | $0 |
| E-commerce | Snipcart | 2% per transaction (or $20/mo min) |
| Hosting | Vercel (Free tier) | $0 |
| Domain | Namecheap | ~$1/mo |
| **Total** | | **~$1/mo + transaction fees** |

**Estimated development time:** 3-4 weeks
**Lighthouse score target:** 90+
**Client can self-manage:** ✅ Menu items, prices, photos, announcements

---

### 💰 BUDGET TIER (Simplest & Cheapest)

| Layer | Technology | Monthly Cost |
|---|---|---|
| Frontend | Astro or Next.js | $0 |
| Styling | Tailwind CSS | $0 |
| CMS | Markdown files (dev-managed) | $0 |
| E-commerce | Contact form only (no online ordering) | $0 |
| Hosting | Vercel or Netlify | $0 |
| **Total** | | **~$1/mo (domain only)** |

**Estimated development time:** 1-2 weeks
**Trade-off:** Client cannot update content without developer. No online ordering.

---

### 💎 PREMIUM TIER (Full E-Commerce)

| Layer | Technology | Monthly Cost |
|---|---|---|
| Frontend | Next.js 14 | $0 |
| Styling | Tailwind CSS + custom animations | $0 |
| CMS | Sanity (Pro if needed) | $0-99/mo |
| E-commerce | Shopify Storefront API (headless) | $39/mo |
| Hosting | Vercel Pro | $20/mo |
| Extras | Loyalty program, email marketing (Mailchimp) | $0-20/mo |
| **Total** | | **~$60-140/mo** |

**Estimated development time:** 5-7 weeks
**Includes:** Full inventory management, customer accounts, order tracking, email campaigns.

---

## 4. Architecture Diagram (Recommended Stack)

```
┌─────────────────────────────────────────────┐
│                  VISITORS                     │
│            (Desktop & Mobile)                │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│              VERCEL (CDN)                    │
│         Global Edge Network                  │
│     ┌───────────────────────┐               │
│     │   Next.js Application │               │
│     │   - SSG Pages         │               │
│     │   - Image Optimization│               │
│     │   - API Routes        │               │
│     │   - Tailwind CSS      │               │
│     └───────┬───────┬───────┘               │
└─────────────┼───────┼───────────────────────┘
              │       │
       ┌──────┘       └──────┐
       ▼                     ▼
┌──────────────┐    ┌──────────────┐
│  Sanity CMS  │    │   Snipcart   │
│              │    │              │
│ - Products   │    │ - Cart       │
│ - Menu items │    │ - Checkout   │
│ - Blog posts │    │ - Payments   │
│ - Hours      │    │ - Orders     │
│ - Images     │    │              │
└──────┬───────┘    └──────────────┘
       │
       ▼
┌──────────────┐
│ Sanity Studio│  ← Bakery owner logs in here
│  (/admin)    │    to manage content
└──────────────┘
```

---

## 5. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Client finds CMS confusing | Medium | High | Provide video tutorial + written guide; Sanity Studio is among the most intuitive |
| Snipcart pricing changes | Low | Medium | Architecture allows swapping to Stripe Checkout with moderate effort |
| Image-heavy site loads slowly | Medium | High | Next.js `<Image>` + Sanity CDN auto-optimize; lazy loading; WebP format |
| Client wants features beyond scope | High | Medium | Define MVP clearly in project plan; phase 2 for advanced features |
| Vercel free tier limits hit | Very Low | Low | Bakery traffic unlikely to exceed 100GB/mo; upgrade is $20/mo |
| SEO doesn't rank locally | Medium | High | Implement local business JSON-LD schema, Google Business Profile, meta tags |

---

## 6. Key Implementation Notes

1. **Local SEO is critical for a bakery** — We must implement `LocalBusiness` JSON-LD structured data, optimize for "bakery near me" searches, and ensure Google Business Profile integration.

2. **Image optimization is non-negotiable** — Bakery sites live and die by food photography. Every image must be served in WebP, properly sized, and lazy-loaded. Next.js + Sanity handle this automatically.

3. **Mobile-first design** — Most bakery customers will find the site on their phone while searching for nearby bakeries. Design mobile-first, test on real devices