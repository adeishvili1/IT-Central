<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 backdrop-blur-sm"
        @click="close"
      />
    </Transition>

    <!-- Modal -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-3 sm:p-4"
        @click="closeOnBackdrop"
      >
        <div
          class="bg-white dark:bg-[#1a1a1a] rounded-lg sm:rounded-xl shadow-2xl md:max-w-2xl md:w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 z-10">
            <div class="min-w-0 flex-1">
              <p class="text-xs font-mono text-muted mb-1">{{ request.number }}</p>
              <h2 class="text-base sm:text-lg font-bold text-primary truncate">{{ request.title }}</h2>
            </div>
            <button
              @click="close"
              class="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              <X :size="20" color="currentColor" :stroke-width="2" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Status & Priority -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">სტატუსი</p>
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="statusDotColor"
                  />
                  <span class="badge" :class="statusBadgeClass">{{ statusLabel[request.status] }}</span>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">პრიორიტეტი</p>
                <span class="badge" :class="priorityBadgeClass">{{ priorityLabelsGE[request.priority] }}</span>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">კატეგორია</p>
                <div class="flex items-center gap-2">
                  <CategoryIcon :category="request.category as any" size="xs" />
                  <p class="text-sm font-medium text-primary">{{ categoryLabel[request.category] }}</p>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">რეგიონი</p>
                <div class="flex items-center gap-2">
                  <MapPin :size="16" color="currentColor" :stroke-width="2" />
                  <p class="text-sm font-medium text-primary">{{ request.region }}</p>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">მომთხოვნი</p>
                <div class="flex items-center gap-2">
                  <User :size="16" color="currentColor" :stroke-width="2" />
                  <p class="text-sm font-medium text-primary">{{ request.requester }}</p>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">პასუხისმგებელი</p>
                <p v-if="request.assignee" class="text-sm font-medium text-primary">{{ request.assignee }}</p>
                <p v-else class="text-sm text-muted">—</p>
              </div>
              <div>
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">შექმნილი</p>
                <div class="flex items-center gap-2">
                  <Calendar :size="16" color="currentColor" :stroke-width="2" />
                  <p class="text-sm font-medium text-primary">{{ formatFullDate(request.createdAt) }}</p>
                </div>
              </div>
              <div v-if="request.deadline">
                <p class="text-xs font-medium text-muted uppercase tracking-wide mb-2">ვადა</p>
                <div class="flex items-center gap-2">
                  <Clock :size="16" color="currentColor" :stroke-width="2" />
                  <p class="text-sm font-medium text-primary">{{ formatFullDate(request.deadline) }}</p>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-slate-200 dark:border-slate-800" />

            <!-- Description -->
            <div>
              <p class="text-xs font-medium text-muted uppercase tracking-wide mb-3">აღწერა</p>
              <p class="text-sm text-secondary leading-relaxed">{{ request.description || 'აღწერა არ მოწოდებულია.' }}</p>
            </div>

            <!-- Activity/Comments (UI Only) -->
            <div>
              <p class="text-xs font-medium text-muted uppercase tracking-wide mb-3">აქტივობა</p>
              <div class="space-y-3">
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-700 dark:text-primary-400">
                    JS
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-primary">John Smith</p>
                    <p class="text-xs text-muted">მოთხოვნა შეიქმნა • 2 საათის წინ</p>
                    <p class="text-sm text-secondary mt-1">SSD საცავის მოთხოვნა დეველოპერთა ჯგუფისთვის</p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    JD
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-primary">Jane Doe</p>
                    <p class="text-xs text-muted">მოთხოვნა დამტკიცდა • 1 საათის წინ</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-slate-200 dark:border-slate-800" />

            <!-- Action Buttons -->
            <div class="flex gap-2 pt-2">
              <button class="btn-primary flex-1">
                <Check :size="16" color="currentColor" :stroke-width="2" />
                დამტკიცება
              </button>
              <button class="btn-secondary flex-1">
                <UserPlus :size="16" color="currentColor" :stroke-width="2" />
                მინიჭება
              </button>
              <button class="btn-secondary">
                <MoreHorizontal :size="16" color="currentColor" :stroke-width="2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, MapPin, User, Calendar, Clock, Check, UserPlus, MoreHorizontal } from '@lucide/vue'

interface Request {
  id: number
  number: string
  title: string
  description?: string
  status: string
  priority: string
  category: string
  region: string
  requester: string
  assignee?: string
  createdAt: string
  deadline?: string
}

interface Props {
  isOpen: boolean
  request?: Request
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits<{
  close: []
}>()

const categoryLabel: Record<string, string> = {
  hardware: 'აპარატურა',
  software: 'პროგრამული უზრუნველყოფა',
  access: 'წვდომა',
  support: 'დახმარება',
  other: 'სხვა'
}

const statusLabel: Record<string, string> = {
  new: 'ახალი',
  in_review: 'განხილვაში',
  approved: 'დამტკიცებული',
  delegated: 'დელეგირებული',
  in_progress: 'მიმდინარე',
  resolved: 'შესრულებული',
  closed: 'დახურული',
  needs_clarification: 'დაზუსტება სჭირს'
}

const statusBadgeClass = computed(() => {
  if (!props.request) return ''
  const classes: Record<string, string> = {
    new: 'badge-primary',
    in_review: 'badge-warning',
    approved: 'badge-success',
    delegated: 'badge-info',
    in_progress: 'badge-warning',
    resolved: 'badge-success',
    closed: 'badge-neutral',
    needs_clarification: 'badge-error'
  }
  return classes[props.request.status] || 'badge-neutral'
})

const statusDotColor = computed(() => {
  if (!props.request) return ''
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
  return colors[props.request.status] || 'bg-slate-300'
})

const priorityLabelsGE: Record<string, string> = {
  'Low': 'დაბალი',
  'Medium': 'საშუალო',
  'High': 'მაღალი',
  'Critical': 'გადაუდებელი'
}

const priorityBadgeClass = computed(() => {
  if (!props.request) return ''
  const classes: Record<string, string> = {
    'Low': 'badge-success',
    'Medium': 'badge-warning',
    'High': 'badge-error',
    'Critical': 'badge-error'
  }
  return classes[props.request.priority] || 'badge-neutral'
})

const close = () => emit('close')

const closeOnBackdrop = (e: MouseEvent) => {
  if (e.target === e.currentTarget) close()
}

const formatFullDate = (date: string) => {
  return new Date(date).toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-leave-active {
  transition: transform 200ms ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

@media (min-width: 768px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: scale(0.95) translateY(0);
    opacity: 0;
  }
}
</style>
