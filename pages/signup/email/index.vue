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
      <div class="rounded-md">
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
                      {
                        type: 'email',
                        message: $t('homepage.validEmail'),
                      },
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
                      {
                        min: 8,
                        message: $t('homepage.valiPassword'),
                      },
                      {
                        validator: validateToNextPassword,
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
                      {
                        validator: compareToFirstPassword,
                      },
                    ],
                  },
                ]"
                type="password"
                @blur="handleConfirmBlur"
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
                html-type="submit"
                shape="round"
                class="bg-green-700 text-white"
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
      confirmDirty: false,
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
    openNotificationWithIcon(type, title, error) {
      for (let i = 0; i < error.length; i++) {
        this.$notification[type]({
          message: title,
          description: this.$t('error.' + error[i]),
        })
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    validateToNextPassword(_, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['password_confirmation'], { force: true })
      }
      callback()
    },

    compareToFirstPassword(_, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(this.$t('homepage.valiPasswordConfirm'))
      } else {
        callback()
      }
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
              e.response.data.error
            )
          }
        }
      })
      this.disabledBtn = false
    },
  },
}
</script>

<style scoped>
.ant-input-password-icon {
  color: brown;
}
</style>
