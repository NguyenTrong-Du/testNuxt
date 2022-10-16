<!-- eslint-disable camelcase -->
<template>
  <div class="mx-10 mt-3">
    <a-breadcrumb>
      <nuxt-link :to="localePath('/')">
        <a-breadcrumb-item>
          <a-icon type="home" />
          <span>{{ $t('profile.home') }}</span>
        </a-breadcrumb-item>
      </nuxt-link>
      <a-breadcrumb-item>
        <span>{{ $t('profile.profile') }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="flex mt-7">
      <diV class="w-3/4"
        ><h3 class="text-2xl">{{ $t('profile.editProfile') }}</h3>
        <p class="text-lg mt-4 leading-6">{{ $t('profile.titleProfile') }}</p>
        <div class="flex mt-4 items-center bg-gray-500 px-8 h-16">
          <span class="text-base w-2/5">{{ $t('profile.completeness') }}</span>
          <a-progress class="text-black" :percent="percent" />
        </div>
        <p class="mt-4 text-lg">{{ $t('profile.descriptionProfile') }}</p></diV
      >
      <diV class="w-1/4 text-center">
        <nuxt-link :to="localePath('/profile/edit')">
          <a-button
            type="primary"
            icon="edit"
            class="bg-white text-black h-10 text-base"
          >
            {{ $t('profile.edit') }}
          </a-button>
        </nuxt-link>
      </diV>
    </div>
  </div>
</template>
<script>
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'UserProfile',
  layout: 'homepage',
  computed: {
    percent() {
      const currentUser = useCurrentUserStore()
      return currentUser.percentCompleteProfile
    },
  },
  mounted() {
    this.$api.getUser()
  },
  methods: {
    increase() {
      if (percent > 100) {
        percent = 100
      }
      this.percent = percent
    },
  },
}
</script>
<style scoped></style>
