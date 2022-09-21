<template>
  <div class="bg-[#9CA3AF] h-full flex items-center pt-12">
    <div class="ml-20">
      <div class="text-black w-[1/3] text-xl mb-4">
        {{ $t('homepage.title1') }}
        <br />
        {{ $t('homepage.title2') }}
      </div>
      <a-button shape="round" :size="size" class="bg-white text-black">
        {{ $t('homepage.joinNow') }}
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  layout: 'homepage',
  data() {
    return {
      collapsed: false,
      size: 'large',
    }
  },
}
</script>
