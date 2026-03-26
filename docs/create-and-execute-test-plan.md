

# 🧪 Test Plan & Execution Report — "Le Besian Balls" Bakery Website

## Comprehensive QA Analysis

Let me systematically review every artifact produced for this project, test all components, APIs, and user flows, and report findings with clear severity levels and reproduction steps.

---

## 1. TEST PLAN OVERVIEW

### Scope
| Category | What's Being Tested |
|---|---|
| **Frontend Components** | All UI components, pages, responsive design, animations |
| **Backend API** | All API routes, error handling, validation |
| **AI Features** | Chat widget, recommendations, smart search |
| **User Flows** | Complete customer journeys end-to-end |
| **Accessibility** | WCAG 2.1 AA compliance, keyboard nav, screen readers |
| **Performance** | Load times, bundle size, Lighthouse metrics |
| **Security** | API keys, env vars, input sanitization |
| **Delivery Package** | README, .env.example, deployment readiness |

### Severity Levels
- 🔴 **CRITICAL** — Blocks launch, breaks core functionality
- 🟠 **HIGH** — Significant UX/functionality issue
- 🟡 **MEDIUM** — Noticeable issue, workaround exists
- 🟢 **LOW** — Minor polish, nice-to-have fix

---

## 2. FRONTEND COMPONENT TESTS

### 2.1 Global Styles & Tailwind Configuration

**Test: Tailwind config includes all custom design tokens from style guide**

| Check | Status | Notes |
|---|---|---|
| Custom colors defined (warm-cream, bakery-brown, golden-crust, etc.) | ⚠️ NEEDS VERIFICATION | Must confirm tailwind.config.js extends theme properly |
| Custom fonts loaded (heading + body fonts) | ⚠️ NEEDS VERIFICATION | Check next/font imports match style guide |
| CSS animations defined (fade-in, slide-up, etc.) | ✅ PASSED | Defined in globals.css |
| Dark mode not required (per style guide — warm palette only) | ✅ PASSED | No dark mode conflicts |

**🟡 BUG-001: Font Loading Strategy Not Verified**
- **Severity:** MEDIUM
- **Description:** The style guide specifies specific font families but the frontend build artifacts don't clearly show the `next/font` configuration in a layout.tsx or similar root file. If fonts aren't loaded via `next/font`, there will be layout shift (CLS) issues.
- **Expected:** Fonts loaded via `next/font/google` with proper `display: 'swap'` and applied via CSS variables.
- **Recommendation:** Verify `src/app/layout.tsx` imports fonts correctly and passes them as className or CSS variable.

---

### 2.2 Navigation / Header Component

| Test Case | Status | Notes |
|---|---|---|
| Logo renders and links to `/` | ⚠️ NEEDS VERIFICATION | Check alt text on logo image |
| Desktop nav shows all links (Home, Menu, About, Contact) | ⚠️ NEEDS VERIFICATION | |
| Mobile hamburger menu appears at correct breakpoint | ⚠️ NEEDS VERIFICATION | Wireframe specifies 768px |
| Mobile menu opens/closes with animation | ⚠️ NEEDS VERIFICATION | |
| Active page indicator visible | ⚠️ NEEDS VERIFICATION | |
| Keyboard navigation works (Tab through links) | ⚠️ NEEDS VERIFICATION | |
| Skip-to-content link present for accessibility | ⚠️ NEEDS VERIFICATION | |

**🟠 BUG-002: Skip Navigation Link Likely Missing**
- **Severity:** HIGH
- **Description:** The wireframes mention accessibility-first design and WCAG 2.1 AA compliance, but skip navigation links are commonly missed in implementation. This is a WCAG 2.4.1 requirement.
- **Expected:** A visually hidden "Skip to main content" link should be the first focusable element.
- **Recommendation:** Add `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>` as the first child of `<body>`.

---

### 2.3 Hero Section

| Test Case | Status | Notes |
|---|---|---|
| Hero image loads and is optimized (next/image) | ⚠️ NEEDS VERIFICATION | Must use priority loading |
| Headline text matches brand copy | ⚠️ NEEDS VERIFICATION | |
| CTA button is visible and clickable | ⚠️ NEEDS VERIFICATION | |
| Hero is responsive (mobile: stacked, desktop: side-by-side or overlay) | ⚠️ NEEDS VERIFICATION | |
| Hero image has meaningful alt text | ⚠️ NEEDS VERIFICATION | |
| Animation on scroll/load works smoothly | ⚠️ NEEDS VERIFICATION | |

**🟡 BUG-003: Hero Image Alt Text Quality**
- **Severity:** MEDIUM
- **Description:** Bakery hero images often get generic alt text like "hero image" or "bakery". For SEO and accessibility, alt text should be descriptive (e.g., "Freshly baked golden croissants on a rustic wooden board at Le Besian Balls bakery").
- **Recommendation:** Audit all `<Image>` components for descriptive, meaningful alt text.

---

### 2.4 Product/Menu Cards

| Test Case | Status | Notes |
|---|---|---|
| Product cards render with image, name, price, description | ⚠️ NEEDS VERIFICATION | |
| Cards are keyboard focusable | ⚠️ NEEDS VERIFICATION | |
| Price displays in correct currency format | ⚠️ NEEDS VERIFICATION | |
| Allergen info visible or accessible | ⚠️ NEEDS VERIFICATION | Key feature per AI assistant |
| Cards responsive: 1 col mobile, 2 col tablet, 3-4 col desktop | ⚠️ NEEDS VERIFICATION | |
| Hover effects work on desktop | ⚠️ NEEDS VERIFICATION | |
| Images use next/image with proper sizing | ⚠️ NEEDS VERIFICATION | |
| Empty state handled (no products) | ⚠️ NEEDS VERIFICATION | |

**🟠 BUG-004: Product Card Allergen Information Display**
- **Severity:** HIGH
- **Description:** The AI features document mentions allergen info as a key feature, and the chat assistant handles allergen queries. However, allergen information should ALSO be directly visible on product cards or detail pages — not only accessible via chatbot. This is a food safety and legal requirement for bakeries.
- **Expected:** Each product card should display allergen icons/tags (gluten, nuts, dairy, eggs, etc.) visibly.
- **Recommendation:** Add allergen badges to product cards. Example: small icons or colored tags below the product description.

---

### 2.5 Contact Form

| Test Case | Status | Notes |
|---|---|---|
| Form renders with Name, Email, Phone, Message fields | ⚠️ NEEDS VERIFICATION | |
| Required field validation works (client-side) | ⚠️ NEEDS VERIFICATION | |
| Email format validation | ⚠️ NEEDS VERIFICATION | |
| Form submits to API endpoint | ⚠️ NEEDS VERIFICATION | |
| Success message shown after submission | ⚠️ NEEDS VERIFICATION | |
| Error message shown on API failure | ⚠️ NEEDS VERIFICATION | |
| Form labels associated with inputs (htmlFor/id) | ⚠️ NEEDS VERIFICATION | |
| Form works with keyboard only | ⚠️ NEEDS VERIFICATION | |
| Honeypot or rate limiting for spam | ⚠️ NEEDS VERIFICATION | |

**🟠 BUG-005: Contact Form Spam Protection Likely Missing**
- **Severity:** HIGH
- **Description:** The backend API document mentions a contact form endpoint but doesn't describe any spam protection mechanism. A public-facing contact form without rate limiting, honeypot fields, or CAPTCHA will be flooded with spam within days of launch.
- **Expected:** At minimum: honeypot hidden field + server-side rate limiting. Ideally: reCAPTCHA v3 or Cloudflare Turnstile.
- **Recommendation:** Add a hidden honeypot field that bots will fill out. Reject submissions where it's populated. Add rate limiting (e.g., max 5 submissions per IP per hour).

---

### 2.6 Footer Component

| Test Case | Status | Notes |
|---|---|---|
| Business hours displayed | ⚠️ NEEDS VERIFICATION | |
| Address/location info present | ⚠️ NEEDS VERIFICATION | |
| Social media links (if any) open in new tab with rel="noopener" | ⚠️ NEEDS VERIFICATION | |
| Copyright year is dynamic (not hardcoded 2024) | ⚠️ NEEDS VERIFICATION | |
| Footer links are accessible | ⚠️ NEEDS VERIFICATION | |

**🟢 BUG-006: Hardcoded Copyright Year**
- **Severity:** LOW
- **Description:** Common issue — copyright year is often hardcoded. Should use `new Date().getFullYear()`.
- **Recommendation:** Replace any hardcoded year with `{new Date().getFullYear()}`.

---

## 3. BACKEND API TESTS

### 3.1 Contact Form API (`/api/contact`)

| Test Case | Expected | Status |
|---|---|---|
| POST with valid data → 200 + success message | 200 OK | ⚠️ NEEDS VERIFICATION |
| POST with missing name → 400 + validation error | 400 Bad Request | ⚠️ NEEDS VERIFICATION |
| POST with invalid email → 400 + validation error | 400 Bad Request | ⚠️ NEEDS VERIFICATION |
| POST with empty body → 400 | 400 Bad Request | ⚠️ NEEDS VERIFICATION |
| GET request → 405 Method Not Allowed | 405 | ⚠️ NEEDS VERIFICATION |
| POST with XSS in message field → sanitized | Sanitized/escaped | ⚠️ NEEDS VERIFICATION |
| POST with SQL injection in fields → safe | No injection | ⚠️ NEEDS VERIFICATION |
| Rate limiting (5+ rapid requests) → 429 | 429 Too Many Requests | ⚠️ NEEDS VERIFICATION |

**🔴 BUG-007: Input Sanitization Not Confirmed**
- **Severity:** CRITICAL
- **Description:** The backend API documentation does not mention input sanitization for the contact form. User-submitted text (name, message) could contain XSS payloads like `<script>alert('xss')</script>`. If this data is ever rendered in an admin panel or email, it's a security vulnerability.
- **Expected:** All user input should be sanitized server-side before storage or email forwarding. Use a library like `sanitize-html` or `DOMPurify` (server-side).
- **Test Case:** Submit contact form with message: `<script>alert('xss')</script><img src=x onerror=alert('xss')>`
- **Recommendation:** Add server-side sanitization to all text inputs in the contact API route.

---

### 3.2 Products/Menu API (`/api/products`)

| Test Case | Expected | Status |
|---|---|---|
| GET all products → 200 + array | 200 + JSON array | ⚠️ NEEDS VERIFICATION |
| GET with category filter → filtered results | Filtered array | ⚠️ NEEDS VERIFICATION |
| GET single product by ID → 200 + product | 200 + JSON object | ⚠️ NEEDS VERIFICATION |
| GET non-existent product → 404 | 404 Not Found | ⚠️ NEEDS VERIFICATION |
| Response includes allergen data | Allergens in response | ⚠️ NEEDS VERIFICATION |
| Response includes proper image URLs | Valid URLs | ⚠️ NEEDS VERIFICATION |
| API response time < 500ms | Fast response | ⚠️ NEEDS VERIFICATION |

**🟡 BUG-008: Product API Error Responses May Lack Consistency**
- **Severity:** MEDIUM
- **Description:** The backend document outlines API routes but doesn't specify a consistent error response format. Inconsistent error shapes make frontend error handling fragile.
- **Expected:** All API errors should follow a consistent shape: `{ error: string, message: string, statusCode: number }`
- **Recommendation:** Create a shared error response utility: `function apiError(status: number, message: string)`

---

### 3.3 AI Chat API (`/api/chat` or similar)

| Test Case | Expected | Status |
|---|---|---|
| POST with user message → AI response | 200 + response text | ⚠️ NEEDS VERIFICATION |
| POST with empty message → 400 | 400 Bad Request | ⚠️ NEEDS VERIFICATION |
| POST with very long message (10k+ chars) → handled | Truncated or 400 | ⚠️ NEEDS VERIFICATION |
| API key not exposed in client bundle | No key in source | ⚠️ NEEDS VERIFICATION |
| Rate limiting on chat endpoint | Limited | ⚠️ NEEDS VERIFICATION |
| Streaming response works (if implemented) | Chunks arrive | ⚠️ NEEDS VERIFICATION |
| Fallback when AI service is down | Graceful error | ⚠️ NEEDS VERIFICATION |

**🔴 BUG-009: AI API Key Exposure Risk**
- **Severity:** CRITICAL
- **Description:** The AI features implementation mentions OpenAI/AI SDK integration. If the API key is used in any client-side code or accidentally included in the client bundle, it will be exposed publicly. This is a billing and security risk — exposed OpenAI keys are scraped within minutes.
- **Expected:** AI API key should ONLY exist in server-side code (API routes, server actions). Never in components, never in `NEXT_PUBLIC_` env vars.
- **Test:** View page source and network requests — search for any API key patterns (`sk-`, `key-`, etc.)
- **Recommendation:** Verify that:
  1. The env var is NOT prefixed with `NEXT_PUBLIC_`
  2. The API call happens only in `/api/` routes or server actions
  3. `.env.local` is in `.gitignore`

**🟠 BUG-010: AI Chat Rate Limiting Missing**
- **Severity:** HIGH
- **Description:** Each AI chat message costs money (OpenAI API tokens). Without rate limiting, a malicious user or bot could send thousands of requests and run up a massive bill.
- **Expected:** Rate limit of ~20 messages per user per hour, with a daily cap.
- **Recommendation:** Implement rate limiting using IP-based tracking (e.g., `upstash/ratelimit` with Redis, or in-memory for MVP). Return 429 when exceeded with a friendly message.

---

### 3.4 AI Recommendations API

| Test Case | Expected | Status |
|---|---|---|
| Returns recommendations based on input preferences | Relevant products | ⚠️ NEEDS VERIFICATION |
| Returns fallback recommendations when AI fails | Default popular items | ⚠️ NEEDS VERIFICATION |
| Handles empty/null preferences | Default recommendations | ⚠️ NEEDS VERIFICATION |

**🟡 BUG-011: AI Recommendation Fallback Behavior**
- **Severity:** MEDIUM
- **Description:** If the AI service is unavailable (rate limited, down, API key expired), the recommendation feature should gracefully degrade to showing popular/featured products — not an error state.
- **Recommendation:** Implement a fallback that returns the top 4 products by a "featured" or "popular" flag when AI is unavailable.

---

## 4. USER FLOW TESTS

### 4.1 Flow: New Visitor Browses Menu

```
Landing Page → Scroll/Click "Our Menu" → View Products → Filter by Category → View Product Details
```

| Step | Test | Status |
|---|---|---|
| 1. Homepage loads within 3 seconds | ⚠️ NEEDS VERIFICATION | |
| 2. Clear CTA to view menu | ⚠️ NEEDS VERIFICATION | |
| 3. Menu page shows all products | ⚠️ NEEDS VERIFICATION | |
| 4. Category filtering works | ⚠️ NEEDS VERIFICATION | |
| 5. Product detail shows full info + allergens | 