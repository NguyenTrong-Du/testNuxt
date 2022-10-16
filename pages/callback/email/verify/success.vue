<template>
  <div class="flex justify-center items-center h-screen">
    <a-result
      status="success"
      :title="$t('homepage.verifySuccess')"
      :sub-title="$t('homepage.descVerifySuccess')"
    >
      <template #extra>
        <a-button key="console" type="primary">
          <nuxt-link :to="localePath('/signin')">{{
            $t('homepage.login')
          }}</nuxt-link>
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'VerifySuccess',
  created() {
    const locale = localStorage.getItem('locale')
    this.$i18n.setLocale(locale)
  },
}
</script>
