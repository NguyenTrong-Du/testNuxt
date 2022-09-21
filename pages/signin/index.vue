<template>
  <div class="h-full flex">
    <div class="w-1/2 flex justify-center">
      <img
        :src="linkBanner"
        min-width="100%"
        min-height="100%"
        class="shrink-0"
      />
    </div>
    <div class="w-1/2 ml-10">
      <TheHeaderLogin />
      <div class="flex justify-center m-5 text-xl font-bold">
        {{ $t('homepage.titleLogin') }}
      </div>
      <TheSns />
      <div class="flex justify-center m-5">
        {{ $t('homepage.or') }}
      </div>
      <div class="w-1/2 ml-[25%]">
        <a-form :form="form" :layout="formLayout" @submit="handleSubmit">
          <a-form-item :label="$t('homepage.email')">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: $t('homepage.emailEmtry') },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('homepage.password')">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('homepage.passwordEmtry'),
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="text"
              shape="round"
              class="bg-white text-black"
              :disabled="disabledBtn"
            >
              {{ $t('homepage.signUpUseLink') }}
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
              shape="round"
              class="bg-green-700 text-white"
              :disabled="disabledBtn"
            >
              {{ $t('homepage.login') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderLogin from '~/components/TheHeaderLogin.vue'
import TheSns from '~/components/TheSns.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  name: 'SignIn',
  components: {
    TheSns,
    TheHeaderLogin,
  },
  layout: 'signin',
  data() {
    return {
      collapsed: false,
      size: 'large',
      linkEmail: '/icon-email.png',
      linkBanner: '/banner.jpg',
      formLayout: 'vertical',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      disabledBtn: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
  mounted() {
    this.$api.getCookie()
  },
  methods: {
    openNotificationWithIcon(type, title, des) {
      this.$notification[type]({
        message: title,
        description: des,
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.disabledBtn = true
      const currentUser = useCurrentUserStore()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const res = await this.$api.login(values)
            currentUser.setCurrentUser(res.data.user)
            this.$router.push({ path: this.localePath('/homepage') })
            this.openNotificationWithIcon(
              'success',
              this.$t('homepage.signinSuccess'),
              ''
            )
          } catch (e) {
            this.openNotificationWithIcon(
              'error',
              this.$t('homepage.signinError'),
              this.$t('homepage.desSigninError')
            )
          }
        }
        this.disabledBtn = false
      })
    },
  },
}
</script>
