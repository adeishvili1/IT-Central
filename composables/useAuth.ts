const currentUser = ref({
  id: 1,
  name: 'გიორგი',
  surname: 'ბერიძე',
  email: 'g.beridze@company.ge',
  role: 'admin', // admin | central_it | regional_it | manager
  region: 'თბილისი',
  department: 'ცენტრალური IT'
})

const isAuthenticated = ref(false)

export const useAuth = () => {
  const login = (email: string, password: string) => {
    // Mock login — accept any credentials
    isAuthenticated.value = true
    if (typeof window !== 'undefined') {
      localStorage.setItem('it_auth', 'true')
    }
    return true
  }

  const logout = () => {
    isAuthenticated.value = false
    if (typeof window !== 'undefined') {
      localStorage.removeItem('it_auth')
    }
    navigateTo('/login')
  }

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      isAuthenticated.value = !!localStorage.getItem('it_auth')
    }
    return isAuthenticated.value
  }

  const initials = computed(() => {
    const n = currentUser.value.name?.[0] ?? ''
    const s = currentUser.value.surname?.[0] ?? ''
    return `${n}${s}`
  })

  const fullName = computed(() => `${currentUser.value.name} ${currentUser.value.surname}`)

  return { currentUser, isAuthenticated, login, logout, checkAuth, initials, fullName }
}
