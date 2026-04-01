import { ref, computed } from 'vue'

export type UserRole = 'support' | 'admin' | 'super_admin'

export interface AuthUser {
  id: number
  name: string
  surname: string
  email: string
  password: string
  role: UserRole
  region: string
  department: string
}

// ─── Mock users (stored in localStorage on first load) ───────────────────────
export const MOCK_USERS: AuthUser[] = [
  {
    id: 1,
    name: 'გიორგი',
    surname: 'ბერიძე',
    email: 'superadmin@company.ge',
    password: 'super123',
    role: 'super_admin',
    region: 'თბილისი',
    department: 'ცენტრალური IT'
  },
  {
    id: 2,
    name: 'თამარ',
    surname: 'ჯოხაძე',
    email: 'admin@company.ge',
    password: 'admin123',
    role: 'admin',
    region: 'თბილისი',
    department: 'ცენტრალური IT'
  },
  {
    id: 3,
    name: 'ნინო',
    surname: 'კვარაცხელია',
    email: 'support@company.ge',
    password: 'support123',
    role: 'support',
    region: 'ქუთაისი',
    department: 'IT'
  },
  {
    id: 4,
    name: 'დავით',
    surname: 'მაისურაძე',
    email: 'support2@company.ge',
    password: 'support123',
    role: 'support',
    region: 'ბათუმი',
    department: 'IT'
  }
]

const initUsersInStorage = () => {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem('it_users')) {
    localStorage.setItem('it_users', JSON.stringify(MOCK_USERS))
  }
}

const getUsersFromStorage = (): AuthUser[] => {
  if (typeof window === 'undefined') return MOCK_USERS
  try {
    return JSON.parse(localStorage.getItem('it_users') || '[]')
  } catch {
    return MOCK_USERS
  }
}

// ─── Role config ─────────────────────────────────────────────────────────────
export const roleLabel: Record<UserRole, string> = {
  support:     'მხარდაჭერა',
  admin:       'ადმინი (Central IT)',
  super_admin: 'სუპერ ადმინი'
}

export const roleBadgeColor: Record<UserRole, string> = {
  support:     'bg-blue-100 text-blue-700',
  admin:       'bg-purple-100 text-purple-700',
  super_admin: 'bg-red-100 text-red-700'
}

export const can = (role: UserRole) => ({
  seeAllRequests: role === 'admin' || role === 'super_admin',
  seeApprovals:   role === 'admin' || role === 'super_admin',
  seeReports:     role === 'admin' || role === 'super_admin',
  seeAnalytics:   role === 'admin' || role === 'super_admin',
  seeUsers:       role === 'super_admin',
  seeSettings:    role === 'super_admin',
  seeAuditLog:    role === 'super_admin',
  approveReject:  role === 'admin' || role === 'super_admin',
  clarify:        role === 'admin' || role === 'super_admin',
  delegate:       role === 'admin' || role === 'super_admin',
  cancelAny:      role === 'super_admin',
  createRequest:  true
})

// ─── Reactive state ───────────────────────────────────────────────────────────
const currentUser = ref<AuthUser>({
  id: 0,
  name: '',
  surname: '',
  email: '',
  password: '',
  role: 'support',
  region: '',
  department: ''
})

const isAuthenticated = ref(false)
const loginError = ref('')

// ─── Composable ───────────────────────────────────────────────────────────────
export const useAuth = () => {

  const login = (email: string, password: string): boolean => {
    initUsersInStorage()
    const users = getUsersFromStorage()
    const found = users.find(u => u.email === email && u.password === password)

    if (!found) {
      loginError.value = 'არასწორი ელ-ფოსტა ან პაროლი.'
      return false
    }

    // Store session (without password)
    const { password: _, ...safeUser } = found
    isAuthenticated.value = true
    loginError.value = ''
    currentUser.value = found

    if (typeof window !== 'undefined') {
      localStorage.setItem('it_session', JSON.stringify(safeUser))
    }
    return true
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = { id: 0, name: '', surname: '', email: '', password: '', role: 'support', region: '', department: '' }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('it_session')
      window.location.href = '/login'
    }
  }

  const checkAuth = () => {
    if (typeof window === 'undefined') return false
    initUsersInStorage()
    const raw = localStorage.getItem('it_session')
    if (!raw) { isAuthenticated.value = false; return false }
    try {
      const saved = JSON.parse(raw) as AuthUser
      currentUser.value = { ...saved, password: '' }
      isAuthenticated.value = true
      return true
    } catch {
      isAuthenticated.value = false
      return false
    }
  }

  const initials = computed(() =>
    `${currentUser.value.name?.[0] ?? ''}${currentUser.value.surname?.[0] ?? ''}`
  )

  const fullName = computed(() =>
    `${currentUser.value.name} ${currentUser.value.surname}`.trim()
  )

  const permissions = computed(() => can(currentUser.value.role))

  return {
    currentUser,
    isAuthenticated,
    loginError,
    login,
    logout,
    checkAuth,
    initials,
    fullName,
    permissions,
    roleLabel,
    roleBadgeColor
  }
}
