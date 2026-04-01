<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 class="text-lg font-semibold text-gray-900">ახალი IT მოთხოვნა</h1>
        <p class="text-xs text-gray-500">შეავსეთ ყველა სავალდებულო ველი</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">

      <!-- Section: ძირითადი ინფორმაცია -->
      <div class="card p-6 space-y-5">
        <h2 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">ძირითადი ინფორმაცია</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">კატეგორია <span class="text-red-500">*</span></label>
            <select v-model="form.category" class="form-select" required @change="form.subcategory = ''">
              <option value="">— აირჩიეთ —</option>
              <option value="hardware">🖥️ აპარატურა</option>
              <option value="software">💿 პროგრამული უზრუნველყოფა</option>
              <option value="access">🔐 წვდომის მართვა</option>
              <option value="support">🔧 ტექნიკური მხარდაჭერა</option>
              <option value="other">📋 სხვა</option>
            </select>
          </div>

          <div>
            <label class="form-label">ქვეკატეგორია <span class="text-red-500">*</span></label>
            <select v-model="form.subcategory" class="form-select" required :disabled="!form.category">
              <option value="">— აირჩიეთ —</option>
              <template v-if="form.category === 'hardware'">
                <option>SSD</option><option>RAM</option><option>კომპიუტერი</option>
                <option>მონიტორი</option><option>პრინტერი</option><option>UPS</option>
                <option>კლავიატურა / მაუსი</option><option>ქსელური მოწყობილობა</option><option>სხვა</option>
              </template>
              <template v-if="form.category === 'software'">
                <option>პროგრამის ინსტალაცია</option><option>პროგრამის განახლება</option>
                <option>ლიცენზია</option><option>ანტივირუსი</option><option>VPN</option>
                <option>Microsoft Office</option><option>სხვა</option>
              </template>
              <template v-if="form.category === 'access'">
                <option>წვდომის გახსნა</option><option>წვდომის შეცვლა</option><option>წვდომის დახურვა</option>
                <option>ელ-ფოსტა</option><option>Shared Folder</option><option>VPN</option><option>სხვა</option>
              </template>
              <template v-if="form.category === 'support'">
                <option>კომპიუტერის პრობლემა</option><option>პრინტერის პრობლემა</option>
                <option>ქსელის პრობლემა</option><option>ინტერნეტის პრობლემა</option>
                <option>დიაგნოსტიკა</option><option>სხვა</option>
              </template>
              <template v-if="form.category === 'other'">
                <option>IT კონსულტაცია</option><option>სხვა IT მოთხოვნა</option>
              </template>
            </select>
          </div>
        </div>

        <div>
          <label class="form-label">სათაური <span class="text-red-500">*</span></label>
          <input v-model="form.title" type="text" class="form-input"
            placeholder="მოკლე და გასაგები სათაური" required maxlength="120" />
          <p class="text-xs text-gray-400 mt-1">{{ form.title.length }}/120</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="form-label">პრიორიტეტი <span class="text-red-500">*</span></label>
            <select v-model="form.priority" class="form-select" required>
              <option value="low">დაბალი</option>
              <option value="medium">საშუალო</option>
              <option value="high">მაღალი</option>
              <option value="critical">კრიტიკული</option>
            </select>
          </div>
          <div>
            <label class="form-label">რეგიონი / ფილიალი <span class="text-red-500">*</span></label>
            <select v-model="form.region" class="form-select" required>
              <option value="">— აირჩიეთ —</option>
              <option v-for="r in regions" :key="r">{{ r }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">სასურველი ვადა</label>
            <input v-model="form.deadline" type="date" class="form-input" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">ვისთვისაა <span class="text-red-500">*</span></label>
            <input v-model="form.forWhom" type="text" class="form-input"
              placeholder="სახელი გვარი ან განყოფილება" required />
          </div>
          <div>
            <label class="form-label">ადგილმდებარეობა / ოთახი</label>
            <input v-model="form.location" type="text" class="form-input"
              placeholder="მაგ: სართ. 3, ოთახი 302" />
          </div>
        </div>
      </div>

      <!-- Dynamic fields by category -->
      <div v-if="form.category" class="card p-6 space-y-4">
        <h2 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">
          დამატებითი ინფორმაცია — {{ categoryLabelMap[form.category] }}
        </h2>

        <!-- Hardware -->
        <template v-if="form.category === 'hardware'">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">მოთხოვნის ტიპი</label>
              <select v-model="extra.hwType" class="form-select">
                <option value="new">ახალი შეძენა</option>
                <option value="replace">არსებულის შეცვლა</option>
              </select>
            </div>
            <div>
              <label class="form-label">რაოდენობა</label>
              <input v-model.number="form.quantity" type="number" min="1" class="form-input" />
            </div>
          </div>
          <div v-if="extra.hwType === 'replace'">
            <label class="form-label">დაზიანების მოკლე აღწერა</label>
            <input v-model="extra.damageDesc" type="text" class="form-input"
              placeholder="რა გაფუჭდა / ვერ მუშაობს" />
          </div>
        </template>

        <!-- Software -->
        <template v-if="form.category === 'software'">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">პროგრამის სახელი <span class="text-red-500">*</span></label>
              <input v-model="extra.softwareName" type="text" class="form-input"
                placeholder="მაგ: Adobe Acrobat Pro" />
            </div>
            <div>
              <label class="form-label">მოქმედება</label>
              <select v-model="extra.softwareAction" class="form-select">
                <option value="install">ინსტალაცია</option>
                <option value="update">განახლება</option>
                <option value="license">ლიცენზია</option>
              </select>
            </div>
          </div>
          <div>
            <label class="form-label">რა კომპიუტერზე / ვისთვის</label>
            <input v-model="extra.targetDevice" type="text" class="form-input"
              placeholder="კომპიუტერის სახელი ან IP" />
          </div>
        </template>

        <!-- Access open/change -->
        <template v-if="form.category === 'access' && form.subcategory !== 'წვდომის დახურვა'">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">სისტემა / რესურსი</label>
              <input v-model="extra.systemName" type="text" class="form-input"
                placeholder="მაგ: 1C, Active Directory, VPN" />
            </div>
            <div>
              <label class="form-label">წვდომის ტიპი</label>
              <select v-model="extra.accessType" class="form-select">
                <option value="read">მხოლოდ წაკითხვა</option>
                <option value="write">წერა / რედაქტირება</option>
                <option value="admin">ადმინ</option>
                <option value="full">სრული</option>
              </select>
            </div>
          </div>
          <div>
            <label class="form-label">წვდომა დროებითია?</label>
            <div class="flex items-center gap-4 mt-1">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" v-model="extra.accessTemp" value="no" class="accent-primary-600" /> მუდმივი
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" v-model="extra.accessTemp" value="yes" class="accent-primary-600" /> დროებითი
              </label>
            </div>
          </div>
        </template>

        <!-- Access close -->
        <template v-if="form.category === 'access' && form.subcategory === 'წვდომის დახურვა'">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">დახურვის მიზეზი</label>
              <select v-model="extra.closeReason" class="form-select">
                <option value="resign">სამსახურის დატოვება</option>
                <option value="transfer">გადაყვანა</option>
                <option value="security">უსაფრთხოება</option>
                <option value="other">სხვა</option>
              </select>
            </div>
            <div>
              <label class="form-label">სასურველი დახურვის თარიღი</label>
              <input v-model="extra.closeDate" type="date" class="form-input" />
            </div>
          </div>
        </template>

        <!-- Support -->
        <template v-if="form.category === 'support'">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">პრობლემის ტიპი</label>
              <select v-model="extra.issueType" class="form-select">
                <option value="hardware">აპარატურა</option>
                <option value="software">პროგრამა</option>
                <option value="network">ქსელი</option>
                <option value="other">სხვა</option>
              </select>
            </div>
            <div>
              <label class="form-label">მოწყობილობა</label>
              <input v-model="extra.device" type="text" class="form-input"
                placeholder="მაგ: HP EliteBook 840 G8" />
            </div>
          </div>
          <div>
            <label class="form-label">მუშაობს ნაწილობრივ?</label>
            <div class="flex items-center gap-4 mt-1">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" v-model="extra.partialWork" value="yes" class="accent-primary-600" /> კი
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" v-model="extra.partialWork" value="no" class="accent-primary-600" /> არა, სრულად გათიშულია
              </label>
            </div>
          </div>
        </template>
      </div>

      <!-- Description & justification -->
      <div class="card p-6 space-y-4">
        <h2 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">აღწერა და დასაბუთება</h2>
        <div>
          <label class="form-label">დეტალური აღწერა <span class="text-red-500">*</span></label>
          <textarea v-model="form.description" rows="4" class="form-input resize-none"
            placeholder="რა არის საჭირო, რა პრობლემაა, რა ქმედება უნდა განხორციელდეს" required />
        </div>
        <div>
          <label class="form-label">დასაბუთება <span class="text-red-500">*</span></label>
          <textarea v-model="form.justification" rows="3" class="form-input resize-none"
            placeholder="რატომ არის საჭირო ეს მოთხოვნა" required />
        </div>
      </div>

      <!-- File attachments -->
      <div class="card p-6 space-y-4">
        <h2 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">დანართები</h2>

        <!-- Drop zone -->
        <div
          class="relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
          :class="isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 hover:border-primary-400 hover:bg-gray-50'"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
          @click="fileInputRef?.click()"
        >
          <input
            ref="fileInputRef"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
            class="hidden"
            @change="onFileSelect"
          />
          <div class="flex flex-col items-center gap-3 pointer-events-none">
            <div class="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">
                ჩააგდეთ ფაილები აქ ან <span class="text-primary-600">დაათვალიერეთ</span>
              </p>
              <p class="text-xs text-gray-400 mt-1">PNG, JPG, PDF, DOC, XLS — მაქს. 10MB თითო ფაილზე</p>
            </div>
          </div>
        </div>

        <!-- File list -->
        <div v-if="attachments.length > 0" class="space-y-2">
          <div
            v-for="(file, i) in attachments"
            :key="i"
            class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 group"
          >
            <!-- Icon by type -->
            <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
              :class="fileIconBg(file.type)">
              {{ fileIconEmoji(file.type) }}
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 truncate">{{ file.name }}</p>
              <p class="text-xs text-gray-400">{{ formatSize(file.size) }}</p>
            </div>

            <!-- Preview thumbnail for images -->
            <img
              v-if="file.preview"
              :src="file.preview"
              class="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
            />

            <!-- Remove -->
            <button
              type="button"
              @click="removeFile(i)"
              class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error -->
        <p v-if="fileError" class="text-xs text-red-500 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ fileError }}
        </p>
      </div>

      <!-- Submit -->
      <div class="flex items-center justify-end gap-3">
        <button type="button" @click="$router.back()" class="btn-secondary">გაუქმება</button>
        <button type="submit" :disabled="submitting" class="btn-primary px-8">
          <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ submitting ? 'იგზავნება...' : 'მოთხოვნის გაგზავნა' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { createRequest, categoryLabel } = useRequests()
const router = useRouter()

const categoryLabelMap: Record<string, string> = {
  hardware: 'აპარატურა', software: 'პროგრამული', access: 'წვდომა', support: 'ტექ. მხარდაჭერა', other: 'სხვა'
}

const regions = [
  'თბილისი', 'ქუთაისი', 'ბათუმი', 'რუსთავი', 'გორი', 'ზუგდიდი',
  'ფოთი', 'სამტრედია', 'ოზურგეთი', 'ამბროლაური', 'ახალციხე', 'თელავი'
]

const form = reactive({
  category: '' as any,
  subcategory: '',
  title: '',
  priority: 'medium' as any,
  region: '',
  deadline: '',
  forWhom: '',
  location: '',
  description: '',
  justification: '',
  quantity: 1,
  department: 'IT'
})

const extra = reactive({
  hwType: 'new', damageDesc: '',
  softwareName: '', softwareAction: 'install', targetDevice: '',
  systemName: '', accessType: 'read', accessTemp: 'no',
  closeReason: 'resign', closeDate: '',
  issueType: 'hardware', device: '', partialWork: 'yes'
})

const submitting = ref(false)

// ── File attachment logic ──────────────────────────────────────────────
interface AttachedFile {
  name: string
  size: number
  type: string
  preview?: string
}

const attachments = ref<AttachedFile[]>([])
const isDragging = ref(false)
const fileError = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

const processFiles = (files: FileList | File[]) => {
  fileError.value = ''
  Array.from(files).forEach(file => {
    if (file.size > MAX_SIZE) {
      fileError.value = `"${file.name}" ძალიან დიდია (მაქს. 10MB).`
      return
    }
    if (attachments.value.find(a => a.name === file.name && a.size === file.size)) return

    const entry: AttachedFile = { name: file.name, size: file.size, type: file.type }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = e => { entry.preview = e.target?.result as string }
      reader.readAsDataURL(file)
    }

    attachments.value.push(entry)
  })
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) processFiles(e.dataTransfer.files)
}

const onFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) processFiles(input.files)
  input.value = ''
}

const removeFile = (i: number) => attachments.value.splice(i, 1)

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const fileIconEmoji = (type: string) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type === 'application/pdf') return '📄'
  if (type.includes('word')) return '📝'
  if (type.includes('sheet') || type.includes('excel')) return '📊'
  return '📎'
}

const fileIconBg = (type: string) => {
  if (type.startsWith('image/')) return 'bg-purple-50'
  if (type === 'application/pdf') return 'bg-red-50'
  if (type.includes('word')) return 'bg-blue-50'
  if (type.includes('sheet') || type.includes('excel')) return 'bg-green-50'
  return 'bg-gray-100'
}

// ── Submit ──────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  submitting.value = true
  await new Promise(r => setTimeout(r, 600))
  const req = createRequest({
    ...form,
    requester: 'გიორგი ბერიძე',
    attachments: attachments.value.map(f => f.name)
  })
  submitting.value = false
  router.push(`/requests/${req.id}`)
}
</script>
