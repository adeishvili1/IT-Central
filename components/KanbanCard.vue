<template>
  <div
    class="group relative cursor-grab active:cursor-grabbing"
    @click="emit('click')"
  >
    <!-- Card -->
    <div
      class="card-hover p-3 sm:p-4 space-y-2 sm:space-y-3 border-l-4 transition-all duration-200 hover:shadow-md text-sm sm:text-base"
      :class="statusBorderColor"
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <p class="text-xs font-mono text-muted mb-1">{{ request.number }}</p>
          <h4 class="text-sm font-semibold text-primary line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
            {{ request.title }}
          </h4>
        </div>
        <!-- Drag handle (shows on hover) -->
        <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          <GripVertical :size="16" color="currentColor" :stroke-width="2" />
        </div>
      </div>

      <!-- Type badge + Priority -->
      <div class="flex items-center gap-2">
        <CategoryIcon :category="request.category as any" size="sm" />
        <span class="text-xs font-medium text-secondary">{{ categoryLabel[request.category] }}</span>
        <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ml-auto" :class="priorityBadgeClass">
          {{ priorityLabelGE[request.priority] }}
        </span>
      </div>

      <!-- Metadata -->
      <div class="flex items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2 min-w-0">
          <!-- Assignee avatar -->
          <div v-if="request.assignee" class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary-700 dark:text-primary-400">
              {{ initials(request.assignee) }}
            </div>
            <span class="text-muted truncate">{{ request.assignee }}</span>
          </div>
          <div v-else class="text-muted">—</div>
        </div>
      </div>

      <!-- Footer: Location + Date -->
      <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1 text-xs text-muted min-w-0">
          <MapPin :size="14" color="currentColor" :stroke-width="2" class="flex-shrink-0" />
          <span class="truncate">{{ request.region }}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-muted whitespace-nowrap flex-shrink-0">
          <Calendar :size="14" color="currentColor" :stroke-width="2" />
          {{ formatDate(request.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GripVertical, MapPin, Calendar } from '@lucide/vue'

interface Request {
  id: number
  number: string
  title: string
  description?: string
  status: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  category: string
  region: string
  requester: string
  assignee?: string
  createdAt: string
  deadline?: string
}

const props = defineProps<{
  request: Request
}>()

const emit = defineEmits<{
  click: []
}>()

const categoryLabel: Record<string, string> = {
  hardware: 'აპარატურა',
  software: 'პროგრამული უზრუნველყოფა',
  access: 'წვდომა',
  support: 'დახმარება',
  other: 'სხვა'
}

const priorityLabelGE: Record<string, string> = {
  'Low': 'დაბალი',
  'Medium': 'საშუალო',
  'High': 'მაღალი',
  'Critical': 'გადაუდებელი'
}

const statusBorderColor = computed(() => {
  const colors: Record<string, string> = {
    new: 'border-blue-500',
    in_review: 'border-amber-500',
    approved: 'border-emerald-500',
    delegated: 'border-purple-500',
    in_progress: 'border-cyan-500',
    resolved: 'border-teal-500',
    closed: 'border-slate-500',
    needs_clarification: 'border-orange-500'
  }
  return colors[props.request.status] || 'border-slate-300'
})

const priorityBadgeClass = computed(() => {
  const classes: Record<string, string> = {
    'Low': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    'Medium': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'High': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Critical': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }
  return classes[props.request.priority] || 'bg-slate-100 text-slate-700'
})

const initials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ka-GE', { month: 'short', day: 'numeric' })
}
</script>
