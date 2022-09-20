export default function ({ $axios, error }: any, inject: any) {
  const axios = $axios.create({
    headers: {
      common: {
        ContentType: 'application/json',
        Accept: 'application/json',
        AccessControlAllowOrigin: '*',
      },
    },
  })

  axios.onError((err: any) => {
    const code = parseInt(err.response && err.response.status)
    if ([401, 500, 503].includes(code)) {
      error({
        statusCode: code,
        message: err.response.data.meta.message,
      })
    }
  })

  const api = {
    getCookie: () => axios.$get('sanctum/csrf-cookie'),
    signUp: (data: any) => axios.$post('api/v1/register', data),
    login: (data: any) => axios.$post('api/v1/login', data),
    getUser: () => axios.$get('api/v1/user'),
  }
  inject('api', api)
}
