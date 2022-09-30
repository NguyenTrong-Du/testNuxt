<template>
  <div class="w-full bg-[#05293C] top-0">
    <div class="shadow-xl border-b-2 border-zinc-300 flex justify-between">
      <div class="font-mono ml-10 mt-4 font-bold">NODEYE</div>
      <div class="flex mr-10 mt-2 mb-2 gap-3">
        <div v-show="isNotLoadingUser">
          <a-button type="text" shape="round">
            <nuxt-link
              :to="`${$i18n.locale === 'ja' ? '/ja/signin' : '/signin'}`"
            >
              {{ $t('homepage.login') }}
            </nuxt-link>
          </a-button>
          <a-button shape="round" class="bg-green-700 text-white">
            <nuxt-link
              :to="`${$i18n.locale === 'ja' ? '/ja/signup' : '/signup'}`"
            >
              {{ $t('homepage.register') }}
            </nuxt-link>
          </a-button>
        </div>
        <div class="ml-4 flex">
          <div class="flex items-center">
            <MdGlobeIcon w="25px" h="25px" />
            <a-dropdown class="ml-1 flex items-center gap-1">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ $i18n.locale === 'en' ? 'English' : '日本語' }}
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item
                  v-for="locale in availableLocales"
                  :key="locale.code"
                >
                  <nuxt-link :to="switchLocalePath(locale.code)" class="m-5">{{
                    locale.name
                  }}</nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'App',
  components: {
    MdGlobeIcon,
  },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
    isNotLoadingUser() {
      const { isLoadingUser } = useCurrentUserStore()
      return !isLoadingUser
    },
  },
}
</script>
<style>
.ion {
  fill: #fff;
}
</style>
