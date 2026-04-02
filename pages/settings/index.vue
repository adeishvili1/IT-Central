<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">

    <!-- Tabs -->
    <div class="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
      <button v-for="tab in tabs" :key="tab"
        @click="activeTab = tab"
        :class="activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all">
        {{ tab }}
      </button>
    </div>

    <!-- General -->
    <div v-if="activeTab === 'ზოგადი'" class="card p-6 space-y-5">
      <h2 class="section-title">სისტემის პარამეტრები</h2>
      <div>
        <label class="form-label">სისტემის სახელი</label>
        <input v-model="settings.systemName" type="text" class="form-input" />
      </div>
      <div>
        <label class="form-label">ადმინ ელ-ფოსტა</label>
        <input v-model="settings.adminEmail" type="email" class="form-input" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="form-label">ნაგულისხმევი ენა</label>
          <select v-model="settings.language" class="form-select">
            <option value="ka">ქართული</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label class="form-label">ვადა (SLA) — კრიტ. (სთ.)</label>
          <input v-model.number="settings.slaCritical" type="number" class="form-input" min="1" />
        </div>
      </div>
      <div class="flex items-center justify-between py-3 border-t border-gray-100">
        <div>
          <p class="text-sm font-medium text-gray-800">ელ-ფოსტის შეტყობინებები</p>
          <p class="text-xs text-gray-500">სტატუსის ცვლილებისას გაგზავნა</p>
        </div>
        <button
          @click="settings.emailNotify = !settings.emailNotify"
          :class="settings.emailNotify ? 'bg-primary-600' : 'bg-gray-200'"
          class="relative w-11 h-6 rounded-full transition-colors">
          <span :class="settings.emailNotify ? 'translate-x-5' : 'translate-x-1'"
            class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block" />
        </button>
      </div>
      <div class="flex items-center justify-between py-3 border-t border-gray-100">
        <div>
          <p class="text-sm font-medium text-gray-800">ავტომატური მინიჭება</p>
          <p class="text-xs text-gray-500">მოთხოვნების Round Robin განაწილება</p>
        </div>
        <button
          @click="settings.autoAssign = !settings.autoAssign"
          :class="settings.autoAssign ? 'bg-primary-600' : 'bg-gray-200'"
          class="relative w-11 h-6 rounded-full transition-colors">
          <span :class="settings.autoAssign ? 'translate-x-5' : 'translate-x-1'"
            class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block" />
        </button>
      </div>
      <div class="flex justify-end">
        <button @click="saved = true; setTimeout(() => saved = false, 2000)" class="btn-primary">
          <svg v-if="saved" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {{ saved ? 'შენახულია!' : 'შენახვა' }}
        </button>
      </div>
    </div>

    <!-- Regions -->
    <div v-if="activeTab === 'რეგიონები'" class="card p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-gray-700">რეგიონები და ფილიალები</h2>
        <button @click="addRegion" class="btn-primary text-xs px-3 py-2">+ დამატება</button>
      </div>
      <div class="space-y-2">
        <div v-for="(r, i) in regions" :key="i" class="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200">
          <span class="text-gray-400 text-sm w-6">🏢</span>
          <input v-model="regions[i]" type="text" class="flex-1 text-sm text-gray-700 bg-transparent outline-none" />
          <button @click="regions.splice(i, 1)" class="text-gray-300 hover:text-red-400 transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- SLA -->
    <div v-if="activeTab === 'SLA'" class="card p-6 space-y-4">
      <h2 class="section-title">SLA პარამეტრები</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left py-2 text-xs text-gray-500">პრიორიტეტი</th>
              <th class="text-left py-2 text-xs text-gray-500">პასუხი (სთ.)</th>
              <th class="text-left py-2 text-xs text-gray-500">გადაწყვეტა (სთ.)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="row in slaRows" :key="row.key">
              <td class="py-3">
                <span class="badge text-xs" :class="row.badge">{{ row.label }}</span>
              </td>
              <td class="py-3 pr-4"><input v-model.number="row.response" type="number" min="1" class="form-input w-24 text-sm" /></td>
              <td class="py-3"><input v-model.number="row.resolve" type="number" min="1" class="form-input w-24 text-sm" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end">
        <button class="btn-primary">შენახვა</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const tabs = ['ზოგადი', 'რეგიონები', 'SLA']
const activeTab = ref('ზოგადი')
const saved = ref(false)

const settings = reactive({
  systemName: 'IT Central',
  adminEmail: 'it@company.ge',
  language: 'ka',
  slaCritical: 4,
  emailNotify: true,
  autoAssign: false
})

const regions = ref(['თბილისი','ქუთაისი','ბათუმი','რუსთავი','გორი','ზუგდიდი','ფოთი','თელავი','ოზურგეთი','ამბროლაური'])
const addRegion = () => regions.value.push('ახალი რეგიონი')

const slaRows = reactive([
  { key: 'critical', label: 'კრიტიკული', badge: 'bg-red-100 text-red-700', response: 2, resolve: 4 },
  { key: 'high', label: 'მაღალი', badge: 'bg-orange-100 text-orange-700', response: 4, resolve: 8 },
  { key: 'medium', label: 'საშუალო', badge: 'bg-blue-100 text-blue-700', response: 8, resolve: 24 },
  { key: 'low', label: 'დაბალი', badge: 'bg-gray-100 text-gray-600', response: 24, resolve: 72 }
])
</script>
