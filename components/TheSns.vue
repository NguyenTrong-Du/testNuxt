<template>
  <div class="text-black font-semibold">
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
      >
        <img :src="linkGg" width="20px" height="20px" class="mr-3 ml-3" />
        {{ $t('homepage.loginByGoogle') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
      >
        <img :src="linkFb" width="20px" height="20px" class="mr-3 ml-3" />
        {{ $t('homepage.loginByFacebook') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-10 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
      >
        <img :src="linkTwitter" width="20px" height="20px" class="mr-3 ml-3" />
        {{ $t('homepage.loginByTwitter') }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <div
        class="h-12 w-1/2 bg-white rounded-lg flex items-center cursor-pointer"
      >
        <img :src="linkInta" width="20px" height="20px" class="mr-3 ml-3" />
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
      linkFb: '/icon-facebook.png',
      linkGg: '/icon-google.png',
      linkInta: '/icon-instagram.png',
      linkTwitter: '/icon-twitter.png',
    }
  },
}
</script>
