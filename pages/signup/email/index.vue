<template>
  <div class="rounded-md">
    <div class="flex justify-center m-5 text-xl font-bold">
      {{ $t('homepage.titleRegister') }}
    </div>
    <div class="flex justify-center">
      <a-form
        :form="form"
        :layout="formLayout"
        class="w-1/2"
        @submit="handleSubmit"
      >
        <a-form-item :label="$t('homepage.lastName')" class="mb-0">
          <a-input
            v-decorator="[
              'last_name',
              {
                rules: [
                  { transform: (value) => value?.trim() },
                  {
                    required: true,
                    message: $t('homepage.lastNameEmtry'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('homepage.firstName')" class="mb-0">
          <a-input
            v-decorator="[
              'first_name',
              {
                rules: [
                  { transform: (value) => value?.trim() },
                  {
                    required: true,
                    message: $t('homepage.firstNameEmpty'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('homepage.email')" class="mb-0">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { transform: (value) => value?.trim() },
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
        <div v-if="usePassword">
          <a-form-item :label="$t('homepage.password')" class="mb-0">
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
                      pattern: new RegExp(
                        /^[a-zA-Z0-9\u0020-\u002F\u003A-\u0040]{8,}$/
                      ),
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
          <a-form-item :label="$t('homepage.passwordConfirm')" class="mb-0">
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
        </div>
        <a-form-item class="flex justify-center mt-5">
          <a-button
            type="text"
            shape="round"
            class="bg-white text-black mr-2 h-10"
            :disabled="disabledBtn"
            @click="handleUsePassword()"
          >
            {{
              usePassword
                ? $t('homepage.signUpUseLink')
                : $t('homepage.signUpUsePassword')
            }}
          </a-button>
          <a-button
            html-type="submit"
            shape="round"
            class="bg-green-700 text-white ml-2 h-10"
            :disabled="disabledBtn"
            :loading="loadingBtn"
          >
            {{ $t('homepage.register') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import useNotification from '@/composables/useNotification'
export default {
  name: 'SignIn',
  layout: 'signin',
  data() {
    return {
      collapsed: false,
      size: 'large',
      linkEmail: '/icon-email.png',
      formLayout: 'vertical',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      disabledBtn: false,
      confirmDirty: false,
      usePassword: false,
      loadingBtn: false,
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
    handleUsePassword() {
      this.usePassword = !this.usePassword
    },
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
      this.loadingBtn = true
      const { notification } = useNotification()
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$api.signUp(values)
            notification(
              this.$notification,
              'success',
              this.$t('homepage.signupSuccess'),
              this.$t('homepage.desSignupSuccess')
            )
            this.form.resetFields()
          } catch (e) {
            const messageError = []
            for (let i = 0; i < e.response.data.error.length; i++) {
              messageError.push(this.$t(`error.${e.response.data.error}`))
            }
            notification(
              this.$notification,
              'error',
              this.$t('homepage.signupError'),
              messageError
            )
          }
        }
      })
      this.disabledBtn = false
      this.loadingBtn = false
    },
  },
}
</script>

<style scoped>
.ant-input-password-icon {
  color: brown;
}
</style>
