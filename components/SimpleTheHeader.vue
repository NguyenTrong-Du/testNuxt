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
            <DropDownLanguage class-prop="flex items-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDownLanguage from './DropDownLanguage.vue'
export default {
  name: 'App',
  components: {
    DropDownLanguage,
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
  methods: {
    async handleLogout() {
      try {
        this.$emit('set-is-loading-user', true)
        await this.$api.logout()
        this.$emit('set-is-loading-user', false)
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
