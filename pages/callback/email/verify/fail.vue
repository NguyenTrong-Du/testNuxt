<template>
  <div class="flex justify-center items-center h-screen">
    <a-result
      status="error"
      :title="$t('homepage.verifyFailed')"
      :sub-title="$t('homepage.descVerifyFailed')"
    >
      <template #extra>
        <a-button key="console" type="primary">
          <nuxt-link :to="localePath('/signup')">{{
            $t('homepage.register')
          }}</nuxt-link>
        </a-button>
      </template>
    </a-result>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VerifyFail',
  beforeCreate() {
    const locale = localStorage.getItem('locale')
    this.$i18n.setLocale(locale)
  },
})
</script>
