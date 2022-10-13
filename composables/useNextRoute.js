import { useRouter } from '@nuxtjs/composition-api'
import { message } from 'ant-design-vue'
import { useCurrentUserStore } from '~/store/user'
const useNextRoute = () => {
  const router = useRouter()
  const nextRouteCheckFinishedBasicInfo = (user) => {
    const currentUser = useCurrentUserStore()
    currentUser.setCurrentUser(user)
    if (!currentUser.hasFinishedBasicInfo) {
      router.push({ path: window.$nuxt.localePath('/info') })
    } else {
      router.push({ path: window.$nuxt.localePath('/') })
    }
    message.success($nuxt.$t('homepage.signinSuccess'))
  }
  return { nextRouteCheckFinishedBasicInfo }
}

export default useNextRoute
