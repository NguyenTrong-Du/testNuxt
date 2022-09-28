<template>
  <div class="text-black font-semibold">
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-2/3 bg-white rounded-lg flex items-center cursor-pointer"
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
        class="h-12 w-2/3 bg-white rounded-lg flex items-center cursor-pointer"
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
        class="h-12 w-2/3 bg-white rounded-lg flex items-center cursor-pointer"
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
        class="h-12 w-2/3 bg-white rounded-lg flex items-center cursor-pointer"
        @click="loginByInstagram"
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
    // TODO chuyển window.location.href thành router
    async loginByTwitter() {
      const data = await this.$api.loginByTwitter()
      window.location.href = data.redirectUrl
    },
    async loginByGoogle() {
      const data = await this.$api.loginByGoogle()
      window.location.href = data.redirectUrl
    },
    async loginByFacebook() {
      const data = await this.$api.loginByFacebook()
      window.location.href = data.redirectUrl
    },
    async loginByInstagram() {
      const data = await this.$api.loginByInstagram()
      window.location.href = data.redirectUrl
    },
  },
}
</script>
