<template>
  <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">

    <!-- Mobile overlay backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black/40 z-20 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-30',
        // Mobile: fixed overlay, slide in/out
        isMobile
          ? ['fixed inset-y-0 left-0 w-64', sidebarOpen ? 'translate-x-0' : '-translate-x-full']
          // Desktop: collapsible inline sidebar
          : [sidebarOpen ? 'w-60' : 'w-[68px]']
      ]"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 px-4 h-16 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
        <img src="/logo.png" alt="Logo" class="w-9 h-9 flex-shrink-0 object-contain" />
        <Transition name="fade">
          <div v-if="sidebarOpen" class="overflow-hidden">
            <p class="text-sm font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap leading-tight">IT Central</p>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">მოთხოვნების სისტემა</p>
          </div>
        </Transition>
      </NuxtLink>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        <template v-for="item in visibleNavItems" :key="item.to">
          <!-- Section label -->
          <p
            v-if="item.section && sidebarOpen"
            class="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400"
          >{{ item.section }}</p>
          <div v-else-if="item.section && !sidebarOpen" class="h-4" />

          <NuxtLink
            :to="item.to"
            class="nav-link"
            :class="isActive(item.to) ? 'nav-link-active' : 'nav-link-inactive'"
            @click="isMobile && (sidebarOpen = false)"
          >
            <!-- Active indicator -->
            <span
              v-if="isActive(item.to)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary-600"
            />
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <Transition name="fade">
              <span v-if="sidebarOpen" class="whitespace-nowrap">{{ item.label }}</span>
            </Transition>

            <!-- Tooltip when collapsed (desktop only) -->
            <div
              v-if="!sidebarOpen && !isMobile"
              class="absolute left-full ml-2.5 hidden group-hover:flex items-center bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap z-50 pointer-events-none shadow-lg"
            >
              {{ item.label }}
            </div>
          </NuxtLink>
        </template>
      </nav>

      <!-- Toggle button (desktop only) -->
      <div class="border-t border-gray-100 dark:border-gray-800 p-2 hidden lg:block">
        <button
          @click="sidebarOpen = !sidebarOpen; saveSidebarState()"
          class="w-full flex items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-[#262626] hover:text-gray-600 dark:hover:text-gray-400 transition-all"
        >
          <svg
            class="w-4 h-4 transition-transform"
            :class="sidebarOpen ? '' : 'rotate-180'"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <Transition name="fade">
            <span v-if="sidebarOpen">შეკეცვა</span>
          </Transition>
        </button>
      </div>

      <!-- Mobile close button -->
      <div class="border-t border-gray-100 dark:border-gray-800 p-2 lg:hidden">
        <button
          @click="sidebarOpen = false"
          class="w-full flex items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs text-gray-400 hover:bg-gray-50 dark:hover:bg-[#262626] transition-all"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>დახურვა</span>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="h-16 flex-shrink-0 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-20">
        <div class="flex items-center gap-3">
          <!-- Hamburger (mobile) / back-arrow hint -->
          <button
            @click="sidebarOpen = !sidebarOpen; isMobile && saveSidebarState()"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] transition-all lg:hidden"
            aria-label="მენიუ"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <!-- Page title -->
          <h2 class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-50 truncate max-w-[140px] sm:max-w-none">{{ pageTitle }}</h2>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">
          <!-- Theme toggle -->
          <button
            @click="toggleTheme"
            :title="isDark ? 'Light mode' : 'Dark mode'"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] transition-all"
          >
            <svg v-if="!isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- Notifications -->
          <div class="relative" ref="notificationsRef">
            <button
              @click="notificationsOpen = !notificationsOpen"
              class="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] hover:text-gray-700 dark:hover:text-gray-300 transition-all"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <!-- Notifications dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="notificationsOpen"
                class="absolute right-0 top-full mt-1 w-72 sm:w-80 bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-50"
              >
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p class="text-sm font-semibold text-gray-900 dark:text-gray-50">შეტყობინებები</p>
                </div>
                <div class="max-h-80 sm:max-h-96 overflow-y-auto">
                  <div v-if="notifications.length === 0" class="px-4 py-8 text-center">
                    <p class="text-sm text-gray-400 dark:text-gray-500">შეტყობინებები არ არის</p>
                  </div>
                  <div v-for="notif in notifications" :key="notif.id"
                    class="px-4 py-3 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer last:border-0"
                    @click="notificationsOpen = false"
                  >
                    <div class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" :class="notif.type === 'alert' ? 'bg-red-500' : notif.type === 'info' ? 'bg-blue-500' : 'bg-green-500'" />
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-50">{{ notif.title }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ notif.message }}</p>
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ notif.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-2 border-t border-gray-100 dark:border-gray-800 text-center">
                  <button class="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    ყველას ნახვა
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- User dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="flex items-center gap-1.5 sm:gap-2.5 rounded-xl px-2 sm:px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#262626] transition-all"
            >
              <div class="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {{ initials }}
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-50 leading-tight">{{ fullName }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 leading-tight">{{ currentUser.department }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="dropdownOpen"
                class="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-50"
              >
                <div class="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-50">{{ fullName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{{ currentUser.email }}</p>
                  <span class="badge text-[11px]" :class="roleBadgeColor[currentUser.role]">
                    {{ roleLabel[currentUser.role] }}
                  </span>
                </div>
                <NuxtLink to="/profile" @click="dropdownOpen=false" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  პროფილი
                </NuxtLink>
                <NuxtLink v-if="permissions.seeSettings" to="/settings" @click="dropdownOpen=false" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  პარამეტრები
                </NuxtLink>

                <div class="border-t border-gray-100 dark:border-gray-800 mt-1">
                  <button @click="handleLogout" class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-[#3d1f1f]">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    გამოსვლა
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Page slot -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, resolveComponent } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'DefaultLayout' })

const { currentUser, initials, fullName, logout, checkAuth, permissions, roleLabel, roleBadgeColor } = useAuth()
const { isDark, toggleTheme } = useTheme()
const route = useRoute()

const isMobile = ref(false)
const sidebarOpen = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const notificationsOpen = ref(false)
const notificationsRef = ref<HTMLElement | null>(null)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

const saveSidebarState = () => {
  localStorage.setItem('sidebarOpen', sidebarOpen.value.toString())
}

const loadSidebarState = () => {
  const saved = localStorage.getItem('sidebarOpen')
  if (saved !== null) {
    sidebarOpen.value = saved === 'true'
  }
}

const notifications = ref([
  { id: 1, type: 'alert', title: 'მოთხოვნა დაზუსტების საჭიროებაა', message: 'ITC-2026-0045 — საჭიროა დამატებითი ინფორმაცია', time: '2 წუთი წინ' },
  { id: 2, type: 'info', title: 'მოთხოვნა დამტკიცდა', message: 'ITC-2026-0044 — აპარატურის შეკვეთა დამტკიცდა', time: '1 საათი წინ' },
  { id: 3, type: 'success', title: 'მოთხოვნა შესრულებულია', message: 'ITC-2026-0043 — VPN წვდომა გახსნილია', time: '3 საათი წინ' },
  { id: 4, type: 'alert', title: 'დეკემბერი დეკემბერი', message: 'ITC-2026-0042 — ვადა შემდეგ კვირაშია', time: 'გუშინ' }
])

const pageTitle = computed(() => {
  const item = allNavItems.find(n => n.to === route.path)
  return item?.label ?? ''
})

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleLogout = () => {
  dropdownOpen.value = false
  logout()
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
  if (notificationsRef.value && !notificationsRef.value.contains(e.target as Node)) {
    notificationsOpen.value = false
  }
}

onMounted(() => {
  checkAuth()
  checkMobile()
  loadSidebarState()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleClickOutside)
})

const allNavItems = [
  {
    to: '/',
    label: 'დეშბორდი',
    icon: resolveComponent('IconDashboard'),
    show: () => true
  },
  {
    section: 'მოთხოვნები',
    to: '/requests',
    label: 'მოთხოვნები',
    icon: resolveComponent('IconRequests'),
    show: () => true
  },
  {
    to: '/approvals',
    label: 'დასამტკიცებელი',
    icon: resolveComponent('IconApprovals'),
    show: () => permissions.value.seeApprovals
  },
  {
    section: 'ადმინისტრირება',
    to: '/users',
    label: 'მომხმარებლები',
    icon: resolveComponent('IconUsers'),
    show: () => permissions.value.seeUsers
  },
  {
    to: '/reports',
    label: 'ანგარიშები',
    icon: resolveComponent('IconReports'),
    show: () => permissions.value.seeReports
  },
  {
    to: '/analytics',
    label: 'ანალიტიკა',
    icon: resolveComponent('IconAnalytics'),
    show: () => permissions.value.seeAnalytics
  },
  {
    section: 'სისტემა',
    to: '/settings',
    label: 'პარამეტრები',
    icon: resolveComponent('IconSettings'),
    show: () => permissions.value.seeSettings
  },
  {
    to: '/audit-log',
    label: 'აუდიტ ლოგი',
    icon: resolveComponent('IconAudit'),
    show: () => permissions.value.seeAuditLog
  }
]

// Filter nav items and remove orphaned section headers
const visibleNavItems = computed(() => {
  const filtered = allNavItems.filter(item => item.show())
  return filtered.filter((item, i) => {
    if (!item.section) return true
    // Remove section header if no visible items follow before next section
    const next = filtered[i + 1]
    return next && !next.section
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
