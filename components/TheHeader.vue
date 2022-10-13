<template>
  <div class="w-full bg-[#05293C] top-0">
    <div class="shadow-xl border-b-2 border-zinc-300 flex justify-between">
      <div class="font-mono ml-10 mt-4 font-bold">NODEYE</div>
      <div class="flex mr-10 mt-2 mb-2 gap-3">
        <div v-show="isNotLoadingUser">
          <a-button type="text" shape="round">
            <nuxt-link :to="localePath('/signin')">
              {{ $t('homepage.login') }}
            </nuxt-link>
          </a-button>
          <a-button shape="round" class="bg-green-700 text-white">
            <nuxt-link :to="localePath('/signup')">
              {{ $t('homepage.register') }}
            </nuxt-link>
          </a-button>
        </div>
        <div class="ml-4 flex">
          <DropDownLanguage class-prop="flex items-center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDownLanguage from './DropDownLanguage.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'App',
  components: {
    DropDownLanguage,
  },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
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
