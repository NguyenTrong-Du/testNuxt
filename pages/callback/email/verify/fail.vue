<template>
  <div class="flex justify-center items-center h-screen">
    <a-result
      status="error"
      title="Email verification failed"
      sub-title="Verification link expired. Please resend the verification email."
    >
      <template #extra>
        <a-button key="console" type="primary">
          <nuxt-link to="/signup">Register</nuxt-link>
        </a-button>
      </template>
    </a-result>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VerifyFail',
})
</script>
<style scoped>
.desc p {
  margin-bottom: 1em;
}
</style>
