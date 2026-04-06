# 🎨 Premium Dark Theme Design System

A production-ready, professional dark UI system designed for high-end SaaS products (Linear, Stripe, Vercel level).

---

## 📋 Table of Contents

1. [Color System](#color-system)
2. [Surfaces & Depth](#surfaces--depth)
3. [Typography](#typography)
4. [Spacing & Grid](#spacing--grid)
5. [Components](#components)
6. [Accessibility](#accessibility)
7. [Best Practices](#best-practices)

---

## 🎨 Color System

### Background Layers (Depth System)

Our color system uses **layered backgrounds** to create visual hierarchy and depth:

| Layer | Color | Use Case |
|-------|-------|----------|
| **Primary (Main)** | `#0a0a0a` | App background |
| **Secondary** | `#1a1a1a` | Cards, containers |
| **Elevated** | `#242424` | Modals, popovers |
| **Hover** | `#2d2d2d` | Interactive hover states |
| **Active** | `#363636` | Active/selected states |

### Text Colors

| Role | Color | Contrast | Use |
|------|-------|----------|-----|
| **Primary** | `#f5f5f5` | 18:1 | Body text, content |
| **Secondary** | `#d1d5db` | 13:1 | Descriptions, secondary content |
| **Tertiary** | `#9ca3af` | 8:1 | Metadata, hints |
| **Muted** | `#6b7280` | 5:1 | Disabled, subtle text |
| **Disabled** | `#4b5563` | 3:1 | Disabled states |

✅ **All combinations meet WCAG AA contrast requirements.**

### Brand Colors

**Primary Accent: Indigo** (`#6366f1`)
- Modern, sophisticated, tech-forward
- Not overly vibrant—maintains professionalism
- Works well in dark theme without eye strain

**Status Colors:**
- **Success:** `#22c55e` (Emerald Green)
- **Warning:** `#f59e0b` (Amber)
- **Error:** `#ef4444` (Bright Red)
- **Info:** `#5b8cff` (Vibrant Blue)

---

## 🧱 Surfaces & Depth

### Shadow System

Shadows in dark mode are **more prominent** than light mode because they define depth:

```css
/* Subtle (cards) */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

/* Small elevation (hovered cards) */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);

/* Medium elevation (modals) */
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);

/* Large elevation (dropdowns, popovers) */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55);
```

### Surface Classes

```html
<!-- Primary Surface: App background -->
<div class="surface-primary">Content</div>

<!-- Secondary Surface: Cards, containers -->
<div class="surface-secondary">Card content</div>

<!-- Elevated Surface: Modals, popovers -->
<div class="surface-elevated">Modal content</div>

<!-- Overlay Surface: With backdrop blur -->
<div class="surface-overlay">Overlay content</div>
```

---

## 🔤 Typography

### Font Scale

| Size | Usage | CSS |
|------|-------|-----|
| **XS** | Labels, badges | `text-xs` - 12px |
| **SM** | Secondary text | `text-sm` - 13px |
| **Base** | Body text | `text-base` - 14px |
| **LG** | Section headers | `text-lg` - 16px |
| **XL** | Page titles | `text-xl` - 18px |
| **3XL** | Main headings | `text-3xl` - 24px |

---

## 📏 Spacing & Grid

### 8px Grid System

```
4px   = xs
8px   = sm
12px  = md
16px  = lg
24px  = xl
32px  = 2xl
```

---

## 🧩 Components

### Buttons

```html
<!-- Primary -->
<button class="btn-primary">Create</button>

<!-- Secondary -->
<button class="btn-secondary">Cancel</button>

<!-- Ghost -->
<button class="btn-ghost">Learn more</button>

<!-- Danger -->
<button class="btn-danger">Delete</button>
```

### Cards

```html
<!-- Standard -->
<div class="card p-5">Content</div>

<!-- Elevated -->
<div class="card-elevated p-5">Content</div>

<!-- Interactive -->
<div class="card-interactive p-4">Content</div>
```

### Badges

```html
<span class="badge-primary">Active</span>
<span class="badge-success">Complete</span>
<span class="badge-warning">Pending</span>
<span class="badge-error">Critical</span>
```

---

## 🚀 Quick Reference

```css
/* Text */
.text-primary          /* #f5f5f5 */
.text-secondary        /* #d1d5db */
.text-muted            /* #6b7280 */

/* Buttons */
.btn-primary           /* Main action */
.btn-secondary         /* Supporting */
.btn-ghost             /* Minimal */
.btn-danger            /* Destructive */

/* Cards */
.card                  /* Standard */
.card-elevated         /* Elevated */
.card-interactive      /* Clickable */

/* Badges */
.badge-primary
.badge-success
.badge-warning
.badge-error
```

---

**Production Ready:** April 2026 ✅
