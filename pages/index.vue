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
        v-show="isShow"
        shape="round"
        :size="size"
        class="bg-white text-black"
      >
        <nuxt-link :to="`${$i18n.locale === 'ja' ? '/ja/signin' : '/signin'}`">
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
      isShow: true,
    }
  },
  created() {
    const { displayName, firstName } = useCurrentUserStore()
    if (displayName || firstName) this.isShow = false
  },
}
</script>
