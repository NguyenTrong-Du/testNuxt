<template>
  <div class="bg-[#9CA3AF] h-full flex items-center pt-12">HOMEPAGE</div>
</template>

<script>
import backgroundUrl from '~/assets/img/bg.avif'
export default {
  name: 'App',
  layout: 'homepage',
  data() {
    return {
      collapsed: false,
      size: 'large',
      backgroundUrl,
    }
  },
}
</script>
