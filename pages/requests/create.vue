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

const handleSubmit = async () => {
  submitting.value = true
  await new Promise(r => setTimeout(r, 600))
  const req = createRequest({ ...form, requester: 'გიორგი ბერიძე' })
  submitting.value = false
  router.push(`/requests/${req.id}`)
}
</script>
