<template>
  <div class="card overflow-hidden" v-bind="$attrs">
    <!-- Header -->
    <div v-if="title" class="border-b border-divider px-6 py-4">
      <h3 class="section-title">{{ title }}</h3>
    </div>

    <!-- Content -->
    <div :class="['px-6 py-4', contentClass]">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="border-t border-divider px-6 py-4 bg-slate-50 dark:bg-slate-900/30">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  contentClass?: string
}>()
</script>
