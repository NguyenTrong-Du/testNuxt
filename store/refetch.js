import { defineStore } from 'pinia'

export const useRefetchUser = defineStore('refetchUser', {
  state: () => ({
    isRefetch: false
  }),
  actions: {
    changeRefetch(){
        this.isRefetch = !this.isRefetch
    }
  },
})
