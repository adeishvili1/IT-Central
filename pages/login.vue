<template>
  <div class="w-full max-w-[380px]">

    <!-- Logo -->
    <div class="flex items-center gap-3 mb-10">
      <img src="/logo.png" alt="Logo" class="w-12 h-12 object-contain flex-shrink-0" />
      <div>
        <p class="text-base font-bold text-gray-900">IT Approval system</p>
        <p class="text-xs text-gray-400">მოთხოვნების მართვა</p>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">ავტორიზაცია</h1>
      <p class="text-sm text-gray-500">შეიყვანეთ თქვენი მონაცემები სისტემაში შესასვლელად</p>
    </div>

    <!-- Error -->
    <Transition name="slide-down">
      <div v-if="loginError" class="mb-4 flex items-center gap-2.5 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
        <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-red-600">{{ loginError }}</p>
      </div>
    </Transition>

    <!-- Form -->
    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label class="form-label">ელ-ფოსტა</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            v-model="email"
            type="email"
            placeholder="example@company.ge"
            class="form-input pl-10"
            autocomplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label class="form-label">პაროლი</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="შეიყვანეთ პაროლი"
            class="form-input pl-10 pr-10"
            autocomplete="current-password"
            required
          />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600">
            <svg v-if="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary w-full py-3 text-base">
        <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ loading ? 'შედის...' : 'ავტორიზაცია' }}
      </button>
    </form>

    <!-- Demo credentials hint -->
    <div class="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
      <p class="text-xs font-semibold text-gray-500 mb-2">სატესტო ანგარიშები:</p>
      <div v-for="u in demoUsers" :key="u.email"
        class="flex items-center justify-between gap-2 cursor-pointer hover:bg-white rounded-lg px-2 py-1.5 transition-colors group"
        @click="fillCredentials(u.email, u.password)">
        <div>
          <p class="text-xs font-medium text-gray-700">{{ u.email }}</p>
          <p class="text-[11px] text-gray-400">{{ u.password }} · <span :class="u.badgeColor">{{ u.roleLabel }}</span></p>
        </div>
        <svg class="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>

    <p class="mt-6 text-center text-xs text-gray-400">
      © {{ new Date().getFullYear() }} IT Central. ყველა უფლება დაცულია.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login, loginError } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const demoUsers = [
  { email: 'superadmin@company.ge', password: 'super123', roleLabel: 'სუპერ ადმინი', badgeColor: 'text-red-500 font-medium' },
  { email: 'admin@company.ge',      password: 'admin123', roleLabel: 'ადმინი',        badgeColor: 'text-purple-500 font-medium' },
  { email: 'support@company.ge',    password: 'support123', roleLabel: 'მხარდაჭერა',  badgeColor: 'text-blue-500 font-medium' }
]

const fillCredentials = (e: string, p: string) => {
  email.value = e
  password.value = p
}

const handleLogin = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 400))
  const ok = login(email.value, password.value)
  loading.value = false
  if (ok) router.push('/')
}
</script>

<style scoped>
.slide-down-enter-active { transition: all 0.2s ease; }
.slide-down-enter-from { opacity: 0; transform: translateY(-6px); }
</style>
