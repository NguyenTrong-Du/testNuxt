export type User = {
  id: string
  email: string
  displayName: string
}

export type AuthState = {
  isLoaded: boolean
  isAuthenticated: boolean
  user: User | null
}
