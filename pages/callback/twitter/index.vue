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
    const isLoginTwitterSuccess = Boolean(
      this.$route.query.oauth_token && this.$route.query.oauth_verifier
    )
    if (isLoginTwitterSuccess) {
      try {
        const data = await this.$api.redirectLoginByTwitter(
          this.$route.query.oauth_token,
          this.$route.query.oauth_verifier
        )
        const currentUser = useCurrentUserStore()
        currentUser.setCurrentUser(data.data.user)
        this.$router.push({ path: this.localePath('/') })
      } catch (e) {
        // TODO task show message
      }
    } else {
      this.$router.push({ path: this.localePath('/signin') })
    }
  },
}
</script>
