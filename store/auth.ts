import { defineStore } from 'pinia'
import { AuthState } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoaded: false,
    isAuthenticated: false,
    user: null,
  }),
})
