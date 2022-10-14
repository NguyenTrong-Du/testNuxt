<template>
  <a-spin :spinning="isLoadingUser">
    <div class="grid grid-rows-auto-1fr h-screen overflow-hidden">
      <div>
        <div v-if="userName?.trim().length === 0"><TheHeader /></div>
        <div v-else>
          <SimpleTheHeader
            :user-name="userName"
            :avt-url="avatarUrl"
            @set-is-loading-user="setIsLoadingUser"
          />
        </div>
        <a-breadcrumb class="ml-10 flex items-center h-12">
          <nuxt-link to="./">
            <a-breadcrumb-item>
              <a-icon type="home" />
              <span>{{ $t('profile.home') }}</span>
            </a-breadcrumb-item>
          </nuxt-link>
          <a-breadcrumb-item>
            <span>{{ $t('profile.profile') }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <div
        class="grid grid-flow-col grid-cols-auto-1fr relative overflow-y-auto"
      >
        <div class="w-72 absolute h-full top-0"><TheMenu /></div>
        <div class="bg-gray-500 py-5 px-5 overflow-y-scroll h-full ml-80">
          <nuxt />
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script>
import TheMenu from '@/components/TheMenu.vue'
import SimpleTheHeader from '~/components/SimpleTheHeader.vue'
import TheHeader from '~/components/TheHeader.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'EditProfile',
  components: { TheMenu, TheHeader, SimpleTheHeader },
  data() {
    return {
      isLoadingUser: true,
      userName: '',
      avatarUrl: '',
    }
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
    try {
      currentUser.setLoadingUser(true)
      const response = await this.$api.getUser()
      const { user } = response.data
      this.userName = getFullName(
        user.first_name,
        user.last_name,
        user.display_name
      )
      this.avatarUrl = user.profile_image
      currentUser.setCurrentUser(user)
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
    currentUser.setLoadingUser(false)
    this.isLoadingUser = false
  },
  methods: {
    setIsLoadingUser(value) {
      this.isLoadingUser = value
    },
  },
}
</script>
<style scoped></style>
