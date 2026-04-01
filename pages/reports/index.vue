<template>
  <div class="p-6 space-y-6">

    <!-- Filters -->
    <div class="card p-4 flex flex-wrap gap-3 items-center">
      <div>
        <label class="form-label text-xs">პერიოდი</label>
        <select v-model="period" class="form-select text-sm">
          <option value="week">ბოლო კვირა</option>
          <option value="month">ბოლო თვე</option>
          <option value="quarter">ბოლო კვარტალი</option>
          <option value="year">წელი</option>
        </select>
      </div>
      <div>
        <label class="form-label text-xs">კატეგორია</label>
        <select v-model="filterCat" class="form-select text-sm">
          <option value="">ყველა</option>
          <option value="hardware">აპარატურა</option>
          <option value="software">პროგრამული</option>
          <option value="access">წვდომა</option>
          <option value="support">ტექ. მხარდაჭერა</option>
        </select>
      </div>
      <div>
        <label class="form-label text-xs">რეგიონი</label>
        <select v-model="filterRegion" class="form-select text-sm">
          <option value="">ყველა</option>
          <option v-for="r in regions" :key="r">{{ r }}</option>
        </select>
      </div>
      <div class="ml-auto flex gap-2">
        <button class="btn-secondary text-xs">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Excel-ში ექსპორტი
        </button>
        <button class="btn-secondary text-xs">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          ბეჭდვა
        </button>
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="s in summary" :key="s.label" class="card p-5">
        <p class="text-xs text-gray-500 mb-2">{{ s.label }}</p>
        <p class="text-2xl font-bold" :class="s.color">{{ s.value }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ s.sub }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-800">მოთხოვნების სია</h3>
        <span class="text-xs text-gray-400">{{ filteredReqs.length }} ჩანაწერი</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/60">
              <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ნომერი</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">სათაური</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">კატ.</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">სტატ.</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">რეგ.</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">თარიღი</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ვადა</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="req in filteredReqs" :key="req.id" class="hover:bg-gray-50">
              <td class="px-5 py-3 font-mono text-xs text-gray-400">{{ req.number }}</td>
              <td class="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{{ req.title }}</td>
              <td class="px-4 py-3">
                <span class="text-xs text-gray-600">{{ catEmoji[req.category] }} {{ categoryLabel[req.category] }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="badge text-[11px]" :class="statusColor[req.status]">{{ statusLabel[req.status] }}</span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-600">{{ req.region }}</td>
              <td class="px-4 py-3 text-xs text-gray-400">{{ fmtDate(req.createdAt) }}</td>
              <td class="px-4 py-3 text-xs" :class="isOverdue(req) ? 'text-red-500 font-medium' : 'text-gray-400'">
                {{ req.deadline ? fmtDate(req.deadline) : '—' }}
                <span v-if="isOverdue(req)" class="ml-1">⚠️</span>
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

const { requests, statusLabel, statusColor, categoryLabel } = useRequests()

const period = ref('month')
const filterCat = ref('')
const filterRegion = ref('')

const regions = ['თბილისი','ქუთაისი','ბათუმი','რუსთავი','გორი','ზუგდიდი']
const catEmoji: Record<string, string> = { hardware: '🖥️', software: '💿', access: '🔐', support: '🔧', other: '📋' }

const filteredReqs = computed(() => requests.value.filter(r => {
  if (filterCat.value && r.category !== filterCat.value) return false
  if (filterRegion.value && r.region !== filterRegion.value) return false
  return true
}))

const fmtDate = (d: string) => new Date(d).toLocaleDateString('ka-GE', { day: '2-digit', month: 'short', year: 'numeric' })
const isOverdue = (r: any) => r.deadline && new Date(r.deadline) < new Date() && !['resolved','closed'].includes(r.status)

const summary = computed(() => [
  { label: 'სულ მოთხოვნა', value: filteredReqs.value.length, sub: 'შერჩეულ პერიოდში', color: 'text-gray-900' },
  { label: 'შესრულება', value: filteredReqs.value.filter(r => r.status === 'resolved').length, sub: 'დასრულებული', color: 'text-green-600' },
  { label: 'გადაჭარბება', value: filteredReqs.value.filter(r => isOverdue(r)).length, sub: 'ვადა გადაცილ.', color: 'text-red-600' },
  { label: 'მუშა პროცეს.', value: filteredReqs.value.filter(r => ['new','in_review','in_progress','approved'].includes(r.status)).length, sub: 'ღია მოთხ.', color: 'text-primary-600' }
])
</script>
