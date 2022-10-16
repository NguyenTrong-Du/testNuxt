<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin />
  </div>
</template>

<script>
import useNextRoute from '@/composables/useNextRoute'
export default {
  name: 'CallbackLoading',
  async created() {
    const { nextRouteCheckFinishedBasicInfo } = useNextRoute()
    const isLoginTwitterSuccess = Boolean(
      this.$route.query.oauth_token && this.$route.query.oauth_verifier
    )
    const locale = localStorage.getItem('locale')
    if (isLoginTwitterSuccess) {
      try {
        const data = await this.$api.redirectLoginByTwitter(
          this.$route.query.oauth_token,
          this.$route.query.oauth_verifier
        )
        this.$i18n.setLocale(locale)
        nextRouteCheckFinishedBasicInfo(data.data.user)
      } catch (e) {
        // TODO task show message
      }
    } else {
      this.$router.push({ path: this.localePath('/signin') })
    }
  },
}
</script>
