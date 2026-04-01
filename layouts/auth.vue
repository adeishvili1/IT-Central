<template>
  <div class="h-screen flex overflow-hidden">

    <!-- Left: Form panel -->
    <div class="w-full lg:w-[45%] flex flex-col items-center justify-center px-10 py-12 bg-white overflow-y-auto">
      <slot />
    </div>

    <!-- Right: Brand panel -->
    <div
      class="hidden lg:flex lg:w-[55%] relative flex-col justify-center p-16 overflow-hidden"
      style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%);"
    >
      <!-- Decorative blobs -->
      <div class="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style="background: rgba(255,255,255,0.04);" />
      <div class="absolute bottom-0 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style="background: rgba(255,255,255,0.04);" />
      <div class="absolute top-1/2 right-16 w-40 h-40 rounded-full pointer-events-none"
        style="background: rgba(255,255,255,0.06);" />

      <div class="relative z-10 max-w-lg">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="Logo" class="w-14 h-14 object-contain flex-shrink-0" style="filter: brightness(0) invert(1);" />
          <p class="text-xl font-bold text-white">IT Central</p>
        </div>

        <!-- Heading -->
        <h1 class="text-5xl font-bold text-white leading-tight mb-6" style="line-height:1.15">
          ცენტრალური IT<br />მოთხოვნების<br />მართვის სისტემა
        </h1>

        <!-- Description -->
        <p class="text-lg leading-relaxed mb-12" style="color:rgba(255,255,255,0.75)">
          ერთიანი პლატფორმა IT მოთხოვნების რეგისტრაციის,
          განხილვის, დამტკიცებისა და შესრულების კონტროლისთვის.
        </p>

        <!-- Features -->
        <ul class="space-y-5">
          <li v-for="item in features" :key="item" class="flex items-center gap-4">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style="background:rgba(255,255,255,0.15)"
            >
              <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span class="text-base" style="color:rgba(255,255,255,0.85)">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <p class="absolute bottom-8 left-16 text-sm z-10" style="color:rgba(255,255,255,0.4)">
        © {{ new Date().getFullYear() }} IT Central. ყველა უფლება დაცულია.
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
const features = [
  'მოთხოვნების სრული ისტორია და სტატუსი',
  'მოწონება / უარყოფა ონლაინ',
  'პასუხისმგებელი პირის განსაზღვრა',
  'SLA კონტროლი და ვადების მონიტორინგი',
  'ანგარიშები და ანალიტიკა'
]
</script>
