<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300 z-30',
        sidebarOpen ? 'w-60' : 'w-[68px]'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 h-16 border-b border-gray-100 flex-shrink-0">
        <div class="w-9 h-9 flex-shrink-0 rounded-xl bg-primary-700 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
          </svg>
        </div>
        <Transition name="fade">
          <div v-if="sidebarOpen" class="overflow-hidden">
            <p class="text-sm font-bold text-gray-900 whitespace-nowrap leading-tight">IT Central</p>
            <p class="text-[10px] text-gray-400 whitespace-nowrap">მოთხოვნების სისტემა</p>
          </div>
        </Transition>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        <template v-for="item in navItems" :key="item.to">
          <!-- Section label -->
          <p
            v-if="item.section && sidebarOpen"
            class="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400"
          >{{ item.section }}</p>
          <div v-else-if="item.section && !sidebarOpen" class="h-4" />

          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all group relative"
            :class="isActive(item.to)
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <!-- Active indicator -->
            <span
              v-if="isActive(item.to)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary-600"
            />
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <Transition name="fade">
              <span v-if="sidebarOpen" class="whitespace-nowrap">{{ item.label }}</span>
            </Transition>

            <!-- Tooltip when collapsed -->
            <div
              v-if="!sidebarOpen"
              class="absolute left-full ml-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap z-50 pointer-events-none shadow-lg"
            >
              {{ item.label }}
            </div>
          </NuxtLink>
        </template>
      </nav>

      <!-- Toggle button -->
      <div class="border-t border-gray-100 p-2">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="w-full flex items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all"
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
    </aside>

    <!-- Main content -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="h-16 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
        <div class="flex items-center gap-3">
          <!-- Page title will be injected via provide/inject -->
          <h2 class="text-base font-semibold text-gray-800">{{ pageTitle }}</h2>
        </div>

        <div class="flex items-center gap-3">
          <!-- Notifications -->
          <button class="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <!-- User dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition-all"
            >
              <div class="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {{ initials }}
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-gray-900 leading-tight">{{ fullName }}</p>
                <p class="text-xs text-gray-400 leading-tight">{{ currentUser.department }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
                class="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
              >
                <div class="px-4 py-2.5 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ fullName }}</p>
                  <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
                </div>
                <NuxtLink to="/profile" @click="dropdownOpen=false" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  პროფილი
                </NuxtLink>
                <NuxtLink to="/settings" @click="dropdownOpen=false" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  პარამეტრები
                </NuxtLink>
                <div class="border-t border-gray-100 mt-1">
                  <button @click="handleLogout" class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineOptions({ name: 'DefaultLayout' })

const { currentUser, initials, fullName, logout, checkAuth } = useAuth()
const route = useRoute()

const sidebarOpen = ref(true)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const pageTitle = computed(() => {
  const item = navItems.find(n => n.to === route.path)
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
}

onMounted(() => {
  checkAuth()
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const navItems = [
  {
    to: '/',
    label: 'დეშბორდი',
    icon: resolveComponent('IconDashboard')
  },
  {
    section: 'მოთხოვნები',
    to: '/requests',
    label: 'მოთხოვნები',
    icon: resolveComponent('IconRequests')
  },
  {
    to: '/approvals',
    label: 'დასამტკიცებელი',
    icon: resolveComponent('IconApprovals')
  },
  {
    section: 'ადმინისტრირება',
    to: '/users',
    label: 'მომხმარებლები',
    icon: resolveComponent('IconUsers')
  },
  {
    to: '/reports',
    label: 'ანგარიშები',
    icon: resolveComponent('IconReports')
  },
  {
    to: '/analytics',
    label: 'ანალიტიკა',
    icon: resolveComponent('IconAnalytics')
  },
  {
    section: 'სისტემა',
    to: '/settings',
    label: 'პარამეტრები',
    icon: resolveComponent('IconSettings')
  },
  {
    to: '/audit-log',
    label: 'აუდიტ ლოგი',
    icon: resolveComponent('IconAudit')
  }
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
