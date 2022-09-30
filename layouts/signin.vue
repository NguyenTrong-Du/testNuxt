<template>
  <a-spin :spinning="isLoadingUser">
    <div class="h-screen flex">
      <div class="w-1/3">
        <TheHeaderLogin />
        <nuxt />
      </div>
      <div class="w-2/3 flex justify-center">
        <div
          class="circular w-full bg-cover bg-no-repeat bg-center"
          :style="{ backgroundImage: `url(${backgroundUrl})` }"
        ></div>
      </div>
    </div>
  </a-spin>
</template>

<script>
import backgroundUrl from '~/assets/img/banner.avif'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'SignIn',
  data() {
    return {
      backgroundUrl,
      isLoadingUser: true,
    }
  },
  async created() {
    try {
      const response = await this.$api.getUser()
      const currentUser = useCurrentUserStore()
      if (
        response.first_name?.trim().length > 0 ||
        response.last_name?.trim().length > 0
      ) {
        this.isLoadingUser = false
        currentUser.setCurrentUser(response)
        this.$router.push({ path: this.localePath('/') })
      }
    } catch (e) {
      this.isLoadingUser = false
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
