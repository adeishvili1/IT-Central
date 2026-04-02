<template>
  <div class="space-y-1">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="activity-item"
    >
      <!-- Timeline dot -->
      <div :class="['activity-dot', dotColorClass(item.type)]" />

      <!-- Activity content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <p class="text-sm font-medium text-primary">{{ item.title }}</p>
          <span v-if="item.badge" :class="['badge', getBadgeClass(item.badge)]">
            {{ item.badge }}
          </span>
        </div>

        <p v-if="item.description" class="text-xs text-secondary mb-1">
          {{ item.description }}
        </p>

        <p class="text-xs text-muted">
          <span v-if="item.author" class="opacity-70">by {{ item.author }}</span>
          <span v-if="item.author && item.date" class="opacity-70"> • </span>
          <span v-if="item.date">{{ formatDate(item.date) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ActivityItem {
  title: string
  description?: string
  author?: string
  date?: Date | string
  type?: 'info' | 'success' | 'warning' | 'error'
  badge?: string
}

const props = defineProps<{
  items: ActivityItem[]
}>()

const dotColorClass = (type?: string) => {
  const map = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500'
  }
  return map[type || 'info'] || 'bg-slate-400'
}

const getBadgeClass = (badge: string) => {
  const typeMap = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    neutral: 'badge-neutral'
  }
  return typeMap[badge] || 'badge-neutral'
}

const formatDate = (date: Date | string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
}
</script>
