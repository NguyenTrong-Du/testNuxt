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
    <div class="flex items-center mr-10">
      <MdGlobeIcon w="25px" h="25px" />
      <a-dropdown class="ml-1 flex items-center gap-1">
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          {{ $i18n.locale === 'en' ? 'English' : '日本語' }}
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="locale in availableLocales" :key="locale.code">
            <nuxt-link :to="switchLocalePath(locale.code)" class="m-5">{{
              locale.name
            }}</nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
export default {
  name: 'HeaderLogin',
  components: {
    MdGlobeIcon,
  },
  data() {
    return {
      collapsed: false,
      size: 'large',
      isSignup: $nuxt.$route.path.includes('signup'),
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
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
