<template>
  <div class="p-4 sm:p-6 w-full max-w-5xl mx-auto space-y-5">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-2">
      <button @click="$router.back()"
        class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">ახალი IT მოთხოვნა</h1>
        <p class="text-sm text-gray-400">შეავსეთ ქვემოთ მოცემული ველები</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">

      <!-- Step 1: Category -->
      <div class="card p-5">
        <div class="flex items-center gap-2.5 mb-4">
          <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
          <h2 class="text-sm font-semibold text-gray-800">კატეგორია</h2>
        </div>

        <!-- Category cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            @click="form.category = cat.value; form.subcategory = ''"
            :class="form.category === cat.value
              ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-400'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'"
            class="flex flex-col items-center gap-2.5 py-5 px-3 rounded-xl border-2 transition-all cursor-pointer"
          >
            <span class="text-3xl">{{ cat.emoji }}</span>
            <span class="text-xs font-semibold leading-tight text-center">{{ cat.label }}</span>
          </button>
        </div>

        <!-- Subcategory -->
        <div v-if="form.category">
          <label class="form-label">ქვეკატეგორია <span class="text-red-500">*</span></label>
          <select v-model="form.subcategory" class="form-select" required>
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

        <div v-else class="text-xs text-gray-400 text-center py-2">
          აირჩიეთ კატეგორია ქვეკატეგორიის სანახავად
        </div>
      </div>

      <!-- Step 2: Basic info -->
      <div class="card p-6 space-y-5">
        <div class="flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
          <h2 class="text-sm font-semibold text-gray-800">ძირითადი ინფორმაცია</h2>
        </div>

        <!-- Title + Priority side by side on large screens -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label class="form-label">სათაური <span class="text-red-500">*</span></label>
            <input v-model="form.title" type="text" class="form-input"
              placeholder="მოკლე და გასაგები სათაური" required maxlength="120" />
            <p class="text-xs text-gray-400 mt-1 text-right">{{ form.title.length }}/120</p>
          </div>

          <!-- Priority pills -->
          <div>
            <label class="form-label">პრიორიტეტი <span class="text-red-500">*</span></label>
            <div class="flex gap-2 mt-1">
              <button
                v-for="p in priorities"
                :key="p.value"
                type="button"
                @click="form.priority = p.value"
                :class="form.priority === p.value ? p.active : p.inactive"
                class="flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold border transition-all"
              >
                {{ p.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Region + Deadline + For whom + Location in 4 cols on large -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div>
            <label class="form-label">ვისთვისაა <span class="text-red-500">*</span></label>
            <input v-model="form.forWhom" type="text" class="form-input"
              placeholder="სახელი გვარი ან განყოფ." required />
          </div>
          <div>
            <label class="form-label">ადგილმდებარეობა / ოთახი</label>
            <input v-model="form.location" type="text" class="form-input"
              placeholder="მაგ: სართ. 3, ოთახი 302" />
          </div>
        </div>
      </div>

      <!-- Step 3: Dynamic fields -->
      <div v-if="form.category" class="card p-5 space-y-4">
        <div class="flex items-center gap-2.5 mb-1">
          <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
          <h2 class="text-sm font-semibold text-gray-800">
            დამატებითი ინფორმაცია
            <span class="text-gray-400 font-normal">— {{ categoryLabelMap[form.category] }}</span>
          </h2>
        </div>

        <!-- Hardware -->
        <template v-if="form.category === 'hardware'">
          <div class="grid grid-cols-2 gap-3">
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
          <div class="grid grid-cols-2 gap-3">
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
          <div class="grid grid-cols-2 gap-3">
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
            <div class="flex gap-3 mt-1">
              <label v-for="opt in [{v:'no',l:'მუდმივი'},{v:'yes',l:'დროებითი'}]" :key="opt.v"
                :class="extra.accessTemp === opt.v
                  ? 'border-primary-400 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition-all">
                <input type="radio" v-model="extra.accessTemp" :value="opt.v" class="hidden" />
                {{ opt.l }}
              </label>
            </div>
          </div>
        </template>

        <!-- Access close -->
        <template v-if="form.category === 'access' && form.subcategory === 'წვდომის დახურვა'">
          <div class="grid grid-cols-2 gap-3">
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
          <div class="grid grid-cols-2 gap-3">
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
            <div class="flex gap-3 mt-1">
              <label v-for="opt in [{v:'yes',l:'კი, ნაწილობრივ'},{v:'no',l:'სრულად გათიშულია'}]" :key="opt.v"
                :class="extra.partialWork === opt.v
                  ? 'border-primary-400 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition-all">
                <input type="radio" v-model="extra.partialWork" :value="opt.v" class="hidden" />
                {{ opt.l }}
              </label>
            </div>
          </div>
        </template>
      </div>

      <!-- Step 4: Description -->
      <div class="card p-6 space-y-5">
        <div class="flex items-center gap-2.5 mb-1">
          <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{{ form.category ? '4' : '3' }}</span>
          <h2 class="text-sm font-semibold text-gray-800">აღწერა და დასაბუთება</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label class="form-label">დეტალური აღწერა <span class="text-red-500">*</span></label>
            <textarea v-model="form.description" rows="5" class="form-input resize-none"
              placeholder="რა არის საჭირო, რა პრობლემაა, რა ქმედება უნდა განხორციელდეს" required />
          </div>
          <div>
            <label class="form-label">დასაბუთება <span class="text-red-500">*</span></label>
            <textarea v-model="form.justification" rows="5" class="form-input resize-none"
              placeholder="რატომ არის საჭირო ეს მოთხოვნა" required />
          </div>
        </div>
      </div>

      <!-- Step 5: Attachments -->
      <div class="card p-5 space-y-3">
        <div class="flex items-center gap-2.5 mb-1">
          <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{{ form.category ? '5' : '4' }}</span>
          <h2 class="text-sm font-semibold text-gray-800">დანართები <span class="text-gray-400 font-normal text-xs">(არასავ.)</span></h2>
        </div>

        <!-- Drop zone -->
        <div
          class="relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer"
          :class="isDragging
            ? 'border-primary-400 bg-primary-50'
            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
          @click="fileInputRef?.click()"
        >
          <input ref="fileInputRef" type="file" multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
            class="hidden" @change="onFileSelect" />
          <div class="flex flex-col items-center gap-2 pointer-events-none">
            <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p class="text-sm text-gray-500">
              <span class="font-semibold text-primary-600">ფაილის არჩევა</span> ან ჩააგდეთ აქ
            </p>
            <p class="text-xs text-gray-400">PNG, JPG, PDF, DOC, XLS · მაქს. 10MB</p>
          </div>
        </div>

        <!-- File list -->
        <div v-if="attachments.length > 0" class="space-y-2">
          <div v-for="(file, i) in attachments" :key="i"
            class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
              :class="fileIconBg(file.type)">
              {{ fileIconEmoji(file.type) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 truncate">{{ file.name }}</p>
              <p class="text-xs text-gray-400">{{ formatSize(file.size) }}</p>
            </div>
            <img v-if="file.preview" :src="file.preview"
              class="w-9 h-9 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
            <button type="button" @click="removeFile(i)"
              class="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <p v-if="fileError" class="text-xs text-red-500 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ fileError }}
        </p>
      </div>

      <!-- Submit bar -->
      <div class="flex items-center justify-between gap-3 py-2">
        <button type="button" @click="$router.back()" class="btn-secondary">
          გაუქმება
        </button>
        <button type="submit" :disabled="submitting || !form.category" class="btn-primary px-8">
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

const { createRequest } = useRequests()
const router = useRouter()

const categories = [
  { value: 'hardware', label: 'აპარატურა',    emoji: '🖥️' },
  { value: 'software', label: 'პროგრამული',   emoji: '💿' },
  { value: 'access',   label: 'წვდომა',        emoji: '🔐' },
  { value: 'support',  label: 'მხარდაჭერა',   emoji: '🔧' },
  { value: 'other',    label: 'სხვა',           emoji: '📋' }
]

const priorities = [
  { value: 'low',      label: 'დაბალი',    active: 'border-gray-400 bg-gray-100 text-gray-700',    inactive: 'border-gray-200 text-gray-400 hover:border-gray-300' },
  { value: 'medium',   label: 'საშუალო',   active: 'border-blue-400 bg-blue-50 text-blue-700',     inactive: 'border-gray-200 text-gray-400 hover:border-gray-300' },
  { value: 'high',     label: 'მაღალი',    active: 'border-orange-400 bg-orange-50 text-orange-700', inactive: 'border-gray-200 text-gray-400 hover:border-gray-300' },
  { value: 'critical', label: 'კრიტიკული', active: 'border-red-400 bg-red-50 text-red-700',        inactive: 'border-gray-200 text-gray-400 hover:border-gray-300' }
]

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
interface AttachedFile { name: string; size: number; type: string; preview?: string }

const attachments = ref<AttachedFile[]>([])
const isDragging = ref(false)
const fileError = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)
const MAX_SIZE = 10 * 1024 * 1024

const processFiles = (files: FileList | File[]) => {
  fileError.value = ''
  Array.from(files).forEach(file => {
    if (file.size > MAX_SIZE) { fileError.value = `"${file.name}" ძალიან დიდია (მაქს. 10MB).`; return }
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

const onDrop = (e: DragEvent) => { isDragging.value = false; if (e.dataTransfer?.files) processFiles(e.dataTransfer.files) }
const onFileSelect = (e: Event) => { const input = e.target as HTMLInputElement; if (input.files) processFiles(input.files); input.value = '' }
const removeFile = (i: number) => attachments.value.splice(i, 1)
const formatSize = (bytes: number) => bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes/1024).toFixed(1)} KB` : `${(bytes/1048576).toFixed(1)} MB`
const fileIconEmoji = (type: string) => type.startsWith('image/') ? '🖼️' : type === 'application/pdf' ? '📄' : type.includes('word') ? '📝' : type.includes('sheet') || type.includes('excel') ? '📊' : '📎'
const fileIconBg = (type: string) => type.startsWith('image/') ? 'bg-purple-50' : type === 'application/pdf' ? 'bg-red-50' : type.includes('word') ? 'bg-blue-50' : type.includes('sheet') || type.includes('excel') ? 'bg-green-50' : 'bg-gray-100'

// ── Submit ──────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  submitting.value = true
  await new Promise(r => setTimeout(r, 600))
  const req = createRequest({ ...form, requester: 'გიორგი ბერიძე', attachments: attachments.value.map(f => f.name) })
  submitting.value = false
  router.push(`/requests/${req.id}`)
}
</script>
