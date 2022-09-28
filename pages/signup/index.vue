<template>
  <div>
    <div class="flex justify-center m-5 text-xl font-bold">
      {{ $t('homepage.titleRegister') }}
    </div>
    <TheSns />
    <div class="flex justify-center m-5">
      {{ $t('homepage.or') }}
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-2/3 bg-white rounded-lg flex items-center text-black font-semibold cursor-pointer"
        @click="$router.push({ path: localePath('/signup/email') })"
      >
        <img :src="emailLogoURL" width="20px" height="20px" class="mr-3 ml-3" />
        {{ $t('homepage.loginByEmail') }}
      </div>
    </div>
  </div>
</template>

<script>
import TheSns from '~/components/TheSns.vue'
export default {
  name: 'SignIn',
  components: {
    TheSns,
  },
  layout: 'signin',
  data() {
    return {
      collapsed: false,
      size: 'large',
      emailLogoURL: '/icon-email.png',
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
}
</script>
