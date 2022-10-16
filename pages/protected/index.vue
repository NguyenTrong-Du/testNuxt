<script lang="ts">
import { mapState } from 'pinia'
import ThePostItem from '~/components/TestPage/ThePostItem.vue'
// import { useFetch } from '~/composables/useFetch'
import { useAuthStore } from '~/store/auth'

type Test = {
  todos: any[]
  isRefetch: boolean
  search: string
}

type Post = {
  id: number
  title: string
}

export default {
  name: 'ProtectedPage',
  components: { ThePostItem },
  layout: 'protected',
  meta: {
    isProtected: true,
  },
  async asyncData(ctx) {
    const res = await ctx.app
      .$apiServices('https://jsonplaceholder.typicode.com/posts?_limit=2')
      .get()
    return {
      posts: res.data,
    }
  },
  data(): Test {
    return {
      todos: [],
      isRefetch: false,
      search: '',
    }
  },
  // async fetch() {
  //   const axios = this.$axios
  //   const [a, b] = await useFetch(axios)
  //   this.todos = a
  //   this.posts = b
  // },
  computed: {
    ...mapState(useAuthStore, ['user']),
    debouncedSearch(): boolean {
      const a = this.search === 'haha'
      return a
    },
  },
  watch: {
    isRefetch: '$fetch',
    debouncedSearch: '$fetch',
  },
  methods: {
    handleRefetch() {
      this.isRefetch = !this.isRefetch
    },
    handleSubmit(event: Event) {
      event.preventDefault()
      this.$apiServices(
        'https://jsonplaceholder.typicode.com/posts'
      ).create<Post>({
        id: 434,
        title: 434,
      })
      // this.$fetch()
    },
  },
}
</script>

<template>
  <div>
    <div>this is user: {{ user }}</div>
    <div>This is the protected page</div>
    <!-- <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p> -->
    <div>{{ todos }}</div>
    <br />
    <ul>
      <the-post-item v-for="post in posts" :key="post.id" :post="post" />
    </ul>
    <br />
    <br />
    <button @click="handleRefetch">Refetch</button>
    <form @submit="handleSubmit">
      <input v-model="search" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
