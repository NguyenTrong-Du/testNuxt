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
    const isLoginInstagramSuccess = Boolean(this.$route.query.code)
    if (isLoginInstagramSuccess) {
      try {
        const data = await this.$api.redirectLoginByInstagram(
          this.$route.query.code
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
