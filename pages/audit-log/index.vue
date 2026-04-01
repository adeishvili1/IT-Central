<template>
  <div class="p-6 space-y-5">

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-center">
      <div class="relative flex-1 min-w-48">
        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="search" type="text" placeholder="ძიება..." class="form-input pl-10 w-full" />
      </div>
      <select v-model="filterAction" class="form-select text-sm w-44">
        <option value="">ყველა მოქმედება</option>
        <option value="created">შექმნა</option>
        <option value="status_changed">სტატუსი შეიცვალა</option>
        <option value="comment">კომენტარი</option>
        <option value="assigned">მინიჭება</option>
        <option value="login">ავტ. შესვლა</option>
      </select>
      <select v-model="filterUser" class="form-select text-sm w-44">
        <option value="">ყველა მომხ.</option>
        <option v-for="u in uniqueUsers" :key="u">{{ u }}</option>
      </select>
    </div>

    <!-- Log table -->
    <div class="card overflow-hidden">
      <div class="divide-y divide-gray-100">
        <div v-if="filtered.length === 0" class="py-12 text-center text-sm text-gray-400">
          ჩანაწერები ვერ მოიძებნა
        </div>
        <div v-for="entry in filtered" :key="entry.id" class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            :style="{ background: avatarColor(entry.user) }">
            {{ entry.user[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-sm font-medium text-gray-800">{{ entry.user }}</span>
              <span class="badge text-[11px]" :class="actionBadge[entry.action]?.bg ?? 'bg-gray-100 text-gray-600'">
                {{ actionLabel[entry.action] ?? entry.action }}
              </span>
            </div>
            <p class="text-sm text-gray-600">{{ entry.description }}</p>
            <p v-if="entry.requestNumber" class="text-xs font-mono text-gray-400 mt-0.5">{{ entry.requestNumber }}</p>
          </div>
          <span class="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{{ fmtDateTime(entry.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const search = ref('')
const filterAction = ref('')
const filterUser = ref('')

const actionLabel: Record<string, string> = {
  created: 'შექმნა',
  status_changed: 'სტ. ცვლილება',
  comment: 'კომენტარი',
  assigned: 'მინიჭება',
  login: 'შესვლა'
}

const actionBadge: Record<string, { bg: string }> = {
  created: { bg: 'bg-blue-100 text-blue-700' },
  status_changed: { bg: 'bg-yellow-100 text-yellow-700' },
  comment: { bg: 'bg-gray-100 text-gray-600' },
  assigned: { bg: 'bg-purple-100 text-purple-700' },
  login: { bg: 'bg-green-100 text-green-700' }
}

const logs = ref([
  { id: 1, user: 'გიორგი ბერიძე', action: 'login', description: 'სისტემაში ავტორიზაცია', requestNumber: '', createdAt: '2026-04-01T08:00:00' },
  { id: 2, user: 'ლაშა ბახტაძე', action: 'created', description: 'შეიქმნა ახალი მოთხოვნა: VPN წვდომის გახსნა', requestNumber: 'ITC-2026-0003', createdAt: '2026-03-31T08:45:00' },
  { id: 3, user: 'გიორგი ბერიძე', action: 'assigned', description: 'მოთხოვნა მიანიჭა: ვახო კვარაცხელია', requestNumber: 'ITC-2026-0004', createdAt: '2026-03-30T12:00:00' },
  { id: 4, user: 'ვახო კვარაცხელია', action: 'status_changed', description: 'სტატუსი: "ახალი" → "მიმდინარე"', requestNumber: 'ITC-2026-0004', createdAt: '2026-04-01T09:30:00' },
  { id: 5, user: 'ვახო კვარაცხელია', action: 'comment', description: 'კომენტარი დაემატა: "ვიმყოფები ადგილზე, ვამოწმებ."', requestNumber: 'ITC-2026-0004', createdAt: '2026-04-01T09:30:00' },
  { id: 6, user: 'თამარ ჯოხაძე', action: 'status_changed', description: 'სტატუსი: "განხილვაში" → "დამტკიცებული"', requestNumber: 'ITC-2026-0002', createdAt: '2026-03-27T10:15:00' },
  { id: 7, user: 'თამარ ჯოხაძე', action: 'comment', description: 'კომენტარი: "ლიცენზია გააქტიურდება 01.04.2026-ში"', requestNumber: 'ITC-2026-0002', createdAt: '2026-03-27T10:15:00' },
  { id: 8, user: 'ნინო კვარაცხელია', action: 'created', description: 'შეიქმნა ახალი მოთხოვნა: SSD მოთხოვნა — ქუთაისის ოფისი', requestNumber: 'ITC-2026-0001', createdAt: '2026-03-28T09:14:00' },
  { id: 9, user: 'გიორგი ბერიძე', action: 'status_changed', description: 'სტატუსი: "ახალი" → "განხილვაში"', requestNumber: 'ITC-2026-0001', createdAt: '2026-03-29T11:30:00' },
  { id: 10, user: 'გიორგი ბერიძე', action: 'login', description: 'სისტემაში ავტორიზაცია', requestNumber: '', createdAt: '2026-03-29T09:00:00' }
])

const uniqueUsers = computed(() => [...new Set(logs.value.map(l => l.user))])

const filtered = computed(() => logs.value.filter(l => {
  const q = search.value.toLowerCase()
  if (q && !l.user.toLowerCase().includes(q) && !l.description.toLowerCase().includes(q)) return false
  if (filterAction.value && l.action !== filterAction.value) return false
  if (filterUser.value && l.user !== filterUser.value) return false
  return true
}))

const fmtDateTime = (d: string) =>
  new Date(d).toLocaleString('ka-GE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

const avatarColor = (name: string) => {
  const colors = ['#1d4ed8','#7c3aed','#0891b2','#059669','#dc2626','#d97706']
  return colors[name.charCodeAt(0) % colors.length]
}
</script>
