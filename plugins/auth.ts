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
  interface UserLogin {
    email: string
    password?: string
  }

  const api = {
    getCookie: () => axios.$get('sanctum/csrf-cookie'),
    signUp: (data: User) => axios.$post('api/v1/register', data),
    login: (data: User) => axios.$post('api/v1/login', data),
    getUser: () => axios.$get(`api/v1/user/profile`),
    loginByTwitter: () => axios.$get('/api/v1/auth/twitter'),
    redirectLoginByTwitter: (oauthToken: string, oauthVerifier: string) =>
      axios.$get(
        `/api/v1/auth/twitter/callback?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`
      ),
    loginByGoogle: () => axios.$get('/api/v1/auth/google'),
    redirectLoginByGoogle: (code: string) =>
      axios.$get(`/api/v1/auth/google/callback?code=${code}`),
    loginByFacebook: () => axios.$get('/api/v1/auth/facebook'),
    redirectLoginByFacebook: (code: string) =>
      axios.$get(`/api/v1/auth/facebook/callback?code=${code}`),
    loginByInstagram: () => axios.$get('/api/v1/auth/instagram'),
    redirectLoginByInstagram: (code: string) =>
      axios.$get(`/api/v1/auth/instagram/callback?code=${code}`),
    loginByOtp: (data: UserLogin) =>
      axios.$post('api/v1/login/email-otp', data),
    redirectLoginByOtp: (userId: string, signature: string) =>
      axios.$get(
        `/api/v1/login/email-otp/verify/${userId}?signature=${signature}`
      ),
    logout: () => axios.$post('/api/v1/logout'),

    // info
    getAllCountry: () => axios.$get('/api/v1/country'),
    editInfo: (userId: string, data: any) =>
      axios.$post(`/api/v1/user/company/update/${userId}`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }),
  }
  inject('api', api)
}
