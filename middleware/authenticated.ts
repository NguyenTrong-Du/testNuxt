import { Context } from '@nuxt/types'
import { useCurrentUserStore } from '~/store/user'

export default function ({ redirect }: Context) {
  const currentUser = useCurrentUserStore()
  if (!currentUser.id) {
    return redirect('/signin')
  }
}
