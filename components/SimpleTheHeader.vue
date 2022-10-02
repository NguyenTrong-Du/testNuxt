<template>
  <div class="w-full bg-[#05293C] top-0">
    <div class="shadow-xl border-b-2 border-zinc-300 flex justify-between">
      <div>
        <div class="font-mono ml-10 mt-4 font-bold">NODEYE</div>
        <div></div>
      </div>
      <div class="flex mr-10 mt-2 mb-2">
        <div class="ml-4 flex">
          <div class="flex items-center">
            <div class="flex items-center mr-5">
              <a-avatar
                :src="avtUrl"
                :size="32"
                class="flex items-center justify-center"
              >
              </a-avatar>
              <a-dropdown class="ml-1 flex items-center gap-1">
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                  {{ userName }}
                  <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <nuxt-link to="/profile"
                      >{{ $t('homepage.profile') }} <br
                    /></nuxt-link>
                  </a-menu-item>
                  <a-menu-item>
                    <nuxt-link to="/setting"
                      >{{ $t('homepage.setting') }} <br
                    /></nuxt-link>
                  </a-menu-item>
                  <a-menu-item @click="handleLogout">{{
                    $t('homepage.logout')
                  }}</a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
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
                    <nuxt-link
                      :to="switchLocalePath(locale.code)"
                      class="m-5"
                      >{{ locale.name }}</nuxt-link
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
export default {
  name: 'App',
  components: {
    MdGlobeIcon,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    avtUrl: {
      type: String,
      default: '',
    },
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
  },
  methods: {
    async handleLogout() {
      try {
        await this.$api.logout()
        this.$router.push({ path: this.localePath('signin') })
      } catch {
        // TODO
      }
    },
  },
}
</script>
<style>
.ion {
  fill: #fff;
}
</style>
