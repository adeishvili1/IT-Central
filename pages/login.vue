<template>
  <div class="w-full max-w-[380px]">

    <!-- Logo -->
    <div class="flex items-center gap-3 mb-10">
      <div class="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center shadow-sm">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
        </svg>
      </div>
      <div>
        <p class="text-base font-bold text-gray-900">IT Central</p>
        <p class="text-xs text-gray-400">მოთხოვნების მართვა</p>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">ავტორიზაცია</h1>
      <p class="text-sm text-gray-500">შეიყვანეთ თქვენი მონაცემები სისტემაში შესასვლელად</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="$router.push('/')" class="space-y-5">
      <div>
        <label class="form-label">ელ-ფოსტა</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            name="email"
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
            name="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="შეიყვანეთ პაროლი"
            class="form-input pl-10 pr-10"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
          >
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

      <button type="submit" class="btn-primary w-full py-3 text-base">
        ავტორიზაცია
      </button>
    </form>

    <p class="mt-8 text-center text-xs text-gray-400">
      © {{ new Date().getFullYear() }} IT Central. ყველა უფლება დაცულია.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const showPassword = ref(false)
</script>
