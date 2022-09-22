<template>
  <div>
    <div class="grid grid-rows-auto-1fr h-screen overflow-hidden">
      <div v-if="userName.trim().length === 0"><TheHeader /></div>
      <div v-else><SimpleTheHeader :user-name="userName" /></div>
      <div class="overflow-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import SimpleTheHeader from '~/components/SimpleTheHeader.vue'
import TheHeader from '~/components/TheHeader.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'App',
  components: {
    TheHeader,
    SimpleTheHeader,
  },
  data() {
    return {
      collapsed: false,
      userName: '',
    }
  },
  async created() {
    const currentUser = useCurrentUserStore()
    if (currentUser.firstName.trim().length > 0) {
      this.userName =
        currentUser.displayName ||
        currentUser.firstName + ' ' + currentUser.lastName
    } else {
      try {
        const response = await this.$api.getUser()
        this.userName =
          response.display_name ||
          response.first_name + ' ' + response.last_name
        currentUser.setCurrentUser(response)
      } catch (e) {
        if (
          !$nuxt.$route.path.includes('signin') &&
          !$nuxt.$route.path.includes('signup') &&
          !$nuxt.$route.path === '/'
        ) {
          this.$router.push({ path: this.localePath('/signin') })
        }
      }
    }
  },
}
</script>
