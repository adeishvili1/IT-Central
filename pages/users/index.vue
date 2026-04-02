<template>
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-5">

    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-sm">
        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="search" type="text" placeholder="ძიება სახელით, ელ-ფოსტით..."
          class="form-input pl-10 w-full" />
      </div>
      <button @click="showAddModal = true" class="btn-primary">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        მომხმარებლის დამატება
      </button>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="user in filteredUsers" :key="user.id" class="card-hover p-5">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
            :style="{ background: avatarColor(user.name) }">
            {{ user.name[0] }}{{ user.surname[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 text-sm">{{ user.name }} {{ user.surname }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ user.email }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="badge text-[11px]" :class="roleBadge[user.role].bg">{{ roleBadge[user.role].label }}</span>
              <span class="badge text-[11px] bg-gray-100 text-gray-500">{{ user.region }}</span>
            </div>
          </div>
          <div :class="user.active ? 'bg-green-400' : 'bg-gray-300'" class="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" />
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>{{ user.department }}</span>
          <div class="flex items-center gap-2">
            <button class="hover:text-primary-600 transition-colors">რედაქტირება</button>
            <span>·</span>
            <button @click="toggleUser(user.id)"
              :class="user.active ? 'hover:text-red-500' : 'hover:text-green-600'"
              class="transition-colors">
              {{ user.active ? 'გათიშვა' : 'გააქტიურება' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add user modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showAddModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h3 class="text-base font-semibold text-gray-900">ახალი მომხმარებელი</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">სახელი</label>
                <input v-model="newUser.name" type="text" class="form-input" />
              </div>
              <div>
                <label class="form-label">გვარი</label>
                <input v-model="newUser.surname" type="text" class="form-input" />
              </div>
              <div class="col-span-2">
                <label class="form-label">ელ-ფოსტა</label>
                <input v-model="newUser.email" type="email" class="form-input" />
              </div>
              <div>
                <label class="form-label">როლი</label>
                <select v-model="newUser.role" class="form-select">
                  <option value="regional_it">რეგიონ. IT</option>
                  <option value="central_it">ცენტრ. IT</option>
                  <option value="manager">მენეჯერი</option>
                  <option value="admin">ადმინ</option>
                </select>
              </div>
              <div>
                <label class="form-label">რეგიონი</label>
                <select v-model="newUser.region" class="form-select">
                  <option v-for="r in regions" :key="r">{{ r }}</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="form-label">განყოფილება</label>
                <input v-model="newUser.department" type="text" class="form-input" />
              </div>
            </div>
            <div class="flex gap-3 justify-end pt-2">
              <button @click="showAddModal = false" class="btn-secondary">გაუქმება</button>
              <button @click="addUser" class="btn-primary">დამატება</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const regions = ['თბილისი','ქუთაისი','ბათუმი','რუსთავი','გორი','ზუგდიდი','ფოთი','თელავი']

const roleBadge: Record<string, { label: string; bg: string }> = {
  admin: { label: 'ადმინ', bg: 'bg-purple-100 text-purple-700' },
  central_it: { label: 'ცენტრ. IT', bg: 'bg-primary-100 text-primary-700' },
  regional_it: { label: 'რეგიონ. IT', bg: 'bg-blue-100 text-blue-600' },
  manager: { label: 'მენეჯერი', bg: 'bg-green-100 text-green-700' }
}

const users = ref([
  { id: 1, name: 'გიორგი', surname: 'ბერიძე', email: 'g.beridze@company.ge', role: 'admin', region: 'თბილისი', department: 'ცენტრალური IT', active: true },
  { id: 2, name: 'თამარ', surname: 'ჯოხაძე', email: 't.jokhadze@company.ge', role: 'central_it', region: 'თბილისი', department: 'ცენტრალური IT', active: true },
  { id: 3, name: 'ვახო', surname: 'კვარაცხელია', email: 'v.kvaratskhellia@company.ge', role: 'central_it', region: 'თბილისი', department: 'ცენტრალური IT', active: true },
  { id: 4, name: 'ნინო', surname: 'კვარაცხელია', email: 'n.kv@company.ge', role: 'regional_it', region: 'ქუთაისი', department: 'IT', active: true },
  { id: 5, name: 'დავით', surname: 'მაისურაძე', email: 'd.maisuradze@company.ge', role: 'regional_it', region: 'ბათუმი', department: 'IT', active: true },
  { id: 6, name: 'ეკა', surname: 'ჯავახიშვილი', email: 'e.javakhishvili@company.ge', role: 'regional_it', region: 'რუსთავი', department: 'ადმინ', active: false },
  { id: 7, name: 'ლაშა', surname: 'ბახტაძე', email: 'l.bakhtadze@company.ge', role: 'manager', region: 'თბილისი', department: 'ფინანსები', active: true }
])

let nextId = 8
const search = ref('')
const showAddModal = ref(false)
const newUser = reactive({ name: '', surname: '', email: '', role: 'regional_it', region: 'თბილისი', department: 'IT' })

const filteredUsers = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return users.value
  return users.value.filter(u =>
    `${u.name} ${u.surname} ${u.email}`.toLowerCase().includes(q)
  )
})

const avatarColor = (name: string) => {
  const colors = ['#1d4ed8','#7c3aed','#0891b2','#059669','#dc2626','#d97706']
  return colors[name.charCodeAt(0) % colors.length]
}

const toggleUser = (id: number) => {
  const u = users.value.find(u => u.id === id)
  if (u) u.active = !u.active
}

const addUser = () => {
  users.value.push({ ...newUser, id: nextId++, active: true })
  showAddModal.value = false
  Object.assign(newUser, { name: '', surname: '', email: '', role: 'regional_it', region: 'თბილისი', department: 'IT' })
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
