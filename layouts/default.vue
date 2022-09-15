<template>
  <div>
    <div class="grid grid-rows-auto-1fr h-screen overflow-hidden">
      <TheHeader />
      <div class="overflow-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
  },
  data() {
    return {
      collapsed: false,
    }
  },
}
</script>
