# Component Quick Reference

## Components at a Glance

### StatCard
**File:** `components/StatCard.vue`

Display key metrics with optional icon.

```vue
<StatCard
  label="Active Users"
  value="2,456"
  meta="This month"
  icon-color="success"
/>
```

**Available Props:**
- `label` (string, required)
- `value` (string | number, required)
- `meta` (string, optional)
- `icon` (component, optional)
- `iconSize` ('xs' | 'sm' | 'md' | 'lg', default: 'md')
- `iconColor` ('primary' | 'success' | 'warning' | 'error' | 'muted', default: 'primary')

---

### TicketItem
**File:** `components/TicketItem.vue`

Display a request/ticket in a clickable card.

```vue
<TicketItem
  title="Install software license"
  description="REQ-0001 · Office A"
  badge="Approved"
  badge-type="success"
  date="2026-03-28"
  priority="High"
/>
```

**Available Props:**
- `title` (string, required)
- `description` (string, optional)
- `icon` (component, optional)
- `iconColor` (color variant, default: 'primary')
- `badge` (string, optional)
- `badgeType` ('primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral', default: 'neutral')
- `author` (string, optional)
- `date` (Date | string, optional)
- `priority` ('Low' | 'Medium' | 'High' | 'Critical', optional)

---

### SectionCard
**File:** `components/SectionCard.vue`

Container with optional title and footer.

```vue
<SectionCard title="Profile Settings">
  <div class="space-y-4">
    <div>
      <label class="form-label">Email</label>
      <input type="email" class="form-input" />
    </div>
  </div>

  <template #footer>
    <div class="flex gap-2">
      <button class="btn-primary">Save</button>
      <button class="btn-secondary">Cancel</button>
    </div>
  </template>
</SectionCard>
```

**Available Props:**
- `title` (string, optional)
- `contentClass` (string, optional) - Extra classes for content div

**Available Slots:**
- `default` - Main content
- `footer` - Footer section (optional)

---

### SidebarItem
**File:** `components/SidebarItem.vue`

Navigation link with automatic active state.

```vue
<SidebarItem
  to="/requests"
  label="Requests"
  icon="IconRequests"
  badge="12"
/>
```

**Available Props:**
- `to` (string, required) - Router link destination
- `label` (string, required)
- `icon` (component, optional)
- `badge` (string | number, optional)

---

### ActivityList
**File:** `components/ActivityList.vue`

Timeline of activities/events.

```vue
<ActivityList
  :items="[
    { title: 'Created', type: 'info', author: 'John', date: 'Mar 28' },
    { title: 'Approved', type: 'success', author: 'Jane', date: 'Mar 27' }
  ]"
/>
```

**Available Props:**
- `items` (ActivityItem[], required)

**ActivityItem Structure:**
```typescript
interface ActivityItem {
  title: string
  description?: string
  author?: string
  date?: Date | string
  type?: 'info' | 'success' | 'warning' | 'error' // Timeline dot color
  badge?: string // Optional badge
}
```

---

## Common Patterns

### Form with SectionCard
```vue
<SectionCard title="User Information">
  <div class="space-y-4">
    <div>
      <label class="form-label">Full Name</label>
      <input type="text" class="form-input" placeholder="Enter name" />
      <p class="form-hint">Your full name as it appears in documents</p>
    </div>
    <div>
      <label class="form-label">Role</label>
      <select class="form-select">
        <option>Select role</option>
        <option>Admin</option>
        <option>User</option>
      </select>
    </div>
  </div>

  <template #footer>
    <button class="btn-primary">Update Profile</button>
  </template>
</SectionCard>
```

### Dashboard Stats
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard label="Total" value="1,234" meta="All time" icon-color="primary" />
  <StatCard label="Today" value="45" meta="New requests" icon-color="warning" />
  <StatCard label="This Week" value="189" meta="Processed" icon-color="success" />
  <StatCard label="Pending" value="12" meta="Awaiting" icon-color="error" />
</div>
```

### Request List
```vue
<div class="space-y-3">
  <TicketItem
    v-for="request in requests"
    :key="request.id"
    :title="request.title"
    :description="`${request.number} · ${request.region}`"
    :badge="statusLabel[request.status]"
    :badge-type="statusBadgeType[request.status]"
    :date="request.createdAt"
    :priority="request.priority"
    @click="navigateTo(`/requests/${request.id}`)"
  />
</div>
```

---

## Class Reference

### Surface Classes
```vue
<div class="surface-primary">Main background</div>
<div class="surface-secondary">Secondary background</div>
<div class="surface-elevated">Elevated/card background</div>
<div class="surface-overlay">Modal overlay</div>
```

### Text Classes
```vue
<p class="text-primary">Main text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-tertiary">Tertiary text</p>
<p class="text-muted">Muted text</p>
```

### Button Classes
```vue
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-danger">Danger</button>
```

### Badge Classes
```vue
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-neutral">Neutral</span>
```

### Icon Wrapper Classes
```vue
<!-- Size variants -->
<div class="icon-wrapper icon-wrapper-xs">Icon</div> <!-- 20px -->
<div class="icon-wrapper icon-wrapper-sm">Icon</div> <!-- 28px -->
<div class="icon-wrapper icon-wrapper-md">Icon</div> <!-- 32px -->
<div class="icon-wrapper icon-wrapper-lg">Icon</div> <!-- 40px -->

<!-- Color variants -->
<div class="icon-wrapper icon-primary">Icon</div>
<div class="icon-wrapper icon-success">Icon</div>
<div class="icon-wrapper icon-warning">Icon</div>
<div class="icon-wrapper icon-error">Icon</div>
<div class="icon-wrapper icon-muted">Icon</div>
```

### Form Classes
```vue
<label class="form-label">Label text</label>
<input class="form-input" />
<select class="form-select"></select>
<textarea class="form-textarea"></textarea>
<p class="form-hint">Helper text</p>
```

### Card Classes
```vue
<div class="card">Basic card</div>
<div class="card-hover">Hoverable card</div>
<div class="card-interactive">Interactive card</div>
```

### Table Classes
```vue
<thead>
  <tr>
    <th class="table-header-cell">Header</th>
  </tr>
</thead>
<tbody>
  <tr class="table-row">
    <td class="table-cell">Cell</td>
    <td class="table-cell-muted">Muted cell</td>
  </tr>
</tbody>
```

---

## Dark Mode

All components automatically support dark mode. Test by toggling theme in header:

```vue
<!-- Light mode (default) -->
<div class="bg-white text-slate-900">Light mode</div>

<!-- Dark mode (when dark class on html) -->
<div class="dark:bg-slate-900 dark:text-slate-50">Dark mode</div>
```

---

## Demo Page

View all components in action:
- Navigate to `/components` page
- See live examples of each component
- Check responsive behavior
- Toggle dark/light theme

---

## Tips

1. **Always use components** for consistency
2. **Check the demo page** for usage patterns
3. **Use Tailwind spacing** (gap-xs through gap-2xl) for consistent spacing
4. **Test dark mode** for every new component
5. **Accessibility**: Use proper semantic HTML and test keyboard navigation
6. **Icons**: Store icon components in `components/Icon*.vue`
7. **Colors**: Use design system colors, not arbitrary colors
