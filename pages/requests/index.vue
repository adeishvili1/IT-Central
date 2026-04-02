<template>
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-5 h-screen flex flex-col overflow-hidden bg-white dark:bg-[#0a0a0a]">
    <!-- Header -->
    <div class="flex-shrink-0 space-y-4">
      <!-- Title -->
      <div>
        <h1 class="text-2xl font-bold text-primary">მოთხოვნების კანბან დაფა</h1>
        <p class="text-sm text-secondary mt-1">IT მოთხოვნების მართვა და თვალყურის დევნება სხვადსხვა სტატუსებში</p>
      </div>

      <!-- Toolbar -->
      <div class="flex flex-col gap-3">
        <!-- Search + Create (row on mobile, separate on desktop) -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
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
              placeholder="ძიება..."
              class="form-input pl-10 w-full text-sm"
            />
          </div>

          <!-- Create button -->
          <NuxtLink to="/requests/create" class="btn-primary flex-shrink-0 whitespace-nowrap justify-center">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline">+ ახალი მოთხოვნა</span>
            <span class="sm:hidden">ახალი</span>
          </NuxtLink>
        </div>

        <!-- Filters (wrap on mobile) -->
        <div class="flex flex-wrap gap-2 items-center">
          <select v-model="filterCategory" class="form-select text-sm flex-1 min-w-[120px]">
            <option value="">კატეგორია</option>
            <option v-for="(label, key) in categoryLabel" :key="key" :value="key">{{ label }}</option>
          </select>
          <select v-model="filterPriority" class="form-select text-sm flex-1 min-w-[120px]">
            <option value="">პრიორიტეტი</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select v-model="filterRegion" class="form-select text-sm flex-1 min-w-[120px]">
            <option value="">რეგიონი</option>
            <option v-for="r in uniqueRegions" :key="r">{{ r }}</option>
          </select>
          <select v-model="filterAssignee" class="form-select text-sm flex-1 min-w-[120px]">
            <option value="">პასუხისმ.</option>
            <option v-for="a in uniqueAssignees" :key="a">{{ a }}</option>
          </select>

          <!-- Clear filters button -->
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1 px-2 py-2 flex-shrink-0"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="hidden sm:inline">გასუფთავება</span>
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex items-center gap-4 text-xs text-muted flex-wrap">
        <span>
          <span class="text-xs font-medium">სულ:</span>
          <span class="font-semibold text-primary ml-1">{{ filtered.length }}</span>
        </span>
        <span v-if="visibleColumns.length > 0">•</span>
        <span v-for="(col, idx) in visibleColumns" :key="col.key" class="flex items-center gap-1">
          <span
            class="inline-block w-2 h-2 rounded-full"
            :class="getStatusDotColor(col.key)"
          />
          {{ col.label }}: {{ getColumnCount(col.key) }}
        </span>
      </div>
    </div>

    <!-- Kanban Board (responsive layout) -->
    <!-- Mobile: Vertical stacked layout -->
    <div class="flex-1 min-h-0 overflow-y-auto lg:hidden">
      <div class="space-y-6 px-4 py-4 pb-4">
        <div v-for="column in visibleColumns" :key="column.key" class="space-y-3">
          <!-- Column Header -->
          <div class="flex items-center gap-3">
            <div
              class="w-2.5 h-2.5 rounded-full flex-shrink-0"
              :class="getStatusDotColor(column.key)"
            />
            <h3 class="text-sm font-semibold text-primary">{{ column.label }}</h3>
            <span class="inline-flex items-center justify-center min-w-5 h-5 rounded-full text-xs font-bold"
              :class="column.badgeClass">
              {{ getColumnCount(column.key) }}
            </span>
          </div>

          <!-- Cards Grid (single column on mobile) -->
          <div class="space-y-3">
            <KanbanCard
              v-for="item in getColumnItems(column.key)"
              :key="item.id"
              :request="item"
              @click="openModal(item)"
            />
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="visibleColumns.length === 0" class="flex flex-col items-center justify-center py-12">
          <svg class="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-400 text-sm">მოთხოვნები ნაპოვნი არ იქნა</p>
        </div>
      </div>
    </div>

    <!-- Desktop: Horizontal grid layout -->
    <div class="hidden lg:flex flex-col flex-1 min-h-0 overflow-y-auto">
      <div class="px-4 py-4 pb-4">
        <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${visibleColumns.length}, minmax(280px, 1fr))` }">
          <div v-for="column in visibleColumns" :key="column.key" class="flex flex-col gap-3 min-h-0">
            <!-- Column Header -->
            <div class="flex items-center gap-3 flex-shrink-0">
              <div
                class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                :class="getStatusDotColor(column.key)"
              />
              <h3 class="text-sm font-semibold text-primary">{{ column.label }}</h3>
              <span class="inline-flex items-center justify-center min-w-5 h-5 rounded-full text-xs font-bold"
                :class="column.badgeClass">
                {{ getColumnCount(column.key) }}
              </span>
            </div>

            <!-- Cards (scrollable column) -->
            <div class="space-y-3 flex-1 overflow-y-auto min-h-96">
              <KanbanCard
                v-for="item in getColumnItems(column.key)"
                :key="item.id"
                :request="item"
                @click="openModal(item)"
              />
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="visibleColumns.length === 0" class="flex flex-col items-center justify-center py-12">
          <svg class="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-400 text-sm">მოთხოვნები ნაპოვნი არ იქნა</p>
        </div>
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
    if (q && !r.title.toLowerCase().includes(q) && !r.number.toLowerCase().includes(q) && !r.requester.toLowerCase().includes(q)) return false
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
  { key: 'new', label: 'ახალი', badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { key: 'in_review', label: 'განხილვაში', badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { key: 'needs_clarification', label: 'დაზუსტება სჭირს', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { key: 'approved', label: 'დამტკიცებული', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { key: 'delegated', label: 'დელეგირებული', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { key: 'in_progress', label: 'მიმდინარე', badgeClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { key: 'resolved', label: 'შესრულებული', badgeClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
  { key: 'closed', label: 'დახურული', badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' }
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

// Only show columns that have items
const visibleColumns = computed(() => {
  return kanbanColumns.filter(col => getColumnCount(col.key) > 0)
})

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
</style>
