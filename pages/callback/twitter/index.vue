<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin />
  </div>
</template>

<script>
import useNotification from '~/composables/useNotification'
import { useCurrentUserStore } from '~/store/user'
import useNextRoute from '@/composables/useNextRoute'
export default {
  name: 'CallbackLoading',
  async created() {
    const { notification } = useNotification()
    const { nextRouteCheckFinishedBasicInfo } = useNextRoute()
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
        nextRouteCheckFinishedBasicInfo(currentUser)
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
