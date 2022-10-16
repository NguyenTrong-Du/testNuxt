<script lang="ts">
import { PropType } from 'vue'

type Post = {
  id: number
  title: string
}

export default {
  props: {
    post: {
      required: true,
      type: Object as PropType<Post>,
    },
  },
}
</script>

<template>
  <li>{{ post.title }}</li>
</template>
