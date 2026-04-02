<template>
  <div
    class="inline-flex items-center justify-center rounded-lg transition-all duration-200"
    :class="[sizeClass, bgColorClass, 'hover:scale-110']"
  >
    <component
      :is="icon"
      :size="iconSize"
      :color="iconColor"
      :stroke-width="2"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLucideIcons } from '~/composables/useLucideIcons'

interface Props {
  category: 'hardware' | 'software' | 'access' | 'support' | 'other'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const { categoryIcons, sizes, categoryColors } = useLucideIcons()

const icon = computed(() => categoryIcons[props.category])

const sizeClass = computed(() => {
  const sizeMap = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  }
  return sizeMap[props.size]
})

const iconSize = computed(() => {
  const sizeMap = {
    xs: 14,
    sm: 18,
    md: 20,
    lg: 24
  }
  return sizeMap[props.size]
})

const bgColorClass = computed(() => {
  const colorMap = {
    hardware: 'bg-blue-50 dark:bg-blue-900/20',
    software: 'bg-purple-50 dark:bg-purple-900/20',
    access: 'bg-green-50 dark:bg-green-900/20',
    support: 'bg-orange-50 dark:bg-orange-900/20',
    other: 'bg-slate-50 dark:bg-slate-800'
  }
  return colorMap[props.category]
})

const iconColor = computed(() => {
  const colorMap = {
    hardware: '#2563eb',
    software: '#a855f7',
    access: '#16a34a',
    support: '#ea580c',
    other: '#64748b'
  }
  return colorMap[props.category]
})
</script>
