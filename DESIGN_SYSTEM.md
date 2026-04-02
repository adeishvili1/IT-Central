# Design System Documentation

## Overview

This application uses a **Premium SaaS Design System** inspired by products like Stripe, Linear, and Notion. The system is built on Tailwind CSS and provides a consistent, professional interface with excellent dark mode support.

## Architecture

### 1. Tailwind Configuration (`tailwind.config.js`)

**Color Palette:**
- **Primary**: Modern blue (#3b82f6) - for primary actions and highlights
- **Slate**: Sophisticated grays (50-950) - for text, borders, backgrounds

**Spacing System:** 8px grid system
- `gap-xs`: 4px
- `gap-sm`: 8px
- `gap-md`: 12px
- `gap-lg`: 16px
- `gap-xl`: 24px
- `gap-2xl`: 32px

**Border Radius:**
- `xs`: 4px
- `sm`: 6px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `2xl`: 20px
- `3xl`: 24px

**Transitions:**
- `fast`: 150ms
- `base`: 200ms
- `slow`: 300ms

### 2. Design System Classes (`assets/css/main.css`)

#### Surface Layers
Control background colors and create visual hierarchy:
- `.surface-primary`: Main surfaces (white light, #0f0f0f dark)
- `.surface-secondary`: Secondary backgrounds (slate-50 light, #1a1a1a dark)
- `.surface-elevated`: Cards & elevated elements (#fff light, #1f1f1f dark)
- `.surface-overlay`: Modals with backdrop blur

#### Text Hierarchy
- `.text-primary`: Main text
- `.text-secondary`: Secondary content
- `.text-tertiary`: Tertiary content
- `.text-muted`: Disabled or muted content

#### Buttons
- `.btn-primary`: Primary action (blue with lift effect)
- `.btn-secondary`: Secondary action (slate)
- `.btn-ghost`: Text-only buttons
- `.btn-danger`: Destructive actions (red)

All buttons include:
- Smooth transitions
- Hover states with elevation
- Active states with scale effect
- Focus rings for accessibility
- Disabled state support

#### Cards
- `.card`: Base card with border and shadow
- `.card-hover`: Cards with lift effect on hover
- `.card-interactive`: Cards with background color change

#### Badges & Pills
Six color variants:
- `.badge-primary`: Blue
- `.badge-success`: Emerald
- `.badge-warning`: Amber
- `.badge-error`: Red
- `.badge-info`: Blue
- `.badge-neutral`: Slate

#### Icon System
**Sizes:**
- `.icon-wrapper-xs`: 20px (5x5 wrapper)
- `.icon-wrapper-sm`: 28px (7x7 wrapper)
- `.icon-wrapper-md`: 32px (8x8 wrapper)
- `.icon-wrapper-lg`: 40px (10x10 wrapper)

**Color Variants:**
- `.icon-primary`: Blue background & icon
- `.icon-success`: Emerald background & icon
- `.icon-warning`: Amber background & icon
- `.icon-error`: Red background & icon
- `.icon-muted`: Slate background & icon

### 3. Reusable Vue Components

#### StatCard
Display key metrics with icon and label.

```vue
<StatCard
  label="Total Requests"
  value="1,234"
  meta="All statuses"
  icon-color="primary"
  icon-size="md"
/>
```

**Props:**
- `label`: String - Card label
- `value`: String | Number - Main value
- `meta`: String - Subtitle/description
- `icon`: Component - Icon component
- `iconSize`: 'xs' | 'sm' | 'md' | 'lg' - Icon size
- `iconColor`: 'primary' | 'success' | 'warning' | 'error' | 'muted'

#### TicketItem
Display request/ticket in a card with metadata.

```vue
<TicketItem
  title="Hardware request for new employee"
  description="REQ-001234 · Tbilisi"
  badge="In Review"
  badge-type="info"
  date="2026-03-28"
  priority="High"
/>
```

**Props:**
- `title`: String - Ticket title
- `description`: String - Secondary description
- `icon`: Component - Optional icon
- `iconColor`: Color variant
- `badge`: String - Status badge text
- `badgeType`: Badge color variant
- `author`: String - Creator name
- `date`: Date | String - Creation date
- `priority`: 'Low' | 'Medium' | 'High' | 'Critical'

#### SectionCard
Container for form sections or content blocks.

```vue
<SectionCard title="Settings">
  <div>Card content here</div>

  <template #footer>
    <button class="btn-primary">Save</button>
  </template>
</SectionCard>
```

**Props:**
- `title`: String - Optional card title
- `contentClass`: String - Extra classes for content area

**Slots:**
- `default`: Main content
- `footer`: Optional footer section

#### ActivityList
Display timeline of activities/events.

```vue
<ActivityList
  :items="[
    { title: 'Request submitted', type: 'info', date: 'Mar 28' },
    { title: 'Approved', type: 'success', date: 'Mar 27' }
  ]"
/>
```

**Props:**
- `items`: ActivityItem[] - Array of activity items

**ActivityItem Structure:**
- `title`: String - Activity title
- `description`: String - Optional details
- `author`: String - Who did it
- `date`: Date | String - When
- `type`: 'info' | 'success' | 'warning' | 'error' - Timeline dot color
- `badge`: String - Optional badge

#### SidebarItem
Navigation link with active state indicator.

```vue
<SidebarItem
  to="/requests"
  label="Requests"
  icon="IconRequests"
  badge="5"
/>
```

**Props:**
- `to`: String - Link destination
- `label`: String - Display text
- `icon`: Component - Icon component
- `badge`: String | Number - Optional badge

## Dark Mode

The design system uses Tailwind's `class` strategy for dark mode:

```html
<!-- Light mode classes are default -->
<div class="bg-white dark:bg-[#1a1a1a]">
  <!-- Light: white, Dark: #1a1a1a -->
</div>
```

**Dark Mode Colors:**
- Background: `#0a0a0a`
- Cards: `#1a1a1a`
- Elevated: `#1f1f1f`
- Text primary: `text-slate-50`
- Text secondary: `text-slate-400`
- Borders: `border-slate-800`

## Usage Examples

### Dashboard with Stats
```vue
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
  <StatCard
    v-for="stat in stats"
    :key="stat.label"
    :label="stat.label"
    :value="stat.value"
    :meta="stat.meta"
  />
</div>
```

### Request List
```vue
<div class="space-y-3">
  <TicketItem
    v-for="req in requests"
    :key="req.id"
    :title="req.title"
    :description="req.description"
    :badge="req.status"
    :priority="req.priority"
  />
</div>
```

### Form Section
```vue
<SectionCard title="User Settings">
  <div>
    <label class="form-label">Name</label>
    <input type="text" class="form-input" />
  </div>

  <template #footer>
    <button class="btn-primary">Save Changes</button>
  </template>
</SectionCard>
```

## Best Practices

1. **Use 8px Grid:** All spacing should align to the 8px grid system
2. **Consistent Shadows:** Use predefined shadow classes instead of custom shadows
3. **Icon Sizing:** Use wrapper classes for consistent icon sizing (16px, 20px, 24px icons with wrappers)
4. **Color Intent:** Use color for semantic meaning (error=red, success=green, etc.)
5. **Dark Mode:** Always test components in both light and dark modes
6. **Transitions:** Use predefined transition durations for consistency
7. **Focus States:** Never remove focus rings; use them for accessibility

## Color Reference

### Status Colors
- `new`: Primary Blue (#3b82f6)
- `in_review`: Amber/Warning (#fbbf24)
- `approved`: Emerald/Success (#10b981)
- `rejected`: Red/Error (#ef4444)
- `in_progress`: Purple (#a855f7)
- `resolved`: Teal (#14b8a6)
- `cancelled`: Slate/Neutral (#64748b)

## Component Showcase

Visit `/components` page to see all components in action with live examples.

## Migration Guide

If migrating from old styles:

1. Replace hardcoded colors with Tailwind classes
2. Use `.card` instead of custom card styles
3. Replace button styles with `.btn-*` classes
4. Use `.badge` with type variants instead of custom badges
5. Use `.stat-card` for metrics displays
6. Replace custom icons with icon-wrapper system

## Customization

To customize the design system:

1. **Colors:** Modify `tailwind.config.js` color section
2. **Spacing:** Adjust spacing values in Tailwind config
3. **Component Styles:** Edit corresponding CSS classes in `main.css`
4. **Component Behavior:** Modify Vue components as needed

Remember to maintain consistency across the application when making changes.
