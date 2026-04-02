<template>
  <div class="p-8 max-w-6xl mx-auto space-y-12">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-primary mb-2">Design System Components</h1>
      <p class="text-secondary">Reusable components built with the premium SaaS design system</p>
    </div>

    <!-- Stat Cards Section -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Stat Cards</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Requests"
          value="1,234"
          meta="All statuses"
          icon-color="primary"
        />
        <StatCard
          label="In Progress"
          value="45"
          meta="Current work"
          icon-color="warning"
        />
        <StatCard
          label="Completed"
          value="892"
          meta="This month"
          icon-color="success"
        />
        <StatCard
          label="Critical"
          value="12"
          meta="Needs attention"
          icon-color="error"
        />
      </div>
    </div>

    <!-- Ticket Items Section -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Ticket Items</h2>
      <div class="space-y-3">
        <TicketItem
          title="Hardware request for new employee"
          description="REQ-001234 · Tbilisi"
          badge="In Review"
          badge-type="info"
          date="2026-03-28"
          priority="High"
        />
        <TicketItem
          title="Software license renewal needed"
          description="REQ-001235 · Batumi"
          badge="New"
          badge-type="primary"
          date="2026-03-27"
          priority="Medium"
        />
        <TicketItem
          title="Access request for project archive"
          description="REQ-001236 · Kutaisi"
          badge="Resolved"
          badge-type="success"
          date="2026-03-26"
          priority="Low"
        />
      </div>
    </div>

    <!-- Section Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="General Settings">
        <div class="space-y-4">
          <div>
            <label class="form-label">Username</label>
            <input type="text" placeholder="Enter username" class="form-input" />
          </div>
          <div>
            <label class="form-label">Email</label>
            <input type="email" placeholder="Enter email" class="form-input" />
          </div>
        </div>

        <template #footer>
          <button class="btn-primary">Save Changes</button>
        </template>
      </SectionCard>

      <SectionCard title="Activity Summary">
        <ActivityList
          :items="[
            { title: 'Request submitted', description: 'Hardware request', type: 'info', date: 'Mar 28' },
            { title: 'Approved', description: 'By John Doe', type: 'success', date: 'Mar 27' },
            { title: 'In progress', description: 'Being processed', type: 'warning', date: 'Mar 26' }
          ]"
        />
      </SectionCard>
    </div>

    <!-- Badge Variants -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Badge Variants</h2>
      <div class="flex flex-wrap gap-3">
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-warning">Warning</span>
        <span class="badge badge-error">Error</span>
        <span class="badge badge-info">Info</span>
        <span class="badge badge-neutral">Neutral</span>
      </div>
    </div>

    <!-- Icon Wrappers -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Icon Wrappers</h2>
      <div class="flex flex-wrap gap-8">
        <div>
          <p class="text-sm font-medium text-secondary mb-3">Sizes</p>
          <div class="flex gap-3">
            <div class="icon-wrapper icon-wrapper-xs icon-primary">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="icon-wrapper icon-wrapper-sm icon-success">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="icon-wrapper icon-wrapper-md icon-warning">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="icon-wrapper icon-wrapper-lg icon-error">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
        </div>

        <div>
          <p class="text-sm font-medium text-secondary mb-3">Colors</p>
          <div class="flex gap-3">
            <div class="icon-wrapper icon-wrapper-md icon-primary">📊</div>
            <div class="icon-wrapper icon-wrapper-md icon-success">✓</div>
            <div class="icon-wrapper icon-wrapper-md icon-warning">⚠</div>
            <div class="icon-wrapper icon-wrapper-md icon-error">✕</div>
            <div class="icon-wrapper icon-wrapper-md icon-muted">○</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Button Variants -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Button Variants</h2>
      <div class="flex flex-wrap gap-3">
        <button class="btn-primary">Primary Button</button>
        <button class="btn-secondary">Secondary Button</button>
        <button class="btn-ghost">Ghost Button</button>
        <button class="btn-danger">Danger Button</button>
        <button class="btn-primary" disabled>Disabled Button</button>
      </div>
    </div>

    <!-- Form Elements -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Form Elements</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="form-label">Text Input</label>
          <input type="text" placeholder="Enter text..." class="form-input" />
          <p class="form-hint">This is a helpful hint message</p>
        </div>

        <div>
          <label class="form-label">Select Dropdown</label>
          <select class="form-select">
            <option>Choose an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="form-label">Textarea</label>
          <textarea class="form-textarea" placeholder="Enter your message..." rows="3"></textarea>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div>
      <h2 class="text-xl font-bold text-primary mb-4">Progress Indicators</h2>
      <div class="space-y-4">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-primary">Project Progress</span>
            <span class="text-sm text-secondary">75%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 75%"></div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-primary">Task Completion</span>
            <span class="text-sm text-secondary">45%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 45%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })
</script>
