# 256d — Lightning to UPI Bridge: Frontend Documentation

## Overview

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · nuqs

This is a pixel-perfect React/Next.js rewrite of a FlutterFlow application. Every component maps 1:1 to a Flutter widget, preserving the exact layout, spacing, colours, and typography as defined in the Flutter source (`flutter_flow_theme.dart`, `shell_widget.dart`).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: font loading, CDN links, NuqsAdapter
│   ├── globals.css          # Design tokens (@theme), body styles
│   ├── shell.tsx            # Main Shell: Stack layout (NavBar overlay + panels)
│   └── page.tsx             # Entry point — renders <Shell> in <Suspense>
│
├── components/
│   ├── layout/
│   │   └── nav-bar.tsx      # Logo LEFT + Avatar/Login RIGHT — Stack overlay
│   │
│   ├── shell/
│   │   ├── left-panel-content.tsx      # Left 720px: hero + tier + actions + history
│   │   ├── hero-section.tsx            # "Instant Payments..." heading + ₹200.00 pill
│   │   ├── tier-card.tsx               # Tier 0 card with chevron + progress bar
│   │   ├── action-buttons.tsx          # Type UPI + Scan UPI QR cards + Learn more
│   │   ├── pending-payments.tsx        # Transaction row with hourglass/sent icons
│   │   ├── transaction-history-btn.tsx # Lock icon button
│   │   ├── right-panel.tsx             # Router: RightPanelEmpty | TypeUpiPanel
│   │   ├── right-panel-empty.tsx       # Scan QR instruction (desktop home state)
│   │   └── type-upi-panel.tsx          # UPI ID input flow panel
│   │
│   └── ui/
│       ├── action-card.tsx
│       ├── ff-button.tsx
│       ├── progress-bar.tsx
│       ├── status-badge.tsx
│       └── transaction-row.tsx
│
└── lib/
    └── utils.ts             # Utility helpers
```

---

## Why Inline Styles Instead of Tailwind CSS

> **TL;DR:** Tailwind CSS v4 under-specifies many design tokens needed for pixel-perfect Flutter parity. Inline styles guarantee exactness without build-time or specificity surprises.

### The Root Problem: Tailwind v4 Architecture Changed Everything

This project uses **Tailwind CSS v4** (`^4.x`) — a major architectural overhaul from v3. In v4:

- Configuration moved **entirely to CSS** via `@theme {}` blocks (no `tailwind.config.js`)
- The JIT compiler changed how arbitrary values (`text-[16px]`, `leading-[1.5]`) are scanned and emitted
- **Custom font variables** require explicit registration in `@theme` AND must be referenced via CSS variables (`var(--font-delight)`) rather than a font name shorthand
- Class specificity under Tailwind v4 + Next.js 16 can conflict with the CSS variable cascade in unexpected ways

### The Font Rendering Issue: Step by Step

1. **Loading:** The `delight` font was loaded via `next/font/local` and its CSS variable (`--font-delight`) exposed correctly
2. **Registration:** `@theme { --font-sans: var(--font-delight), ui-sans-serif; }` was in `globals.css`
3. **The bug:** Tailwind v4's `font-sans` utility class emits `font-family: var(--font-sans, ...)` — but this only works if *both* the `html` and `body` have the CSS variable in scope. When only `body` received the class, some rendered text elements picked up the system sans-serif instead of Delight
4. **The fix:** Apply `--font-delight` variable to the **`html` element** (not just `body`), AND set an explicit `font-family: var(--font-delight), ui-sans-serif` inline style on `body`

### The Icon Issue: Tailwind Has No Icon Class

Material Icons and Font Awesome work via CDN-loaded fonts + CSS class names (`material-symbols-rounded`, `fa-solid`). Tailwind has **zero knowledge** of these classes:

- You cannot use Tailwind classes to control icon size reliably when the icon is a ligature font (Material Symbols uses `font-size` to control display size)
- Tailwind's `text-[22px]` maps to `font-size: 22px` but Tailwind's PurgeCSS in v4 **strips unused arbitrary values** if it doesn't detect them in JSX at build time
- The solution: use `style={{ fontSize: 22 }}` directly — guaranteed, zero purge risk

### The Spacing Issue: Tailwind v4 Arbitrary Values Are Unreliable

In practice:
```tsx
// This MAY be purged or miscalculated in Tailwind v4 JIT:
<div className="px-[88px] pt-[112px]">

// This ALWAYS works exactly:
<div style={{ paddingLeft: 88, paddingTop: 112 }}>
```

Tailwind v4 changed property value scanning — arbitrary values require exact format matches to survive the JIT pass. When padding values like `88px` or `112px` (non-standard grid multiples) don't appear in the `tailwind.config.js` `safelist`, they risk being dropped.

**The resolution:** For pixel-perfect Flutter parity, all component-level spacing, sizing, and typography uses inline styles. Tailwind classes are retained only for responsive layout (panel visibility rules) where class-based media queries offer cleaner semantics.

---

## Font: Delight

A custom OTF font family with 9 weights (100–900) stored in `public/fonts/delight/`.

```typescript
// app/layout.tsx
const delight = localFont({
  src: [
    { path: '../../public/fonts/delight/delight-thin.otf', weight: '100' },
    // ... all 9 weights
    { path: '../../public/fonts/delight/delight-black.otf', weight: '900' },
  ],
  variable: '--font-delight',
  display: 'swap',
})
```

Applied on **`html` element** (not just body) to ensure the CSS variable is in scope for all descendants:
```tsx
<html lang="en" className={delight.variable}>
```

---

## Icons

Two icon systems used — matching the Flutter source exactly:

| Flutter Source | Web Implementation | CDN |
|---------------|-------------------|-----|
| `Icons.*_rounded` / Material | `<span class="material-symbols-rounded">name</span>` | Google Fonts CDN |
| `FaIcon(FontAwesomeIcons.*)` | `<i class="fa-solid fa-name" />` | Cloudflare CDN |

Both CDN links are in `app/layout.tsx <head>`.

---

## Responsive Layout

### Flutter → React Shell Mapping

Flutter's shell is a **`Stack`** with two children:
1. A scrollable `Row` (Left + Right panels)
2. A `NavBar` overlaid with `Align(topLeft)`

React equivalent:
```tsx
// Position-relative container (the Stack)
<div style={{ position: 'relative', maxWidth: 1440 }}>
  {/* Scrollable Row: panels side by side */}
  <LeftPanelContent />
  <div style={{ width: 24 }} />  {/* 24px gap */}
  <RightPanel />

  {/* NavBar Stack layer — absolute overlay */}
  <NavBar style={{ position: 'absolute', top: 0, left: 0, zIndex: 50 }} />
</div>
```

### Breakpoints

| Screen | Left Panel | Right Panel |
|--------|-----------|-------------|
| ≥ 1440px, home | 720px (visible) | 696px — **RightPanelEmpty** |
| ≥ 1440px, type_upi | 720px (visible) | 696px — TypeUpiPanel |
| < 1440px, home | full-width (visible) | hidden |
| < 1440px, type_upi | hidden | full-width |

---

## Navigation / State

Panel state is stored in the **URL** via `nuqs`:

```
/?panel=home      → shows left panel + RightPanelEmpty (desktop)
/?panel=type_upi  → shows left panel + TypeUpiPanel (desktop) / TypeUpiPanel only (mobile)
```

This ensures browser back/forward works, is shareable, and has zero client-side flash.

---

## Recommendations for Real-World Production Readiness

### 1. Migrate Design Tokens to a Single Source of Truth
Extract all FlutterFlow theme values into a `lib/design-tokens.ts`:
```typescript
export const tokens = {
  color: { primary: '#000000', secondaryText: '#626D7C', ... },
  fontSize: { displaySmall: 40, headlineSmall: 24, ... },
  borderRadius: { card: 16, pill: 1000, input: 8, ... },
} as const
```
Use these tokens in inline styles instead of magic strings.

### 2. Add Zustand for Global App State
Replace `FFAppState().pageState` with a Zustand store:
```typescript
// lib/stores/app-store.ts
const useAppStore = create<AppStore>((set) => ({
  panelState: 'home',
  setPanelState: (state) => set({ panelState: state }),
}))
```
Keep nuqs for URL-addressable state, Zustand for transient UI state.

### 3. Add TanStack Query for Data Fetching
Transaction history, user tier, limits — all should use `useQuery`:
```typescript
const { data: tierInfo, isLoading } = useQuery({
  queryKey: ['tier-info'],
  queryFn: () => fetch('/api/tier').then(r => r.json()),
})
```
Add skeleton loading states to `TierCard`, `PendingPayments`.

### 4. Add Zod Schemas for UPI ID Validation
```typescript
// lib/schemas/upi.ts
export const upiIdSchema = z.string()
  .regex(/^[\w.-]+@[\w]+$/, 'Invalid UPI ID format')
  .min(3).max(50)
```
Use `react-hook-form` + Zod in `TypeUpiPanel`.

### 5. Componentise the Icon System
Wrap icon rendering in typed components:
```typescript
// components/ui/material-icon.tsx
interface MaterialIconProps {
  name: string
  size?: number
  color?: string
  filled?: boolean
}
const MaterialIcon = ({ name, size = 24, color, filled = false }: MaterialIconProps) => (
  <span
    className="material-symbols-rounded"
    style={{ fontSize: size, color, fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
  >
    {name}
  </span>
)
```

### 6. Create a Storybook Component Library
Document each component in isolation with exact Flutter-equivalent specs as story descriptions.

### 7. Add E2E Tests with Playwright
Critical user flows to test:
- Desktop home: both panels are visible
- Clicking "Type in UPI ID": TypeUpiPanel appears in right panel
- Back button: returns to home state
- Mobile: only one panel visible at a time

### 8. Self-Host Fonts and Icons Instead of CDN
Replace the Google Fonts CDN for Material Symbols with a self-hosted variable font:
```bash
# Download the Material Symbols Rounded variable font
curl -o public/fonts/material-symbols-rounded.woff2 ...
```
This eliminates the CDN dependency and improves load time.

### 9. Consider CSS-in-JS or CSS Modules for Complex Components
For components with many style variants (like button states), consider CSS Modules over inline styles to get better DevTools experience and style composition:
```css
/* components/shell/type-upi-panel.module.css */
.continueBtn { ... }
.continueBtn:disabled { ... }
```

---

## Known Limitations / Future Work

- [ ] `TypeUpiPanel`: UPI ID validation not yet wired (`zod` schema needed)
- [ ] `PendingPayments`: Data is currently hardcoded, needs TanStack Query integration
- [ ] No error state or loading skeleton on any data-dependent component
- [ ] No accessibility audit done (WCAG 2.1 AA target)
- [ ] Icons loaded from CDN (should be self-hosted for production)
- [ ] No unit tests for any component
