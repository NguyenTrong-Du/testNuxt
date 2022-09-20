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
      <div class="p-8 rounded-md">
        <div class="flex justify-center m-5 text-xl font-bold">
          {{ $t('homepage.titleRegister') }}
        </div>
        <div class="flex justify-center">
          <a-form :form="form" :layout="formLayout" @submit="handleSubmit">
            <a-form-item :label="$t('homepage.lastName')">
              <a-input
                v-decorator="[
                  'last_name',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('homepage.lastNameEmtry'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('homepage.firstName')">
              <a-input
                v-decorator="[
                  'first_name',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('homepage.firstNameEmtry'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('homepage.email')">
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: 'Please input your email!' },
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
            <a-form-item :label="$t('homepage.passwordConfirm')">
              <a-input-password
                v-decorator="[
                  'password_confirmation',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('homepage.passwordConfirmEmtry'),
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
                style="background: white; bordercolor: white; color: black"
                :disabled="disabledBtn"
              >
                {{ $t('homepage.signUpUseLink') }}
              </a-button>
              <a-button
                type="primary"
                html-type="submit"
                shape="round"
                style="background: green; bordercolor: green; color: white"
                :disabled="disabledBtn"
              >
                {{ $t('homepage.register') }}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderLogin from '~/components/TheHeaderLogin.vue'
export default {
  name: 'SignIn',
  components: {
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
      this.disabledBtn = true
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$api.signUp(values)
            this.openNotificationWithIcon(
              'success',
              this.$t('homepage.signupSuccess'),
              this.$t('homepage.desSignupSuccess')
            )
          } catch (e) {
            this.openNotificationWithIcon(
              'error',
              this.$t('homepage.signupError'),
              this.$t('homepage.desSignupError')
            )
          }
        }
        this.disabledBtn = false
      })
    },
  },
}
</script>

<style scoped>
.ant-input-password-icon {
  color: brown;
}
</style>
