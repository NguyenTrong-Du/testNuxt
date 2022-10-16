<script>
import { mapState } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  name: 'TheHeader2',
  computed: mapState(useAuthStore, ['isLoading', 'user']),
}
</script>

<template>
  <div>
    <div>{{ isLoading }}</div>
    <div>{{ user }}</div>
    <a-button>
      <nuxt-link to="/test"> Test3</nuxt-link>
    </a-button>
    <a-button>
      <nuxt-link to="/protected"> Protected </nuxt-link>
    </a-button>
  </div>
</template>
