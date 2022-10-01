<template>
  <div>
    <a-spin :spinning="isLoadingUser">
      <div class="grid grid-rows-auto-1fr h-screen overflow-hidden">
        <div v-if="userName?.trim().length === 0"><TheHeader /></div>
        <div v-else><SimpleTheHeader :user-name="userName" /></div>
        <div class="overflow-auto">
          <nuxt />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import SimpleTheHeader from '~/components/SimpleTheHeader.vue'
import TheHeader from '~/components/TheHeader.vue'
import { useCurrentUserStore } from '~/store/user'
import { useRefetchUser } from '~/store/refetch'
export default {
  name: 'App',
  components: {
    TheHeader,
    SimpleTheHeader,
  },
  data() {
    const currentRefetch = useRefetchUser()
    return {
      collapsed: false,
      userName: '',
      isRefetch2: currentRefetch.isRefetch,
      isLoadingUser: true,
      isNotLoadingUser: false,
    }
  },
  computed: {
    isRefetch() {
      const test = useRefetchUser()
      return test.isRefetch
    },
  },
  watch: {
    async isRefetch() {
      try {
        const response = await this.$api.getUser()
        if (response.last_name) {
          this.userName =
            response.display_name ||
            `${response.first_name} ${response.last_name}`
        } else {
          this.userName = response.display_name || response.first_name
        }
        currentUser.setCurrentUser(response)
      } catch (e) {
        // TODO
      }
    },
  },
  async created() {
    const getFullName = (firstName, lastName, displayName) => {
      if (lastName) {
        return displayName || `${firstName} ${lastName}`
      } else {
        return displayName || firstName
      }
    }
    const currentUser = useCurrentUserStore()
    currentUser.setLoadingUser(true)
    if (currentUser.firstName || currentUser.displayName) {
      this.userName = getFullName(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.displayName
      )
      if ($nuxt.$route.path.includes('wellcome')) {
        this.$router.push({ path: this.localePath('/') })
      }
    } else {
      try {
        const response = await this.$api.getUser()
        this.userName = getFullName(
          response.first_name,
          response.last_name,
          response.display_name
        )
        currentUser.setCurrentUser(response)
        if ($nuxt.$route.path.includes('wellcome')) {
          this.$router.push({ path: this.localePath('/') })
        }
      } catch (e) {
        if ($nuxt.$route.path === '/') {
          this.$router.push({ path: this.localePath('/wellcome') })
        } else if (
          !$nuxt.$route.path.includes('signin') &&
          !$nuxt.$route.path.includes('signup') &&
          !$nuxt.$route.path.includes('wellcome')
        ) {
          this.$router.push({ path: this.localePath('/signin') })
        }
      }
    }
    currentUser.setLoadingUser(false)
    this.isLoadingUser = false
  },
}
</script>
