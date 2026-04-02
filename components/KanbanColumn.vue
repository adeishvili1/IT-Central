<template>
  <div>
    <!-- Column Header -->
    <div class="mb-4 px-1">
      <div class="flex items-center gap-3 mb-3">
        <!-- Status indicator dot -->
        <div
          class="w-2.5 h-2.5 rounded-full flex-shrink-0"
          :class="statusDotColor"
        />
        <!-- Status label -->
        <h3 class="text-sm font-semibold text-primary">{{ label }}</h3>
        <!-- Count badge -->
        <span class="inline-flex items-center justify-center min-w-5 h-5 rounded-full text-xs font-bold"
          :class="badgeClass">
          {{ items.length }}
        </span>
      </div>
    </div>

    <!-- Drop zone container -->
    <div
      class="space-y-3 min-h-80 lg:min-h-96 rounded-lg p-2 transition-colors duration-200 flex-1 overflow-y-auto"
      :class="dragActive ? 'bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30' : 'bg-transparent'"
    >
      <!-- Empty state -->
      <div v-if="items.length === 0" class="text-center py-12">
        <p class="text-xs text-muted">მოთხოვნები არ არის</p>
      </div>

      <!-- Cards -->
      <div
        v-for="item in items"
        :key="item.id"
        class="animate-in fade-in-50 duration-150"
      >
        <KanbanCard
          :request="item"
          @click="emit('cardClick', item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Request {
  id: number
  number: string
  title: string
  status: string
  priority: string
  category: string
  region: string
  requester: string
  assignee?: string
  createdAt: string
}

interface Props {
  status: string
  label: string
  items: Request[]
  badgeClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  badgeClass: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
})

const emit = defineEmits<{
  cardClick: [request: Request]
}>()

const dragActive = ref(false)

const statusDotColor = computed(() => {
  const colors: Record<string, string> = {
    new: 'bg-blue-500',
    in_review: 'bg-amber-500',
    approved: 'bg-emerald-500',
    delegated: 'bg-purple-500',
    in_progress: 'bg-cyan-500',
    resolved: 'bg-teal-500',
    closed: 'bg-slate-500',
    needs_clarification: 'bg-orange-500'
  }
  return colors[props.status] || 'bg-slate-300'
})
</script>

<style scoped>
.animate-in {
  animation: slideInUp 0.2s ease-out forwards;
}

.fade-in-50 {
  opacity: 0;
}

.animate-in.fade-in-50 {
  animation: fadeInSlideUp 0.2s ease-out forwards;
}

@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
