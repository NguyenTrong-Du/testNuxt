<template>
  <div class="h-full flex items-center justify-center text-2xl pt-12">
    {{ $t('homepage.textBody') }}
  </div>
</template>

<script>
import backgroundUrl from '~/assets/img/bg.avif'
export default {
  name: 'App',
  layout: 'homepage',
  data() {
    return {
      collapsed: false,
      size: 'large',
      backgroundUrl,
    }
  },
  computed: {
    isNotLoggedIn() {
      const { isLoadingUser } = useCurrentUserStore()
      return !isLoadingUser
    },
  },
}
</script>
