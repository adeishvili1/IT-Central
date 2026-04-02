<template>
  <div class="card-interactive p-4" v-bind="$attrs">
    <div class="flex items-start gap-4">
      <!-- Icon wrapper -->
      <div v-if="icon" :class="['icon-wrapper', 'icon-wrapper-sm', iconColorClass]">
        <component :is="icon" :size="20" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3 mb-2">
          <h3 class="text-sm font-semibold text-primary">{{ title }}</h3>
          <div v-if="badge" class="flex-shrink-0">
            <span :class="['badge', badgeClass]">{{ badge }}</span>
          </div>
        </div>

        <p v-if="description" class="text-sm text-secondary mb-3 line-clamp-2">
          {{ description }}
        </p>

        <!-- Metadata -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-muted">
          <div v-if="author" class="flex items-center gap-1">
            <span class="opacity-70">by</span>
            <span>{{ author }}</span>
          </div>
          <div v-if="date" class="flex items-center gap-1">
            <span class="opacity-70">•</span>
            <span>{{ formatDate(date) }}</span>
          </div>
          <div v-if="priority" class="flex items-center gap-1">
            <span class="opacity-70">•</span>
            <span :class="['px-2 py-0.5 rounded', priorityClass]">{{ priority }}</span>
          </div>
        </div>
      </div>

      <!-- Arrow indicator -->
      <div class="flex-shrink-0 mt-0.5">
        <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  description?: string
  icon?: any
  iconColor?: 'primary' | 'success' | 'warning' | 'error' | 'muted'
  badge?: string
  badgeType?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  author?: string
  date?: Date | string
  priority?: 'Low' | 'Medium' | 'High' | 'Critical'
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
  badgeType: 'neutral'
})

const iconColorClass = computed(() => {
  const colorMap = {
    primary: 'icon-primary',
    success: 'icon-success',
    warning: 'icon-warning',
    error: 'icon-error',
    muted: 'icon-muted'
  }
  return colorMap[props.iconColor]
})

const badgeClass = computed(() => {
  const typeMap = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    neutral: 'badge-neutral'
  }
  return typeMap[props.badgeType]
})

const priorityClass = computed(() => {
  const map = {
    'Low': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Medium': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'High': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Critical': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }
  return map[props.priority] || ''
})

const formatDate = (date: Date | string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
