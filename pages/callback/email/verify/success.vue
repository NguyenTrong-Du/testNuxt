<template>
<div class="flex justify-center items-center h-screen">
  <a-result
    status="success"
    title="Email verification successful!"
    sub-title="Click the login button to go to the login page to log in to the website"
  >
    <template #extra>
      <a-button key="console" type="primary">
          <nuxt-link to="/signin">Login</nuxt-link>
      </a-button>
    </template>
  </a-result>
</div>
</template>

<script>
export default {
  name: 'VerifySuccess',
}
</script>
