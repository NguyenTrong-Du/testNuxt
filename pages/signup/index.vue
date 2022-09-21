<template>
  <div class="h-full flex">
    <div class="w-1/2 flex justify-center">
      <img
        :src="bannerURL"
        min-width="100%"
        min-height="100%"
        class="shrink-0"
      />
    </div>
    <div class="w-1/2 ml-10">
      <TheHeaderLogin />
      <div class="flex justify-center m-5 text-xl font-bold">
        {{ $t('homepage.titleRegister') }}
      </div>
      <TheSns />
      <div class="flex justify-center m-5">
        {{ $t('homepage.or') }}
      </div>
      <div class="flex justify-center mt-5">
        <div
          class="h-12 w-1/2 bg-white rounded-lg flex items-center text-black font-semibold cursor-pointer"
          @click="$router.push({ path: localePath('/signup/email') })"
        >
          <img
            :src="emailLogoURL"
            width="20px"
            height="20px"
            class="mr-3 ml-3"
          />
          {{ $t('homepage.loginByEmail') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderLogin from '~/components/TheHeaderLogin.vue'
import TheSns from '~/components/TheSns.vue'
export default {
  name: 'SignIn',
  components: {
    TheSns,
    TheHeaderLogin,
  },
  layout: 'signin',
  data() {
    return {
      collapsed: false,
      size: 'large',
      emailLogoURL: '/icon-email.png',
      bannerURL: '/banner.jpg',
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
}
</script>
