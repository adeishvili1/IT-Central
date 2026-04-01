<template>
  <div class="p-6 space-y-5">

    <!-- Toolbar row 1 -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
      <div class="flex-1 relative">
        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="search" type="text" placeholder="ძიება სათაურით, ნომრით, მომთხოვნით..."
          class="form-input pl-10 w-full" />
      </div>
      <NuxtLink to="/requests/create" class="btn-primary flex-shrink-0">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        ახალი მოთხოვნა
      </NuxtLink>
    </div>

    <!-- Toolbar row 2: filters -->
    <div class="flex flex-wrap gap-2 items-center">
      <select v-model="filterStatus" class="form-select text-sm w-40">
        <option value="">ყველა სტატუსი</option>
        <option v-for="(label, key) in statusLabel" :key="key" :value="key">{{ label }}</option>
      </select>
      <select v-model="filterCategory" class="form-select text-sm w-36">
        <option value="">ყველა კატეგ.</option>
        <option v-for="(label, key) in categoryLabel" :key="key" :value="key">{{ label }}</option>
      </select>
      <select v-model="filterPriority" class="form-select text-sm w-36">
        <option value="">ყველა პრიორ.</option>
        <option v-for="(label, key) in priorityLabel" :key="key" :value="key">{{ label }}</option>
      </select>
      <select v-model="filterRegion" class="form-select text-sm w-36">
        <option value="">ყველა რეგიონი</option>
        <option v-for="r in uniqueRegions" :key="r">{{ r }}</option>
      </select>
      <select v-model="filterAssignee" class="form-select text-sm w-40">
        <option value="">ყველა პასუხისმ.</option>
        <option v-for="a in uniqueAssignees" :key="a">{{ a }}</option>
      </select>
      <select v-model="filterAuthor" class="form-select text-sm w-40">
        <option value="">ყველა ავტორი</option>
        <option v-for="a in uniqueAuthors" :key="a">{{ a }}</option>
      </select>
      <div class="flex items-center gap-1.5">
        <input v-model="dateFrom" type="date" class="form-input text-sm w-36" title="თარიღიდან" />
        <span class="text-gray-400 text-xs">—</span>
        <input v-model="dateTo" type="date" class="form-input text-sm w-36" title="თარიღამდე" />
      </div>
      <button v-if="hasActiveFilters" @click="clearFilters"
        class="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 px-2 py-2">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        ფილტრის გასუფთავება
      </button>
    </div>

    <!-- Count -->
    <p class="text-xs text-gray-500">
      ნაჩვენებია <span class="font-semibold text-gray-700">{{ filtered.length }}</span> მოთხოვნა
    </p>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/60">
              <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">№ / სათაური</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">კატეგ.</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">სტატუსი</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">პრიორ.</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">მომთხოვნი</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">რეგიონი</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">თარიღი</th>
              <th class="px-4 py-3" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="filtered.length === 0">
              <td colspan="8" class="text-center py-16 text-gray-400 text-sm">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  მოთხოვნები ვერ მოიძებნა
                </div>
              </td>
            </tr>
            <tr
              v-for="req in filtered"
              :key="req.id"
              class="hover:bg-gray-50/70 cursor-pointer transition-colors"
              @click="navigateTo(`/requests/${req.id}`)"
            >
              <td class="px-5 py-3.5">
                <p class="font-medium text-gray-900 leading-tight">{{ req.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5 font-mono">{{ req.number }}</p>
              </td>
              <td class="px-4 py-3.5">
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <span>{{ categoryEmoji[req.category] }}</span>
                  {{ categoryLabel[req.category] }}
                </span>
              </td>
              <td class="px-4 py-3.5">
                <span class="badge" :class="statusColor[req.status]">{{ statusLabel[req.status] }}</span>
              </td>
              <td class="px-4 py-3.5">
                <span class="badge" :class="priorityColor[req.priority]">{{ priorityLabel[req.priority] }}</span>
              </td>
              <td class="px-4 py-3.5 text-gray-600 whitespace-nowrap">{{ req.requester }}</td>
              <td class="px-4 py-3.5 text-gray-600 whitespace-nowrap">{{ req.region }}</td>
              <td class="px-4 py-3.5 text-gray-400 whitespace-nowrap text-xs">{{ formatDate(req.createdAt) }}</td>
              <td class="px-4 py-3.5">
                <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { requests, statusLabel, statusColor, priorityLabel, priorityColor, categoryLabel } = useRequests()
const { currentUser, permissions } = useAuth()

// support role sees only their own requests
const baseRequests = computed(() =>
  permissions.value.seeAllRequests
    ? requests.value
    : requests.value.filter(r => r.requester === `${currentUser.value.name} ${currentUser.value.surname}`)
)

const search = ref('')
const filterStatus = ref('')
const filterCategory = ref('')
const filterPriority = ref('')
const filterRegion = ref('')
const filterAssignee = ref('')
const filterAuthor = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const categoryEmoji: Record<string, string> = {
  hardware: '🖥️', software: '💿', access: '🔐', support: '🔧', other: '📋'
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('ka-GE', { day: '2-digit', month: 'short', year: 'numeric' })

const uniqueRegions = computed(() => [...new Set(requests.value.map(r => r.region))].sort())
const uniqueAssignees = computed(() => [...new Set(requests.value.map(r => r.assignee).filter(Boolean))] as string[])
const uniqueAuthors = computed(() => [...new Set(requests.value.map(r => r.requester))].sort())

const hasActiveFilters = computed(() =>
  !!(search.value || filterStatus.value || filterCategory.value || filterPriority.value ||
     filterRegion.value || filterAssignee.value || filterAuthor.value || dateFrom.value || dateTo.value)
)

const clearFilters = () => {
  search.value = ''
  filterStatus.value = ''
  filterCategory.value = ''
  filterPriority.value = ''
  filterRegion.value = ''
  filterAssignee.value = ''
  filterAuthor.value = ''
  dateFrom.value = ''
  dateTo.value = ''
}

const filtered = computed(() => {
  return baseRequests.value.filter(r => {
    const q = search.value.toLowerCase()
    if (q && !r.title.toLowerCase().includes(q) && !r.number.toLowerCase().includes(q) && !r.requester.toLowerCase().includes(q)) return false
    if (filterStatus.value && r.status !== filterStatus.value) return false
    if (filterCategory.value && r.category !== filterCategory.value) return false
    if (filterPriority.value && r.priority !== filterPriority.value) return false
    if (filterRegion.value && r.region !== filterRegion.value) return false
    if (filterAssignee.value && r.assignee !== filterAssignee.value) return false
    if (filterAuthor.value && r.requester !== filterAuthor.value) return false
    if (dateFrom.value && r.createdAt < dateFrom.value) return false
    if (dateTo.value && r.createdAt > dateTo.value + 'T23:59:59') return false
    return true
  })
})
</script>
