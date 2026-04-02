<template>
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">

    <!-- KPI cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="k in kpis" :key="k.label" class="stat-card">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ k.label }}</p>
        <p class="text-2xl font-bold tracking-tight" :class="k.color">{{ k.value }}</p>
        <div class="flex items-center gap-1">
          <span class="text-xs font-semibold" :class="k.trend > 0 ? 'text-green-600' : 'text-red-500'">
            {{ k.trend > 0 ? '▲' : '▼' }} {{ Math.abs(k.trend) }}%
          </span>
          <span class="text-xs text-gray-400">გასულ თვესთან</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <!-- Category distribution -->
      <div class="card p-4 sm:p-5">
        <h3 class="section-title mb-4">კატეგორიების განაწილება</h3>
        <div class="space-y-3">
          <div v-for="c in catDist" :key="c.key" class="flex flex-col gap-2">
            <div class="flex items-center gap-2 justify-between">
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <div class="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                  :class="c.bg">{{ c.emoji }}</div>
                <span class="text-xs sm:text-sm text-gray-600 truncate">{{ c.label }}</span>
              </div>
              <span class="text-xs font-semibold text-gray-700 flex-shrink-0">{{ c.count }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="c.barColor"
                  :style="{ width: c.pct + '%' }" />
              </div>
              <span class="text-xs text-gray-400 flex-shrink-0 w-10 text-right">{{ c.pct }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly trend (simple bars) -->
      <div class="card p-5">
        <h3 class="section-title">ყოველთვიური დინამიკა</h3>
        <div class="flex items-end gap-2 h-40">
          <div v-for="m in months" :key="m.label" class="flex flex-col items-center gap-1 flex-1">
            <span class="text-xs font-semibold text-gray-600">{{ m.total }}</span>
            <div class="w-full rounded-t-md transition-all"
              :style="{ height: (m.total / maxMonthVal * 120) + 'px', background: '#2563eb', opacity: m.label === 'მარ' ? '1' : '0.5' }" />
            <span class="text-[10px] text-gray-400">{{ m.label }}</span>
          </div>
        </div>
        <div class="flex gap-4 mt-3 justify-center">
          <span class="flex items-center gap-1 text-xs text-gray-500">
            <span class="w-3 h-3 rounded-sm bg-primary-600 inline-block" /> ყველა მოთხ.
          </span>
        </div>
      </div>

      <!-- Priority breakdown -->
      <div class="card p-5">
        <h3 class="section-title">პრიორიტეტის მიხედვით</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="p in priorityDist" :key="p.key"
            class="rounded-xl p-4 flex flex-col gap-1" :class="p.bg">
            <p class="text-2xl font-bold" :class="p.color">{{ p.count }}</p>
            <p class="text-xs font-medium" :class="p.color">{{ p.label }}</p>
            <p class="text-xs opacity-70" :class="p.color">{{ p.pct }}% სულ</p>
          </div>
        </div>
      </div>

      <!-- Top requesters -->
      <div class="card p-4 sm:p-5">
        <h3 class="section-title mb-4">ყველაზე აქტიური მომთხოვნები</h3>
        <div class="space-y-3">
          <div v-for="(r, i) in topRequesters" :key="r.name" class="flex flex-col gap-2">
            <div class="flex items-center gap-2 justify-between">
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  :class="i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'">
                  {{ i + 1 }}
                </span>
                <span class="text-xs sm:text-sm text-gray-700 truncate">{{ r.name }}</span>
              </div>
              <span class="text-xs font-semibold text-gray-700 flex-shrink-0">{{ r.count }}</span>
            </div>
            <div class="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div class="h-full rounded-full bg-primary-500 transition-all"
                :style="{ width: (r.count / topRequesters[0].count * 100) + '%' }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { requests } = useRequests()

const kpis = computed(() => [
  { label: 'საშ. შესრ. დრო', value: '2.3 დღ.', color: 'text-primary-700', trend: -8 },
  { label: 'SLA შეს. %', value: '87%', color: 'text-green-600', trend: 5 },
  { label: 'ღია მოთხოვნები', value: requests.value.filter(r => !['resolved','closed'].includes(r.status)).length, color: 'text-gray-900', trend: 12 },
  { label: 'კრიტიკული', value: requests.value.filter(r => r.priority === 'critical').length, color: 'text-red-600', trend: -20 }
])

const total = computed(() => requests.value.length || 1)

const catDist = computed(() => {
  const cats = [
    { key: 'hardware', label: 'აპარატურა', emoji: '🖥️', bg: 'bg-blue-50', barColor: 'bg-blue-500' },
    { key: 'software', label: 'პროგრამული', emoji: '💿', bg: 'bg-purple-50', barColor: 'bg-purple-500' },
    { key: 'access', label: 'წვდომა', emoji: '🔐', bg: 'bg-green-50', barColor: 'bg-green-500' },
    { key: 'support', label: 'ტექ. მხარდაჭ.', emoji: '🔧', bg: 'bg-orange-50', barColor: 'bg-orange-500' },
    { key: 'other', label: 'სხვა', emoji: '📋', bg: 'bg-gray-100', barColor: 'bg-gray-400' }
  ]
  return cats.map(c => ({
    ...c,
    count: requests.value.filter(r => r.category === c.key).length,
    pct: Math.round(requests.value.filter(r => r.category === c.key).length / total.value * 100)
  }))
})

const months = [
  { label: 'ოქტ', total: 3 },
  { label: 'ნოე', total: 5 },
  { label: 'დეკ', total: 4 },
  { label: 'იან', total: 7 },
  { label: 'თებ', total: 5 },
  { label: 'მარ', total: 6 }
]
const maxMonthVal = computed(() => Math.max(...months.map(m => m.total)))

const priorityDist = computed(() => [
  { key: 'critical', label: 'კრიტიკული', count: requests.value.filter(r => r.priority === 'critical').length, bg: 'bg-red-50', color: 'text-red-600', pct: Math.round(requests.value.filter(r => r.priority === 'critical').length / total.value * 100) },
  { key: 'high', label: 'მაღალი', count: requests.value.filter(r => r.priority === 'high').length, bg: 'bg-orange-50', color: 'text-orange-600', pct: Math.round(requests.value.filter(r => r.priority === 'high').length / total.value * 100) },
  { key: 'medium', label: 'საშუალო', count: requests.value.filter(r => r.priority === 'medium').length, bg: 'bg-blue-50', color: 'text-blue-600', pct: Math.round(requests.value.filter(r => r.priority === 'medium').length / total.value * 100) },
  { key: 'low', label: 'დაბალი', count: requests.value.filter(r => r.priority === 'low').length, bg: 'bg-gray-50', color: 'text-gray-600', pct: Math.round(requests.value.filter(r => r.priority === 'low').length / total.value * 100) }
])

const topRequesters = computed(() => {
  const map: Record<string, number> = {}
  requests.value.forEach(r => { map[r.requester] = (map[r.requester] ?? 0) + 1 })
  return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5)
})
</script>
