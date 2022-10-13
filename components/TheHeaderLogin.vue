<template>
  <div class="flex justify-between m-8">
    <div>
      <nuxt-link
        :to="`${$i18n.locale === 'ja' ? '/ja/signin' : '/signin'}`"
        class="mr-10 text-lg"
        :class="{ underline: !isSignup }"
        >{{ $t('homepage.login') }}</nuxt-link
      >
      <nuxt-link
        :to="`${$i18n.locale === 'ja' ? '/ja/signup' : '/signup'}`"
        class="text-lg"
        :class="{ underline: isSignup }"
        >{{ $t('homepage.register') }}</nuxt-link
      >
    </div>
    <DropDownLanguage class-prop="flex items-center mr-10" />
  </div>
</template>

<script>
import DropDownLanguage from './DropDownLanguage.vue'
export default {
  name: 'HeaderLogin',
  components: {
    DropDownLanguage,
  },
  data() {
    return {
      collapsed: false,
      size: 'large',
      isSignup: $nuxt.$route.path.includes('signup'),
    }
  },
  updated() {
    this.isSignup = $nuxt.$route.path.includes('signup')
  },
  async created() {
    try {
      const response = await this.$api.getUser()

      if (
        response.first_name?.trim().length > 0 ||
        response.last_name?.trim().length > 0
      ) {
        this.$router.push({ path: this.localePath('/') })
      }
    } catch (e) {
      if (e.response.status === 401) {
        if (
          !$nuxt.$route.path.includes('signin') &&
          !$nuxt.$route.path.includes('signup') &&
          !$nuxt.$route.path === '/'
        ) {
          this.$router.push({
            path: this.localePath(
              `${$i18n.locale === 'ja' ? '/ja/signup' : '/signup'}`
            ),
          })
        }
      }
    }
  },
}
</script>
