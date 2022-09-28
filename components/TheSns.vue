<template>
  <div class="text-black font-semibold">
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/3 bg-white rounded-lg flex items-center cursor-pointer"
        @click="loginByGoogle"
      >
        <img
          :src="googleLogoURL"
          width="20px"
          height="20px"
          class="mr-3 ml-3"
        />
        {{ $t('homepage.loginByGoogle') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/3 bg-white rounded-lg flex items-center cursor-pointer"
        @click="loginByFacebook"
      >
        <img
          :src="facebookLogoURL"
          width="20px"
          height="20px"
          class="mr-3 ml-3"
        />
        {{ $t('homepage.loginByFacebook') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/3 bg-white rounded-lg flex items-center cursor-pointer"
        @click="loginByTwitter"
      >
        <img
          :src="twitterLogoURL"
          width="20px"
          height="20px"
          class="mr-3 ml-3"
        />
        {{ $t('homepage.loginByTwitter') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/3 bg-white rounded-lg flex items-center cursor-pointer"
      >
        <img
          :src="instagramLogoURL"
          width="20px"
          height="20px"
          class="mr-3 ml-3"
        />
        {{ $t('homepage.loginByInstagram') }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from '@nuxtjs/composition-api'
export default {
  name: 'TheSns',
  data() {
    return {
      facebookLogoURL: '/icon-facebook.png',
      googleLogoURL: '/icon-google.png',
      instagramLogoURL: '/icon-instagram.png',
      twitterLogoURL: '/icon-twitter.png',
    }
  },
  methods: {
    async loginByTwitter() {
      const data = await this.$api.loginByTwitter()
      const router = useRoute()
      router.push(data.redirectUrl)
    },
    async loginByGoogle() {
      const data = await this.$api.loginByGoogle()
      const router = useRoute()
      router.push(data.redirectUrl)
    },
    async loginByFacebook() {
      const data = await this.$api.loginByFacebook()
      const router = useRoute()
      router.push(data.redirectUrl)
    },
  },
}
</script>
