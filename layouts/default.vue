<script lang="ts">
import { mapState } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  name: 'DefaultLayout',
  middleware: ['authenticated'],
  computed: mapState(useAuthStore, ['isLoaded']),
}
</script>

<template>
  <div>
    <a-spin v-if="!isLoaded" />
    <div v-else>
      <the-header-2 />
      <nuxt />
    </div>
  </div>
</template>
