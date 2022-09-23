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
    if (this.$route.query.code) {
      const data = await this.$api.redirectLoginByGg(this.$route.query.code)
      const currentUser = useCurrentUserStore()
      currentUser.setCurrentUser(data.data.user)
      this.$router.push({ path: this.localePath('/') })
    }
  },
}
</script>
