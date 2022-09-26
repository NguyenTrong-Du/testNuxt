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
    if (this.$route.query.oauth_token && this.$route.query.oauth_verifier) {
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
    }
  },
}
</script>
