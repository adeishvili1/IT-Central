<template>
  <div class="p-6 space-y-6">

    <!-- Top stat cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      <div v-for="card in statCards" :key="card.label" class="stat-card">
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ card.label }}</span>
          <span class="w-8 h-8 rounded-lg flex items-center justify-center" :class="card.iconBg">
            <component :is="card.icon" class="w-4 h-4" :class="card.iconColor" />
          </span>
        </div>
        <p class="text-3xl font-bold tracking-tight" :class="card.valueColor">{{ card.value }}</p>
        <p class="text-xs text-gray-400">{{ card.sub }}</p>
      </div>
    </div>

    <!-- Middle row -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Recent requests -->
      <div class="card xl:col-span-2">
        <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
          <h3 class="text-sm font-semibold text-gray-800">ბოლო მოთხოვნები</h3>
          <NuxtLink to="/requests" class="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            ყველა
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </NuxtLink>
        </div>
        <div class="divide-y divide-gray-50">
          <div
            v-for="req in recentRequests"
            :key="req.id"
            class="flex items-center gap-4 px-5 py-3.5 hover:bg-blue-50/20 transition-colors cursor-pointer group"
            @click="navigateTo(`/requests/${req.id}`)"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="categoryBg[req.category]">
              <span class="text-xs">{{ categoryEmoji[req.category] }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 truncate group-hover:text-gray-900">{{ req.title }}</p>
              <p class="text-xs text-gray-400 mt-0.5 font-mono">{{ req.number }} · {{ req.region }} · {{ formatDate(req.createdAt) }}</p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="badge text-[11px]" :class="statusColor[req.status]">{{ statusLabel[req.status] }}</span>
              <span class="badge text-[11px]" :class="priorityColor[req.priority]">{{ priorityLabel[req.priority] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- By status chart + quick actions -->
      <div class="flex flex-col gap-4">
        <!-- Status breakdown -->
        <div class="card p-5">
          <h3 class="section-title">სტატუსის მიხედვით</h3>
          <div class="space-y-2.5">
            <div v-for="s in statusBreakdown" :key="s.key" class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="s.dot" />
              <span class="text-xs text-gray-600 flex-1">{{ s.label }}</span>
              <div class="flex items-center gap-2">
                <div class="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="s.bar"
                    :style="{ width: stats.total ? (s.count / stats.total * 100) + '%' : '0%' }" />
                </div>
                <span class="text-xs font-semibold text-gray-700 w-4 text-right">{{ s.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="card p-5">
          <h3 class="section-title">სწრაფი მოქმედება</h3>
          <div class="space-y-2">
            <NuxtLink to="/requests/create"
              class="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white bg-primary-700 hover:bg-primary-800 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              ახალი მოთხოვნა
            </NuxtLink>
            <NuxtLink to="/approvals"
              class="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              განხილვა პენდინგი
              <span class="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">{{ stats.in_review }}</span>
            </NuxtLink>
            <NuxtLink to="/reports"
              class="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ანგარიშები
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Category & region row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- By category -->
      <div class="card p-5">
        <h3 class="section-title">კატეგორიის მიხედვით</h3>
        <div class="space-y-3">
          <div v-for="cat in categoryBreakdown" :key="cat.key" class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" :class="categoryBg[cat.key]">
              {{ categoryEmoji[cat.key] }}
            </div>
            <span class="text-sm text-gray-600 flex-1">{{ cat.label }}</span>
            <div class="flex items-center gap-2">
              <div class="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full rounded-full bg-primary-500 transition-all"
                  :style="{ width: stats.total ? (cat.count / stats.total * 100) + '%' : '0%' }" />
              </div>
              <span class="text-xs font-semibold text-gray-700 w-4 text-right">{{ cat.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- By region -->
      <div class="card p-5">
        <h3 class="section-title">რეგიონის მიხედვით</h3>
        <div class="space-y-3">
          <div v-for="reg in regionBreakdown" :key="reg.region" class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">🏢</div>
            <span class="text-sm text-gray-600 flex-1">{{ reg.region }}</span>
            <div class="flex items-center gap-2">
              <div class="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full rounded-full bg-indigo-500 transition-all"
                  :style="{ width: maxRegion ? (reg.count / maxRegion * 100) + '%' : '0%' }" />
              </div>
              <span class="text-xs font-semibold text-gray-700 w-4 text-right">{{ reg.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { requests, stats, statusLabel, statusColor, priorityLabel, priorityColor, categoryLabel } = useRequests()

const recentRequests = computed(() => [...requests.value].slice(0, 6))

const formatDate = (d: string) => new Date(d).toLocaleDateString('ka-GE', { day: '2-digit', month: 'short' })

const categoryEmoji: Record<string, string> = {
  hardware: '🖥️', software: '💿', access: '🔐', support: '🔧', other: '📋'
}
const categoryBg: Record<string, string> = {
  hardware: 'bg-blue-50', software: 'bg-purple-50', access: 'bg-green-50', support: 'bg-orange-50', other: 'bg-gray-100'
}

const statCards = computed(() => [
  { label: 'სულ მოთხოვნა', value: stats.value.total, sub: 'ყველა სტატუსი', icon: resolveComponent('IconRequests'), iconBg: 'bg-blue-50', iconColor: 'text-blue-600', valueColor: 'text-gray-900' },
  { label: 'ახალი', value: stats.value.new, sub: 'განსახილველი', icon: resolveComponent('IconRequests'), iconBg: 'bg-blue-50', iconColor: 'text-blue-500', valueColor: 'text-blue-600' },
  { label: 'განხილვაში', value: stats.value.in_review, sub: 'მიმდინარე', icon: resolveComponent('IconApprovals'), iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', valueColor: 'text-yellow-600' },
  { label: 'კრიტიკული', value: stats.value.critical, sub: 'გადაუდებელი', icon: resolveComponent('IconRequests'), iconBg: 'bg-red-50', iconColor: 'text-red-500', valueColor: 'text-red-600' },
  { label: 'შესრულებული', value: stats.value.resolved, sub: 'დასრულებული', icon: resolveComponent('IconApprovals'), iconBg: 'bg-green-50', iconColor: 'text-green-600', valueColor: 'text-green-600' }
])

const statusBreakdown = computed(() => [
  { key: 'new', label: 'ახალი', count: stats.value.new, dot: 'bg-blue-500', bar: 'bg-blue-500' },
  { key: 'in_review', label: 'განხილვაში', count: stats.value.in_review, dot: 'bg-yellow-500', bar: 'bg-yellow-500' },
  { key: 'in_progress', label: 'მიმდინარე', count: stats.value.in_progress, dot: 'bg-purple-500', bar: 'bg-purple-500' },
  { key: 'approved', label: 'დამტკიცებული', count: stats.value.approved, dot: 'bg-green-500', bar: 'bg-green-500' },
  { key: 'rejected', label: 'უარყოფილი', count: stats.value.rejected, dot: 'bg-red-500', bar: 'bg-red-500' },
  { key: 'resolved', label: 'შესრულებული', count: stats.value.resolved, dot: 'bg-teal-500', bar: 'bg-teal-500' }
])

const categoryBreakdown = computed(() => {
  const cats = ['hardware', 'software', 'access', 'support', 'other']
  return cats.map(k => ({
    key: k,
    label: categoryLabel[k as keyof typeof categoryLabel],
    count: requests.value.filter(r => r.category === k).length
  })).filter(c => c.count > 0)
})

const regionBreakdown = computed(() => {
  const map: Record<string, number> = {}
  requests.value.forEach(r => { map[r.region] = (map[r.region] ?? 0) + 1 })
  return Object.entries(map).map(([region, count]) => ({ region, count })).sort((a, b) => b.count - a.count)
})

const maxRegion = computed(() => Math.max(...regionBreakdown.value.map(r => r.count), 1))
</script>
