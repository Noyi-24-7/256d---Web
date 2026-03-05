# MIGRATION MASTER PLAN
## Flutter → Next.js Architectural Migration
**Project:** 256d — Lightning to UPI Bridge  
**Source:** FlutterFlow (`256d---Flutter`)  
**Target:** Next.js 16, React 19 (`256d---Web`)

---

## 1. Design System & Theme

All values extracted from `lib/flutter_flow/flutter_flow_theme.dart`.

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `primaryText` | `#000000` | Body text, headings |
| `secondaryText` | `#626D7C` | Subtle labels, help text |
| `primaryBackground` | `#FFFFFF` | All panel backgrounds |
| `secondaryBackground` | `#F7F8FB` | Cards, tier box, Paste btn bg |
| `primary` | `#000000` | Primary CTAs (Scan UPI QR, Continue) |
| `coolGray50` | `#F7F8FB` | Paste button bg |
| `coolGray100` | `#E2E5EB` | Borders, disabled btn bg |
| `coolGray200` | `#C4C9D1` | Input enabled border |
| `coolGray300` | `#A3ABB8` | Lock icon, placeholder |
| `pending` | `#F38744` | Pending status text & icon |
| `bitcoin` | `#F7931A` | "Learn how it works" icon |

### Typography Scale (mapped from FlutterFlow theme)

| Flutter Style | Size (desktop) | Weight | Line-Height |
|--------------|---------------|--------|-------------|
| `displaySmall` | 40px | 600 | 1.24 |
| `headlineSmall` | 24px | 600 | 1.24 |
| `titleSmall` | 16px | 500 | 1.5 |
| `bodyLarge` | 16px | 400 | 1.5 |
| `bodyMedium` | 14px | 400 | 1.5 |
| `labelLarge` | 18px (desktop) / 16px (mobile) | 400 | 1.5 |
| `labelMedium` | 14px | 400 | 1.5 |

**Font:** `Delight` — custom OTF, loaded via `next/font/local`, CSS variable: `--font-delight`

### Border Radii

| Usage | Value |
|-------|-------|
| Full circle / pill buttons | `1000px` |
| Cards (tier, pending row) | `16px` |
| Action cards (Type UPI, Scan QR) | `24px` |
| Input field | `8px` |
| Avatar image | `8px` |
| Logo in NavBar | `1000px` (circle) |

---

## 2. Responsive Shell Architecture

### Flutter Source: Stack + Row
The shell uses a **Stack** with:
- **[0]**: An Expanded `Row` containing two `SingleChildScrollView` columns (Left 720px + Right 696px)
- **[1]**: An `Align(topLeft)` NavBar overlay that floats over the left panel

### React Mapping: position:relative + position:absolute

```
<div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto' }}>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <LeftPanelContent />   {/* 720px desktop */}
    <div style={{ width: 24 }} />  {/* gap */}
    <RightPanel />          {/* 696px desktop */}
  </div>
  <div style={{ position: 'absolute', top: 0, left: 0, width: 720, zIndex: 50 }}>
    <NavBar />
  </div>
</div>
```

### Breakpoints (from Flutter source `kBreakpointSmall/Medium/Large`)

| Flutter Constant | Value | Behavior |
|-----------------|-------|---------|
| `kBreakpointSmall` | 479px | Mobile portrait |
| `kBreakpointMedium` | 767px | Mobile landscape |
| `kBreakpointLarge` | 991px | Tablet |
| Desktop split | 1440px | Two-panel layout activates |

### Panel Visibility Matrix

| Viewport | Panel State | Left Panel | Right Panel |
|----------|------------|-----------|------------|
| ≥ 1440px | `home` | Visible (720px) | **Visible** — RightPanelEmpty (696px) |
| ≥ 1440px | `type_upi` | Visible (720px) | Visible — TypeUpiPanel (696px) |
| < 1440px | `home` | Visible (full) | **Hidden** |
| < 1440px | `type_upi` | **Hidden** | Visible (full) |

---

## 3. Directory & Component Mapping

```
Flutter Widget                          → React Component
─────────────────────────────────────────────────────────────────────
shell_widget.dart (NavBar Stack)        → components/layout/nav-bar.tsx [SC]
shell_widget.dart (LeftPanel content)   → components/shell/left-panel-content.tsx [SC]
shell_widget.dart (HeroSection)         → components/shell/hero-section.tsx [SC]
shell_widget.dart (TierCard)           → components/shell/tier-card-exact.tsx [SC]
shell_widget.dart (ActionButtons)       → components/shell/action-buttons-exact.tsx [CC]
shell_widget.dart (PendingPayments)     → components/shell/pending-payments-exact.tsx [SC]
shell_widget.dart (TransactionHistory)  → components/shell/transaction-history-btn-exact.tsx [SC]
shell_widget.dart (RightPanelEmpty)     → components/shell/right-panel-empty.tsx [SC]
shell_widget.dart (TypeUpiContainer)    → components/shell/type-upi-panel.tsx [CC]
```

`[SC]` = React Server Component (no client state needed)  
`[CC]` = Client Component (`'use client'` — needs onClick/useState)

---

## 4. Icon System

| Flutter Icon | Library | CSS Class / Component |
|--------------|---------|----------------------|
| `Icons.arrow_back` | Material Symbols Rounded | `<span class="material-symbols-rounded">arrow_back</span>` |
| `Icons.lock_outline` | Material Symbols Rounded | `<span class="material-symbols-rounded" style="font-variation-settings: 'FILL' 0">lock</span>` |
| `Icons.content_paste_outlined` | Material Symbols Rounded | `<span class="material-symbols-rounded">content_paste</span>` |
| `Icons.qr_code_scanner_outlined` | Material Symbols Rounded | `<span class="material-symbols-rounded">qr_code_scanner</span>` |
| `Icons.chevron_right_rounded` | Material Symbols Rounded | `<span class="material-symbols-rounded">chevron_right</span>` |
| `FaIcon(FontAwesomeIcons.solidQuestionCircle)` | Font Awesome 6 Free | `<i class="fa-solid fa-circle-question">` |
| `FaIcon(FontAwesomeIcons.hourglassStart)` | Font Awesome 6 Free | `<i class="fa-solid fa-hourglass-start">` |

CDN links added to `layout.tsx <head>`:
- Material Symbols Rounded: `fonts.googleapis.com/css2?family=Material+Symbols+Rounded`
- Font Awesome 6: `cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css`

---

## 5. Page State Navigation

Flutter uses `FFAppState().pageState` — a global string ('home', 'type_upi', etc.).  
React uses **nuqs** URL search params: `?panel=home`, `?panel=type_upi`

```typescript
// Reading
const [panel] = useQueryState('panel', { defaultValue: 'home' })

// Writing (no page reload)
const [, setPanel] = useQueryState('panel')
setPanel('type_upi')
```

---

## 6. Execution Batches (Completed)

### Batch 1 ✅ — Global Styles & Shell Layout
- `globals.css`: design tokens, body bg, font-family
- `layout.tsx`: font loading, CDN links
- `shell.tsx`: two-panel Stack architecture with responsive CSS

### Batch 2 ✅ — NavBar & Hero Section
- `nav-bar.tsx`: Logo ←→ Avatar+Login layout, exact shadow & padding
- `hero-section.tsx`: "Instant Payments..." heading, ₹200.00 limit, "You can still make 20 transactions" pill

### Batch 3 ✅ — Left Panel Content
- `tier-card-exact.tsx`: secondaryBackground card, chevron_right, progress bar
- `action-buttons-exact.tsx`: Type UPI (light) + Scan UPI QR (dark) cards, "Learn how it works" + Font Awesome circle-question
- `pending-payments-exact.tsx`: Transaction row with Sent icon, hourglass-start, amount, timestamp
- `transaction-history-btn-exact.tsx`: Lock icon, cool-gray border

### Batch 4 ✅ — Right Panel
- `right-panel-empty.tsx`: Scan_Icon + instruction text (240px top, 180px L/R)
- `type-upi-panel.tsx`: Back arrow, title, instruction, input field, Paste pill, Scan QR Instead, Continue button

---

## 7. Verification Rules

For each batch, run the browser tool at **1440×900** and compare against Flutter design PNGs:

| Check | Expected |
|-------|---------|
| NavBar | Logo 48×48 circle LEFT, Avatar 48×48 br:8 + "Login with Nostr" RIGHT |
| Hero | "Instant Payments from Bitcoin to UPI" (24px/w600) |
| Hero limit | "Your transaction limit is:" → "₹200.00" (40px/w600) → pill |
| TierCard | secondaryBackground, chevron, 4px progress bar at 50% |
| Action Cards | Light (Type UPI) + Dark (Scan QR), 24px radius, 48×48 icons |
| TypeUPI | 56px top padding, 160px gap, 343×45px Continue, 537px wide input |
| RightPanelEmpty | Visible on desktop home, 240px top, 180px L/R |
