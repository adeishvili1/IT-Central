<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6">

    <div class="card p-6 flex items-center gap-5">
      <div class="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
        {{ initials }}
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-900">{{ fullName }}</h2>
        <p class="text-sm text-gray-500">{{ currentUser.email }}</p>
        <span class="badge bg-primary-100 text-primary-700 text-xs mt-1">{{ roleLabel[currentUser.role] }}</span>
      </div>
    </div>

    <div class="card p-6 space-y-5">
      <h3 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">პირადი ინფორმაცია</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="form-label">სახელი</label>
          <input :value="currentUser.name" type="text" class="form-input" />
        </div>
        <div>
          <label class="form-label">გვარი</label>
          <input :value="currentUser.surname" type="text" class="form-input" />
        </div>
        <div class="col-span-2">
          <label class="form-label">ელ-ფოსტა</label>
          <input :value="currentUser.email" type="email" class="form-input" />
        </div>
        <div>
          <label class="form-label">რეგიონი</label>
          <input :value="currentUser.region" type="text" class="form-input" />
        </div>
        <div>
          <label class="form-label">განყოფილება</label>
          <input :value="currentUser.department" type="text" class="form-input" />
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn-primary">შენახვა</button>
      </div>
    </div>

    <div class="card p-6 space-y-4">
      <h3 class="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">პაროლის შეცვლა</h3>
      <div class="space-y-3">
        <div>
          <label class="form-label">მიმდინარე პაროლი</label>
          <input type="password" class="form-input" />
        </div>
        <div>
          <label class="form-label">ახალი პაროლი</label>
          <input type="password" class="form-input" />
        </div>
        <div>
          <label class="form-label">გაიმეორეთ ახალი პაროლი</label>
          <input type="password" class="form-input" />
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn-primary">პაროლის შეცვლა</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { currentUser, initials, fullName } = useAuth()

const roleLabel: Record<string, string> = {
  admin: 'ადმინ',
  central_it: 'ცენტრ. IT',
  regional_it: 'რეგიონ. IT',
  manager: 'მენეჯერი'
}
</script>
