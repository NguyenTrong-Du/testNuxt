<template>
  <div class="text-black font-semibold">
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
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
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
        @click="loginByFb"
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
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
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
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
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
    async loginByFb() {
      const data = await this.$api.loginByFb()
      window.location.href = data.redirectUrl
    },
  },
}
</script>
