<template>
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">

    <!-- Top stat cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        v-for="card in statCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :meta="card.sub"
        :icon="card.icon"
        icon-size="md"
        :icon-color="card.iconColorType"
        :to="card.to"
      />
    </div>

    <!-- Middle row -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Recent requests -->
      <SectionCard title="ბოლო მოთხოვნები" class="xl:col-span-2">
        <div class="space-y-0">
          <div
            v-for="req in recentRequests"
            :key="req.id"
            @click="navigateTo(`/requests/${req.id}`)"
          >
            <TicketItem
              :title="req.title"
              :description="`${req.number} · ${req.region}`"
              :badge="statusLabel[req.status]"
              :badge-type="statusBadgeType[req.status]"
              :date="req.createdAt"
              :priority="req.priority"
            />
          </div>
        </div>

        <template #footer>
          <NuxtLink to="/requests" class="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            ყველა ნახე
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </NuxtLink>
        </template>
      </SectionCard>

      <!-- By status chart + quick actions -->
      <div class="flex flex-col gap-4">
        <!-- Status breakdown -->
        <SectionCard title="სტატუსის მიხედვით">
          <div class="space-y-2.5">
            <div v-for="s in statusBreakdown" :key="s.key" class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="s.dot" />
              <span class="text-xs text-secondary flex-1">{{ s.label }}</span>
              <div class="flex items-center gap-2">
                <div class="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="s.bar"
                    :style="{ width: stats.total ? (s.count / stats.total * 100) + '%' : '0%' }" />
                </div>
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 w-4 text-right">{{ s.count }}</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <!-- Quick actions -->
        <SectionCard title="სწრაფი მოქმედება">
          <div class="space-y-2">
            <NuxtLink to="/requests/create" class="btn-primary w-full justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              ახალი მოთხოვნა
            </NuxtLink>
            <NuxtLink to="/approvals" class="btn-secondary w-full justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              განხილვა პენდინგი
              <span class="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold dark:bg-primary-900/30 dark:text-primary-400">{{ stats.in_review }}</span>
            </NuxtLink>
            <NuxtLink to="/reports" class="btn-secondary w-full justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ანგარიშები
            </NuxtLink>
          </div>
        </SectionCard>
      </div>
    </div>

    <!-- Category & region row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- By category -->
      <SectionCard title="კატეგორიის მიხედვით">
        <div class="space-y-3">
          <div v-for="cat in categoryBreakdown" :key="cat.key" class="flex items-center gap-3">
            <div class="icon-wrapper-sm flex items-center justify-center text-sm flex-shrink-0" :class="categoryBg[cat.key]">
              {{ categoryEmoji[cat.key] }}
            </div>
            <span class="text-sm text-secondary flex-1">{{ cat.label }}</span>
            <div class="flex items-center gap-2">
              <div class="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div class="h-full rounded-full bg-primary-500 transition-all"
                  :style="{ width: stats.total ? (cat.count / stats.total * 100) + '%' : '0%' }" />
              </div>
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 w-4 text-right">{{ cat.count }}</span>
            </div>
          </div>
        </div>
      </SectionCard>

      <!-- By region -->
      <SectionCard title="რეგიონის მიხედვით">
        <div class="space-y-3">
          <div v-for="reg in regionBreakdown" :key="reg.region" class="flex items-center gap-3">
            <div class="icon-wrapper-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm flex-shrink-0">🏢</div>
            <span class="text-sm text-secondary flex-1">{{ reg.region }}</span>
            <div class="flex items-center gap-2">
              <div class="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div class="h-full rounded-full bg-primary-500 transition-all"
                  :style="{ width: maxRegion ? (reg.count / maxRegion * 100) + '%' : '0%' }" />
              </div>
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 w-4 text-right">{{ reg.count }}</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

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

const statusBadgeType: Record<string, any> = {
  new: 'primary',
  in_review: 'info',
  in_progress: 'warning',
  approved: 'success',
  rejected: 'error',
  resolved: 'success',
  closed: 'neutral',
  cancelled: 'neutral',
  needs_clarification: 'warning',
  delegated: 'info'
}

const statCards = computed(() => [
  { label: 'სულ მოთხოვნა', value: stats.value.total, sub: 'ყველა სტატუსი', icon: resolveComponent('IconRequests'), iconColorType: 'primary', to: '/requests' },
  { label: 'ახალი', value: stats.value.new, sub: 'განსახილველი', icon: resolveComponent('IconRequests'), iconColorType: 'primary', to: '/requests?status=new' },
  { label: 'განხილვაში', value: stats.value.in_review, sub: 'მიმდინარე', icon: resolveComponent('IconApprovals'), iconColorType: 'warning', to: '/approvals' },
  { label: 'კრიტიკული', value: stats.value.critical, sub: 'გადაუდებელი', icon: resolveComponent('IconRequests'), iconColorType: 'error', to: '/requests?priority=critical' },
  { label: 'შესრულებული', value: stats.value.resolved, sub: 'დასრულებული', icon: resolveComponent('IconApprovals'), iconColorType: 'success', to: '/requests?status=resolved' }
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
