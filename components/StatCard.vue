<template>
  <NuxtLink v-if="to" :to="to" class="stat-card cursor-pointer hover:shadow-md transition-shadow" v-bind="$attrs">
    <div v-if="$slots.icon || icon" class="flex items-start justify-between">
      <div v-if="icon" :class="['icon-wrapper', iconSizeClass, iconColorClass]">
        <component :is="icon" :size="24" />
      </div>
      <slot name="icon" />
    </div>
    <div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ value }}</div>
      <div v-if="meta" class="stat-meta">{{ meta }}</div>
    </div>
  </NuxtLink>
  <div v-else class="stat-card" v-bind="$attrs">
    <div v-if="$slots.icon || icon" class="flex items-start justify-between">
      <div v-if="icon" :class="['icon-wrapper', iconSizeClass, iconColorClass]">
        <component :is="icon" :size="24" />
      </div>
      <slot name="icon" />
    </div>
    <div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ value }}</div>
      <div v-if="meta" class="stat-meta">{{ meta }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    meta?: string
    icon?: any
    iconSize?: 'xs' | 'sm' | 'md' | 'lg'
    iconColor?: 'primary' | 'success' | 'warning' | 'error' | 'muted'
    to?: string
  }>(),
  {
    iconSize: 'md',
    iconColor: 'primary'
  }
)

const iconSizeClass = computed(() => {
  const sizeMap = {
    xs: 'icon-wrapper-xs',
    sm: 'icon-wrapper-sm',
    md: 'icon-wrapper-md',
    lg: 'icon-wrapper-lg'
  }
  return sizeMap[props.iconSize]
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
</script>
