import { ref } from 'vue'

const isDark = ref(false)

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (typeof window !== 'undefined') {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved === 'dark' || (!saved && prefersDark)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}
