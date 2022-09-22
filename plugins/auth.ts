export default function ({ $axios }: any, inject: any) {
  const axios = $axios.create({
    headers: {
      common: {
        ContentType: 'application/json',
        Accept: 'application/json',
        AccessControlAllowOrigin: '*',
      },
    },
  })

  // axios.onError((err: any) => {
  //   const code = parseInt(err.response && err.response.status)
  //   if ([400, 401, 403, 404, 409, 500, 503].includes(code)) {
  //     error({
  //       statusCode: code,
  //       message: err.response.data.message,
  //     })
  //   }
  // })

  interface User {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
  }

  const api = {
    getCookie: () => axios.$get('sanctum/csrf-cookie'),
    signUp: (data: User) => axios.$post('api/v1/register', data),
    login: (data: User) => axios.$post('api/v1/login', data),
    getUser: () => axios.$get('api/v1/user'),
    loginByFb: () => axios.$get('/api/v1/auth/facebook'),
    redirectLoginByFb: (code: string) =>
      axios.$get('/api/v1/auth/facebook/callback?code=' + code),
  }
  inject('api', api)
}
