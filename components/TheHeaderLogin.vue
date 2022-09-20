<template>
  <div class="flex justify-between mt-10 mb-10">
    <div>
      <nuxt-link to="/signin" class="mr-10 text-lg">{{
        $t('homepage.login')
      }}</nuxt-link>
      <nuxt-link to="/signup" class="text-lg">{{
        $t('homepage.register')
      }}</nuxt-link>
    </div>
    <div class="flex items-center mr-10">
      <MdGlobeIcon w="25px" h="25px" />
      <a-dropdown class="ml-1" style="display: flex; align-items: center">
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          {{ $i18n.locale === 'en' ? 'English' : '日本語' }}
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="m-5"
            >{{ locale.name }} <br
          /></nuxt-link>
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
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
  async created() {
    try {
      const response = await this.$api.getUser()
      if (
        response.first_name.trim().length > 0 ||
        response.last_name.trim().length > 0
      ) {
        this.$router.push({ path: this.localePath('/') })
      }
    } catch (e) {
      if (
        !$nuxt.$route.path.includes('signin') &&
        !$nuxt.$route.path.includes('signup')
      ) {
        this.$router.push({ path: this.localePath('/signin') })
      }
    }
  },
}
</script>
