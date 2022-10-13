import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    id: '',
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    hasFinishedBasicInfo: false,
    profileImage: null,
    totalPoint: 0,
    isLoadingUser: false,
    emailVerifiedAt: null,
    percentCompleteProfile: 0,
  }),
  getters: {
    getEmail: (state) => state.email,
  },
  actions: {
    setCurrentUser(user) {
      this.id = user.id
      this.firstName = user.first_name
      this.lastName = user.last_name
      this.displayName = user.display_name
      this.hasFinishedBasicInfo = user.has_finished_basic_info
      this.profileImage = user.profile_image
      this.totalPoint = user.total_point
      this.email = user.email
      this.emailVerifiedAt = user.email_verified_at
      this.percentCompleteProfile = user.percent_complete_profile
    },
    setLoadingUser(loading) {
      this.isLoadingUser = loading
    },
    setHasFinishedBasicInfo(hasFinishedBasicInfo) {
      this.hasFinishedBasicInfo = hasFinishedBasicInfo
    },
    setPercentCompleteProfile(percentCompleteProfile) {
      this.percentCompleteProfile = percentCompleteProfile
    },
  },
})
