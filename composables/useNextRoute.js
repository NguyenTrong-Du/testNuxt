import { useRouter } from '@nuxtjs/composition-api';
import { message } from 'ant-design-vue';
import { useCurrentUserStore } from '~/store/user'
const useNextRoute = () => {
  const router = useRouter()
  const nextRouteCheckFinishedBasicInfo = (user) => {
    const currentUser = useCurrentUserStore()
    currentUser.setCurrentUser(user)
    if (!currentUser.hasFinishedBasicInfo) {
      router.push('/info')
    } else {
      router.push('/')
    }
    message.success($nuxt.$t('homepage.signinSuccess'));
  }
  return { nextRouteCheckFinishedBasicInfo }
}

export default useNextRoute
