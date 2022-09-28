<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin />
  </div>
</template>

<script>
export default {
  name: 'CallbackLoading',
  async created() {
    if (this.$route.query.userId) {
      await this.$api.redirectLoginByOtp(
        this.$route.query.userId,
        this.$route.query.signature
      )
      this.$router.push({ path: this.localePath('/') })
    }
  },
}
</script>
