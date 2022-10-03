<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin />
  </div>
</template>

<script>
import { useCurrentUserStore } from '~/store/user'
import useNotification from '@/composables/useNotification'
export default {
  name: 'CallbackLoading',
  async created() {
    const { notification } = useNotification()
    const isLoginFacebookSuccess = Boolean(this.$route.query.code)
    if (isLoginFacebookSuccess) {
      try {
        const data = await this.$api.redirectLoginByFacebook(
          this.$route.query.code
        )
        const currentUser = useCurrentUserStore()
        currentUser.setCurrentUser(data.data.user)
        if (!currentUser.hasFinishedBasicInfo) {
          this.$router.push({ path: this.localePath('/info') })
        } else {
          this.$router.push({ path: this.localePath('/') })
        }
        notification(
          this.$notification,
          'success',
          this.$t('homepage.signinSuccess'),
          ''
        )
      } catch (e) {
        // TODO task show message
      }
    } else {
      this.$router.push({ path: this.localePath('/signin') })
    }
  },
}
</script>
