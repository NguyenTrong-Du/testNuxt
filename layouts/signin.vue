<template>
  <div class="h-screen flex">
    <div class="w-1/3 flex justify-center">
      <div
        class="circular w-full bg-cover bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      ></div>
    </div>
    <div class="w-2/3">
      <TheHeaderLogin />
      <nuxt />
    </div>
  </div>
</template>

<script>
import backgroundUrl from '~/assets/img/banner.avif'
export default {
  name: 'SignIn',
  data() {
    return {
      backgroundUrl,
    }
  },
}
</script>
