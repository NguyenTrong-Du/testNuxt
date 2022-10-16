import { NuxtAxiosInstance } from '@nuxt/types'
import { useAuthStore } from '~/store/auth'

// const resource = '/posts'

export default (axios: NuxtAxiosInstance) => (resource: string) => ({
  async get() {
    try {
      return await axios.get(`${resource}`)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async create<T>(payload: T) {
    const { $patch } = useAuthStore()
    try {
      await axios.post(`${resource}`, payload)
      $patch({ user: null })
    } catch (error) {
      console.log('err', error)
    }
  },

  // update(id, payload) {
  //   return axios.post(`${resource}/${id}`, payload)
  // },

  // delete(id) {
  //   return axios.delete(`${resource}/${id}`)
  // },
})
