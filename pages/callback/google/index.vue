<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin />
  </div>
</template>

<script>
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'CallbackLoading',
  async created() {
    const isLoginGoogleSuccess = Boolean(this.$route.query.code)
    if (isLoginGoogleSuccess) {
      try {
        const data = await this.$api.redirectLoginByGoogle(
          this.$route.query.code
        )
        const currentUser = useCurrentUserStore()
        currentUser.setCurrentUser(data.data.user)
        if (!currentUser.hasFinishedBasicInfo) {
          this.$router.push({ path: this.localePath('/info') })
        } else {
          this.$router.push({ path: this.localePath('/') })
        }
      } catch (e) {
        // TODO task show message
      }
    } else {
      this.$router.push({ path: this.localePath('/signin') })
    }
  },
}
</script>
