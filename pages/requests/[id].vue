<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6" v-if="req">

    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-center gap-3">
        <button @click="$router.back()" class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-mono text-gray-400">{{ req.number }}</span>
            <span class="badge" :class="statusColor[req.status]">{{ statusLabel[req.status] }}</span>
            <span class="badge" :class="priorityColor[req.priority]">{{ priorityLabel[req.priority] }}</span>
          </div>
          <h1 class="text-lg font-semibold text-gray-900">{{ req.title }}</h1>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <template v-if="req.status === 'new' || req.status === 'in_review'">
          <button @click="openAction('approve')"
            class="btn-primary">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            დამტკიცება
          </button>
          <button @click="openAction('reject')" class="btn-danger">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            უარყოფა
          </button>
        </template>
        <template v-if="req.status === 'approved'">
          <button @click="changeStatus('in_progress')" class="btn-secondary">
            მუშაობა დაიწყო
          </button>
        </template>
        <template v-if="req.status === 'in_progress'">
          <button @click="changeStatus('resolved')" class="btn-primary">
            შესრულებულია
          </button>
        </template>
        <template v-if="req.status === 'resolved'">
          <button @click="changeStatus('closed')" class="btn-secondary">
            დახურვა
          </button>
        </template>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Main info -->
      <div class="lg:col-span-2 space-y-5">

        <!-- Details card -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">მოთხოვნის დეტალები</h3>
          <dl class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt class="text-gray-400 text-xs mb-1">კატეგორია</dt>
              <dd class="font-medium text-gray-800">{{ categoryLabel[req.category] }} — {{ req.subcategory }}</dd>
            </div>
            <div>
              <dt class="text-gray-400 text-xs mb-1">ვისთვის</dt>
              <dd class="font-medium text-gray-800">{{ req.forWhom }}</dd>
            </div>
            <div>
              <dt class="text-gray-400 text-xs mb-1">რეგიონი</dt>
              <dd class="font-medium text-gray-800">{{ req.region }}</dd>
            </div>
            <div v-if="req.location">
              <dt class="text-gray-400 text-xs mb-1">ადგილმდებარეობა</dt>
              <dd class="font-medium text-gray-800">{{ req.location }}</dd>
            </div>
            <div v-if="req.quantity && req.quantity > 1">
              <dt class="text-gray-400 text-xs mb-1">რაოდენობა</dt>
              <dd class="font-medium text-gray-800">{{ req.quantity }} ერთ.</dd>
            </div>
            <div v-if="req.deadline">
              <dt class="text-gray-400 text-xs mb-1">სასურველი ვადა</dt>
              <dd class="font-medium text-gray-800">{{ formatDate(req.deadline) }}</dd>
            </div>
          </dl>
        </div>

        <!-- Description -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">დეტალური აღწერა</h3>
          <p class="text-sm text-gray-700 leading-relaxed">{{ req.description }}</p>
        </div>

        <!-- Justification -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">დასაბუთება</h3>
          <p class="text-sm text-gray-700 leading-relaxed">{{ req.justification }}</p>
        </div>

        <!-- Comments -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">კომენტარები ({{ req.comments.length }})</h3>
          <div class="space-y-4 mb-5">
            <div v-if="req.comments.length === 0" class="text-sm text-gray-400 py-4 text-center">
              კომენტარები არ არის
            </div>
            <div v-for="c in req.comments" :key="c.id" class="flex gap-3">
              <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700 flex-shrink-0">
                {{ c.author[0] }}
              </div>
              <div class="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-gray-800">{{ c.author }}</span>
                  <span class="text-xs text-gray-400">{{ formatDateTime(c.createdAt) }}</span>
                </div>
                <p class="text-sm text-gray-700">{{ c.text }}</p>
              </div>
            </div>
          </div>

          <!-- Add comment -->
          <div class="flex gap-3 border-t border-gray-100 pt-4">
            <div class="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">გბ</div>
            <div class="flex-1 flex gap-2">
              <input v-model="newComment" type="text" placeholder="კომენტარის დამატება..."
                class="form-input flex-1" @keyup.enter="submitComment" />
              <button @click="submitComment" :disabled="!newComment.trim()" class="btn-primary px-4">
                გაგზავნა
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar info -->
      <div class="space-y-4">
        <!-- Meta -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">ინფორმაცია</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">მომთხოვნი</span>
              <span class="font-medium text-gray-800">{{ req.requester }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">განყოფ.</span>
              <span class="font-medium text-gray-800">{{ req.department }}</span>
            </div>
            <div v-if="req.assignee" class="flex justify-between">
              <span class="text-gray-400">პასუხისმ.</span>
              <span class="font-medium text-gray-800">{{ req.assignee }}</span>
            </div>
            <hr class="border-gray-100" />
            <div class="flex justify-between">
              <span class="text-gray-400">შექმნილია</span>
              <span class="text-gray-600 text-xs">{{ formatDateTime(req.createdAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">განახლება</span>
              <span class="text-gray-600 text-xs">{{ formatDateTime(req.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Status history -->
        <div class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">სტატუსის ისტორია</h3>
          <div class="space-y-3">
            <div class="flex gap-3 items-start">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <div>
                <p class="text-xs font-medium text-gray-700">ახალი მოთხოვნა შექმნილია</p>
                <p class="text-xs text-gray-400">{{ formatDateTime(req.createdAt) }}</p>
              </div>
            </div>
            <template v-for="c in req.comments" :key="'hist-' + c.id">
              <div class="flex gap-3 items-start">
                <div class="w-2 h-2 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                <div>
                  <p class="text-xs font-medium text-gray-700">{{ c.author }} — კომენტარი</p>
                  <p class="text-xs text-gray-400">{{ formatDateTime(c.createdAt) }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Assign -->
        <div v-if="!['resolved','closed'].includes(req.status)" class="card p-5">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">პასუხისმგებელი პირი</h3>
          <select v-model="assignee" class="form-select text-sm mb-2">
            <option value="">— მიანიჭეთ —</option>
            <option v-for="u in itStaff" :key="u">{{ u }}</option>
          </select>
          <button @click="saveAssignee" :disabled="!assignee" class="btn-primary w-full text-xs py-2">
            მინიჭება
          </button>
        </div>
      </div>
    </div>

    <!-- Action modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="actionModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="actionModal = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 class="text-base font-semibold text-gray-900">
              {{ actionModal === 'approve' ? '✅ მოთხოვნის დამტკიცება' : '❌ მოთხოვნის უარყოფა' }}
            </h3>
            <p class="text-sm text-gray-500">კომენტარი (სავალდებულო)</p>
            <textarea v-model="actionComment" rows="3" class="form-input resize-none"
              :placeholder="actionModal === 'approve' ? 'დამტკიცების შენიშვნა...' : 'უარყოფის მიზეზი...'" />
            <div class="flex gap-3 justify-end pt-2">
              <button @click="actionModal = null" class="btn-secondary">გაუქმება</button>
              <button
                @click="confirmAction"
                :disabled="!actionComment.trim()"
                :class="actionModal === 'approve' ? 'btn-primary' : 'btn-danger'"
              >
                {{ actionModal === 'approve' ? 'დამტკიცება' : 'უარყოფა' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <div v-else class="p-6 flex flex-col items-center justify-center h-64 gap-3">
    <p class="text-gray-400">მოთხოვნა ვერ მოიძებნა</p>
    <NuxtLink to="/requests" class="btn-secondary text-sm">← მოთხოვნების სია</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const route = useRoute()
const { getRequest, updateStatus, addComment, statusLabel, statusColor, priorityLabel, priorityColor, categoryLabel } = useRequests()

const id = computed(() => Number(route.params.id))
const req = computed(() => getRequest(id.value))

const newComment = ref('')
const actionModal = ref<'approve' | 'reject' | null>(null)
const actionComment = ref('')
const assignee = ref(req.value?.assignee ?? '')

const itStaff = ['გიორგი ბერიძე', 'თამარ ჯოხაძე', 'ვახო კვარაცხელია', 'ნატა ქვარაია']

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('ka-GE', { day: '2-digit', month: 'long', year: 'numeric' })
const formatDateTime = (d: string) =>
  new Date(d).toLocaleString('ka-GE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

const submitComment = () => {
  if (!newComment.value.trim()) return
  addComment(id.value, newComment.value.trim())
  newComment.value = ''
}

const openAction = (type: 'approve' | 'reject') => {
  actionComment.value = ''
  actionModal.value = type
}

const confirmAction = () => {
  if (!actionComment.value.trim()) return
  const status = actionModal.value === 'approve' ? 'approved' : 'rejected'
  updateStatus(id.value, status, actionComment.value.trim())
  actionModal.value = null
}

const changeStatus = (status: any) => {
  updateStatus(id.value, status)
}

const saveAssignee = () => {
  const r = getRequest(id.value)
  if (r && assignee.value) r.assignee = assignee.value
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
