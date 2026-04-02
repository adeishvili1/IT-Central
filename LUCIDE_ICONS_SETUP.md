# Lucide Icons Integration

## Overview

Complete icon system integration using **lucide-vue-next** across the IT Central application. All icons are consistent, scalable, and optimized for the design system.

## Installation

```bash
npm install lucide-vue-next
```

## Icon System

### 1. **useLucideIcons Composable** (`composables/useLucideIcons.ts`)

Central location for all icon imports and configurations.

**Available Icon Groups:**
- `categoryIcons` - Hardware, Software, Access, Support, Other
- Utility icons - Check, Search, Plus, Menu, etc.
- Sizes - xs, sm, md, lg, xl
- Styles - default, hover, active

**Usage:**
```typescript
import { useLucideIcons } from '~/composables/useLucideIcons'

const { categoryIcons, Check, sizes, iconStyles } = useLucideIcons()
```

### 2. **CategoryIcon Component** (`components/CategoryIcon.vue`)

Reusable category icon wrapper with automatic styling.

**Features:**
- Automatic background color based on category
- Size variants (xs, sm, md, lg)
- Hover scale effect (110%)
- Dark mode support
- Stroke width: 2

**Usage:**
```vue
<CategoryIcon category="hardware" size="md" />
<CategoryIcon category="software" size="sm" />
```

**Categories:**
- `hardware` → Monitor icon (blue)
- `software` → Package icon (purple)
- `access` → Lock icon (green)
- `support` → Wrench icon (orange)
- `other` → ClipboardList icon (slate)

### 3. **Icon Usage in Components**

#### KanbanCard.vue
- **DragHandle2** - Drag handle (visible on hover)
- **MapPin** - Location with icon
- **Calendar** - Date with icon
- **CategoryIcon** - Category with auto-styling

#### RequestDetailsModal.vue
- **X** - Close button
- **Check** - Approve action
- **UserPlus** - Assign action
- **MoreHorizontal** - More options
- **MapPin** - Region
- **User** - Requester
- **Calendar** - Creation date
- **Clock** - Deadline
- **CategoryIcon** - Category display

#### Navigation & Other Components
- **Home** - Dashboard
- **FileText** - Requests
- **Users** - Users page
- **BarChart3** - Analytics
- **Settings** - Settings page
- **Moon/Sun** - Theme toggle
- **Bell** - Notifications
- **Menu** - Sidebar toggle
- **Search** - Search input
- **Plus** - Create action

## Icon Sizing Standards

```
xs → w-3.5 h-3.5 (14px)
sm → w-4.5 h-4.5 (18px)
md → w-5 h-5 (20px)       ← Default
lg → w-6 h-6 (24px)
xl → w-8 h-8 (32px)
```

## Icon Styling

### Default Stroke
All icons use `stroke-2` (stroke-width: 2) for consistency.

### Hover Effects
- **Scale**: `hover:scale-110` (10% increase)
- **Duration**: `transition-all duration-200`
- **Applied to**: Interactive icons and CategoryIcon

### Active State
- **Scale**: `scale-95` (5% decrease)
- **Used for**: Pressed buttons and active states

### Colors
Icons inherit text color from their context:
- Primary color: `text-primary`
- Secondary color: `text-secondary`
- Muted color: `text-muted`
- Status colors: `text-blue-600`, `text-emerald-600`, etc.

## Dark Mode

All icons automatically adapt to dark mode:
- Uses `dark:` Tailwind classes
- Maintains proper contrast ratios
- CategoryIcon has dedicated dark colors

## Best Practices

### 1. Use CategoryIcon Component
```vue
<!-- ✅ Good -->
<CategoryIcon category="hardware" size="md" />

<!-- ❌ Avoid -->
<Monitor class="w-6 h-6" />
```

### 2. Consistent Sizing
```vue
<!-- ✅ Good - Use predefined sizes -->
<MapPin class="w-4 h-4 stroke-2" />
<Calendar class="w-4 h-4 stroke-2" />

<!-- ❌ Avoid - Arbitrary sizes -->
<MapPin class="w-3 h-4" />
```

### 3. Stroke Width
```vue
<!-- ✅ Good - Use stroke-2 consistently -->
<Check class="w-5 h-5 stroke-2" />

<!-- ❌ Avoid - Inconsistent stroke -->
<Check class="w-5 h-5" />
```

### 4. Hover States
```vue
<!-- ✅ Good - Icon interactive class -->
<button class="flex items-center gap-2 hover:scale-110 transition-all">
  <Plus class="w-5 h-5 stroke-2" />
  Add
</button>

<!-- ✅ Good - Using CategoryIcon -->
<CategoryIcon category="access" size="sm" />
<!-- Hover built-in! -->
```

### 5. Grouping with Text
```vue
<!-- ✅ Good - Proper alignment -->
<div class="flex items-center gap-2">
  <MapPin class="w-4 h-4 stroke-2 flex-shrink-0" />
  <span>{{ location }}</span>
</div>

<!-- ❌ Avoid - Misaligned -->
<div>
  <MapPin class="w-4 h-4" />
  {{ location }}
</div>
```

## Icon Mapping Reference

| Icon | Component | Use Case | Color |
|------|-----------|----------|-------|
| Monitor | hardware | 🖥️ Hardware requests | Blue |
| Package | software | 💿 Software requests | Purple |
| Lock | access | 🔐 Access requests | Green |
| Wrench | support | 🔧 Support requests | Orange |
| ClipboardList | other | 📋 Other requests | Slate |
| Check | buttons | Approve action | Varies |
| UserPlus | buttons | Assign action | Varies |
| MapPin | metadata | Location info | Primary |
| Calendar | metadata | Date info | Primary |
| Clock | metadata | Time info | Primary |
| DragHandle2 | interaction | Drag indicator | Muted |

## Adding New Icons

1. **Import in composable:**
```typescript
import { NewIcon } from 'lucide-vue-next'

export const useLucideIcons = () => {
  return {
    // ... existing
    NewIcon
  }
}
```

2. **Use in component:**
```vue
import { NewIcon } from 'lucide-vue-next'

<NewIcon class="w-5 h-5 stroke-2" />
```

## Icons Not Included (Keep as SVG)

These remain as custom SVG for specific styling:
- Loading spinners (custom animations)
- Decorative graphics
- Complex multi-element icons

## Performance

- Icons are tree-shakeable (unused icons not bundled)
- Small file size (~1.5KB gzipped per icon)
- No additional DOM overhead
- CSS transitions GPU-accelerated

## Accessibility

- Icons are semantic when paired with text labels
- Use `aria-label` for icon-only buttons
- Proper contrast ratios in light and dark modes
- Focus states inherited from parent elements

## Troubleshooting

**Icons not showing:**
- Ensure `lucide-vue-next` is installed
- Check import path matches `useLucideIcons`
- Verify Tailwind classes include sizing (w-X h-X)

**Wrong colors:**
- Check parent element color classes
- Verify dark: variants in parent
- Ensure text color is set

**Stroke looks different:**
- Confirm using `stroke-2`
- Check for conflicting CSS
- Verify icon size matches usage

## References

- [Lucide Icons](https://lucide.dev/)
- [lucide-vue-next](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-vue-next)
- [Icon System](DESIGN_SYSTEM.md)

---

**Status**: ✅ Production Ready

All icons are properly integrated, tested, and ready for use across the application.
