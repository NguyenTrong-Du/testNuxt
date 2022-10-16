import { Context } from '@nuxt/types'
import { useAuthStore } from '~/store/auth'

export default async function (context: Context) {
  const { route, redirect, $axios } = context
  const { isLoaded, isAuthenticated, $patch } = useAuthStore()

  // const savedLanguage = i18n.getLocaleCookie()
  // const isDefined = !!savedLanguage && i18n.localeCodes.includes(savedLanguage)
  // const language = !!savedLanguage && isDefined ? savedLanguage : 'en'
  // i18n.locale = language
  // i18n.setLocale(language)

  if (isLoaded) {
    if (route?.meta && route.meta[0].isProtected && !isAuthenticated) {
      redirect('/signin')
    }
  } else {
    try {
      const data = await $axios.get(
        'https://jsonplaceholder.typicode.com/todos?_limit=3'
      )

      setTimeout(() => {
        $patch({
          isLoaded: true,
          isAuthenticated: true,
          user: data.data,
        })
      }, 2000)
    } catch (error) {
      $patch({ isLoaded: true })
      if (route?.meta && route.meta[0].isProtected) {
        redirect('/signin')
      }
    }
  }
}
