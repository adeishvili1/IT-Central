<template>
  <div class="p-6 space-y-5">

    <!-- Tabs -->
    <div class="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
      <button v-for="tab in tabs" :key="tab.key"
        @click="activeTab = tab.key"
        :class="activeTab === tab.key
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0"
          class="inline-flex items-center justify-center min-w-5 h-5 rounded-full px-1.5 text-xs font-bold"
          :class="activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-gray-200 text-gray-600'"
        >{{ tab.count }}</span>
      </button>
    </div>

    <!-- List -->
    <div class="space-y-3">
      <div v-if="filtered.length === 0" class="card p-12 text-center">
        <p class="text-gray-400 text-sm">ამ სტატუსში მოთხოვნები არ არის</p>
      </div>

      <div v-for="req in filtered" :key="req.id" class="card p-5 hover:shadow-card-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
            :class="catBg[req.category]">
            {{ catEmoji[req.category] }}
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono text-gray-400">{{ req.number }}</span>
              <span class="badge text-[11px]" :class="statusColor[req.status]">{{ statusLabel[req.status] }}</span>
              <span class="badge text-[11px]" :class="priorityColor[req.priority]">{{ priorityLabel[req.priority] }}</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 mb-1">{{ req.title }}</h3>
            <p class="text-xs text-gray-500 line-clamp-1">{{ req.description }}</p>
            <div class="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>👤 {{ req.requester }}</span>
              <span>🏢 {{ req.region }}</span>
              <span>📅 {{ formatDate(req.createdAt) }}</span>
              <span v-if="req.deadline" class="text-orange-500">⏰ {{ formatDate(req.deadline) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <NuxtLink :to="`/requests/${req.id}`" class="btn-secondary text-xs px-3 py-2">
              ნახვა
            </NuxtLink>
            <template v-if="activeTab === 'pending'">
              <button @click="approve(req.id)" class="btn-primary text-xs px-3 py-2">
                დამტკიცება
              </button>
              <button @click="reject(req.id)" class="btn-danger text-xs px-3 py-2">
                უარყოფა
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { requests, updateStatus, statusLabel, statusColor, priorityLabel, priorityColor } = useRequests()

const activeTab = ref('pending')

const catEmoji: Record<string, string> = {
  hardware: '🖥️', software: '💿', access: '🔐', support: '🔧', other: '📋'
}
const catBg: Record<string, string> = {
  hardware: 'bg-blue-50', software: 'bg-purple-50', access: 'bg-green-50', support: 'bg-orange-50', other: 'bg-gray-100'
}

const tabs = computed(() => [
  { key: 'pending', label: 'განსახილველი', count: requests.value.filter(r => ['new','in_review','needs_clarification'].includes(r.status)).length },
  { key: 'approved', label: 'დამტკიცებული', count: requests.value.filter(r => r.status === 'approved' || r.status === 'delegated').length },
  { key: 'rejected', label: 'უარყოფილი / გაუქმ.', count: requests.value.filter(r => r.status === 'rejected' || r.status === 'cancelled').length }
])

const filtered = computed(() => {
  if (activeTab.value === 'pending') return requests.value.filter(r => ['new','in_review','needs_clarification'].includes(r.status))
  if (activeTab.value === 'approved') return requests.value.filter(r => r.status === 'approved' || r.status === 'delegated')
  if (activeTab.value === 'rejected') return requests.value.filter(r => r.status === 'rejected' || r.status === 'cancelled')
  return requests.value
})

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('ka-GE', { day: '2-digit', month: 'short', year: 'numeric' })

const approve = (id: number) => updateStatus(id, 'approved', 'განიხილა და დამტკიცდა.')
const reject = (id: number) => updateStatus(id, 'rejected', 'განიხილა და უარყოფილ იქნა.')
</script>
