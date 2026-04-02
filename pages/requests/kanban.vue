<template>
  <div class="p-6 space-y-5 h-screen flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="flex-shrink-0 space-y-4">
      <!-- Title -->
      <div>
        <h1 class="text-2xl font-bold text-primary">Request Kanban Board</h1>
        <p class="text-sm text-secondary mt-1">Track requests across different statuses</p>
      </div>

      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <!-- Search -->
        <div class="flex-1 relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="Search requests..."
            class="form-input pl-10 w-full"
          />
        </div>

        <!-- Create button -->
        <NuxtLink to="/requests/create" class="btn-primary flex-shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Request
        </NuxtLink>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 items-center">
        <select v-model="filterCategory" class="form-select text-sm w-36">
          <option value="">All Categories</option>
          <option v-for="(label, key) in categoryLabel" :key="key" :value="key">{{ label }}</option>
        </select>
        <select v-model="filterPriority" class="form-select text-sm w-36">
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <select v-model="filterRegion" class="form-select text-sm w-40">
          <option value="">All Regions</option>
          <option v-for="r in uniqueRegions" :key="r">{{ r }}</option>
        </select>
        <select v-model="filterAssignee" class="form-select text-sm w-40">
          <option value="">All Assignees</option>
          <option v-for="a in uniqueAssignees" :key="a">{{ a }}</option>
        </select>

        <!-- Clear filters button -->
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1 px-2 py-2"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      </div>

      <!-- Stats -->
      <div class="flex items-center gap-4 text-xs text-muted">
        <span>Total: <span class="font-semibold text-primary">{{ filtered.length }}</span></span>
        <span>•</span>
        <span v-for="(col, idx) in kanbanColumns" :key="col.key" class="flex items-center gap-1">
          <span
            class="inline-block w-2 h-2 rounded-full"
            :class="getStatusDotColor(col.key)"
          />
          {{ getColumnCount(col.key) }}
        </span>
      </div>
    </div>

    <!-- Kanban Board (scrollable) -->
    <div class="flex-1 overflow-x-auto overflow-y-hidden">
      <div class="flex gap-5 pb-4 min-w-max">
        <!-- Columns -->
        <KanbanColumn
          v-for="column in kanbanColumns"
          :key="column.key"
          :status="column.key"
          :label="column.label"
          :items="getColumnItems(column.key)"
          :badge-class="column.badgeClass"
          @card-click="openModal"
        />
      </div>
    </div>

    <!-- Details Modal -->
    <RequestDetailsModal
      :is-open="modalOpen"
      :request="selectedRequest"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'default', middleware: 'auth' })

const { requests, statusLabel, categoryLabel, priorityLabel } = useRequests()
const { currentUser, permissions } = useAuth()

// Modal state
const modalOpen = ref(false)
const selectedRequest = ref<any>(null)

// Filter state
const search = ref('')
const filterCategory = ref('')
const filterPriority = ref('')
const filterRegion = ref('')
const filterAssignee = ref('')

// Base requests (respect permissions)
const baseRequests = computed(() =>
  permissions.value.seeAllRequests
    ? requests.value
    : requests.value.filter(r => r.requester === `${currentUser.value.name} ${currentUser.value.surname}`)
)

// Filtered requests
const filtered = computed(() => {
  return baseRequests.value.filter(r => {
    const q = search.value.toLowerCase()
    if (q && !r.title.toLowerCase().includes(q) && !r.number.toLowerCase().includes(q)) return false
    if (filterCategory.value && r.category !== filterCategory.value) return false
    if (filterPriority.value && r.priority !== filterPriority.value) return false
    if (filterRegion.value && r.region !== filterRegion.value) return false
    if (filterAssignee.value && r.assignee !== filterAssignee.value) return false
    return true
  })
})

// Active filters check
const hasActiveFilters = computed(() =>
  !!(search.value || filterCategory.value || filterPriority.value || filterRegion.value || filterAssignee.value)
)

// Clear filters
const clearFilters = () => {
  search.value = ''
  filterCategory.value = ''
  filterPriority.value = ''
  filterRegion.value = ''
  filterAssignee.value = ''
}

// Unique values for dropdowns
const uniqueRegions = computed(() => [...new Set(requests.value.map(r => r.region))].sort())
const uniqueAssignees = computed(() => [...new Set(requests.value.map(r => r.assignee).filter(Boolean))] as string[])

// Kanban columns
const kanbanColumns = [
  { key: 'new', label: 'New', badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { key: 'in_review', label: 'In Review', badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { key: 'needs_clarification', label: 'Waiting for Info', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { key: 'approved', label: 'Approved', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { key: 'delegated', label: 'Delegated', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { key: 'in_progress', label: 'In Progress', badgeClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { key: 'resolved', label: 'Completed', badgeClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
  { key: 'closed', label: 'Closed', badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' }
]

// Get items for a column
const getColumnItems = (status: string) => {
  return filtered.value
    .filter(r => r.status === status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get count for a column
const getColumnCount = (status: string) => {
  return getColumnItems(status).length
}

// Get status dot color
const getStatusDotColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-blue-500',
    in_review: 'bg-amber-500',
    needs_clarification: 'bg-orange-500',
    approved: 'bg-emerald-500',
    delegated: 'bg-purple-500',
    in_progress: 'bg-cyan-500',
    resolved: 'bg-teal-500',
    closed: 'bg-slate-500'
  }
  return colors[status] || 'bg-slate-300'
}

// Modal handlers
const openModal = (request: any) => {
  selectedRequest.value = request
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedRequest.value = null
}
</script>

<style scoped>
/* Smooth scrolling */
:deep(.overflow-x-auto) {
  scroll-behavior: smooth;
}

/* Hover effects */
:deep(.card-hover) {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.card-hover:hover) {
  transform: translateY(-2px);
}
</style>
