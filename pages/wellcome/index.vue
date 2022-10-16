<template>
  <div
    class="h-full flex items-center pt-12"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  >
    <div class="ml-20">
      <div class="text-black w-[1/3] text-xl mb-4">
        {{ $t('homepage.title1') }}
        <br />
        {{ $t('homepage.title2') }}
      </div>
      <a-button
        v-show="isNotLoggedIn"
        shape="round"
        :size="size"
        class="bg-green-700 text-white"
      >
        <nuxt-link :to="`${$i18n.locale === 'ja' ? '/ja/signup' : '/signup'}`">
          {{ $t('homepage.joinNow') }}
        </nuxt-link>
      </a-button>
    </div>
  </div>
</template>

<script>
import backgroundUrl from '~/assets/img/bg.avif'
import { useCurrentUserStore } from '~/store/user'
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
  computed: {
    isNotLoggedIn() {
      const { displayName, firstName } = useCurrentUserStore()
      if (displayName || firstName) return false
      return true
    },
  },
}
</script>
<style scoped>
.ant-btn:hover {
  border-color: rgb(7, 117, 44);
  color: rgb(251, 251, 251);
  background-color: rgb(8, 185, 126);
}
</style>
