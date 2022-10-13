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
    const isLoginInstagramSuccess = Boolean(this.$route.query.code)
    const locale = localStorage.getItem('locale')
    if (isLoginInstagramSuccess) {
      try {
        const data = await this.$api.redirectLoginByInstagram(
          this.$route.query.code
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
