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
    const isLoginGoogleSuccess = Boolean(this.$route.query.code)
    if (isLoginGoogleSuccess) {
      try {
        const data = await this.$api.redirectLoginByGoogle(
          this.$route.query.code
        )
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
