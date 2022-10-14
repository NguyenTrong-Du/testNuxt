<template>
  <a-spin :spinning="isLoadingUser">
    <div v-if="userName?.trim().length === 0"><TheHeader /></div>
    <div v-else>
      <SimpleTheHeader
        :user-name="userName"
        :avt-url="avatarUrl"
        @set-is-loading-user="setIsLoadingUser"
      />
    </div>
    <div class="mt-3 h-full">
      <a-breadcrumb class="ml-10">
        <nuxt-link :to="localePath('/')">
          <a-breadcrumb-item>
            <a-icon type="home" />
            <span>{{ $t('profile.home') }}</span>
          </a-breadcrumb-item>
        </nuxt-link>
        <a-breadcrumb-item>
          <span>{{ $t('profile.editProfile') }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex mt-7 h-full gap-x-4 overflow-hidden">
        <div class="w-1/4"><TheMenu /></div>
        <div class="w-3/4 bg-gray-500 py-5 px-5 overflow-y-scroll">
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
