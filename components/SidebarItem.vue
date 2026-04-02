<template>
  <NuxtLink
    :to="to"
    :class="[
      'nav-link',
      isActive ? 'nav-link-active' : 'nav-link-inactive'
    ]"
  >
    <div v-if="icon" class="flex-shrink-0 w-5 h-5">
      <component :is="icon" :size="20" />
    </div>
    <span class="text-sm font-medium">{{ label }}</span>
    <div v-if="badge" class="ml-auto flex-shrink-0">
      <span class="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
        {{ badge }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  to: string
  label: string
  icon?: any
  badge?: string | number
}>()

const route = useRoute()

const isActive = computed(() => {
  return route.path === props.to || route.path.startsWith(props.to + '/')
})
</script>
