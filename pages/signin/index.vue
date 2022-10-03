<template>
  <div>
    <div class="flex justify-center m-5 text-2xl font-bold">
      {{ $t('homepage.titleLogin') }}
    </div>
    <TheSns />
    <div class="flex justify-center m-5 font-bold text-lg">
      {{ $t('homepage.or') }}
    </div>
    <div class="w-1/2 m-auto">
      <a-form
        :form="form"
        :layout="formLayout"
        class="w-full"
        @submit="handleSubmit"
      >
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
                      pattern: new RegExp(
                        /^[a-zA-Z0-9\u0020-\u002F\u003A-\u0040]{8,}$/
                      ),
                      message: $t('homepage.valiPassword'),
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </div>
        <a-form-item class="block mt-5 ">
          <a-button
            type="text"
            shape="round"
            class="bg-white font-semibold text-black h-12 w-full rounded-lg flex items-center justify-center"
            :disabled="disabledBtn"
            @click="handleUsePassword"
          >
            {{
              usePassword
                ? $t('homepage.signUpUseLink')
                : $t('homepage.signUpUsePassword')
            }}
          </a-button>
          <a-button
            type="primary"
            html-type="submit"
            shape="round"
            class="bg-green-700 font-semibold text-white mt-5 h-12 w-full rounded-lg flex items-center justify-center"
            :disabled="disabledBtn"
            :loading="loadingBtn"
          >
            {{ $t('homepage.login') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import TheSns from '~/components/TheSns.vue'
import { useCurrentUserStore } from '~/store/user'
import useNotification from '@/composables/useNotification'
export default {
  name: 'SignIn',
  components: {
    TheSns,
  },
  layout: 'signin',
  data() {
    return {
      collapsed: false,
      size: 'large',
      linkEmail: '/icon-email.png',
      formLayout: 'vertical',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      disabledBtn: false,
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
    handleSubmit(e) {
      const { notification } = useNotification()
      e.preventDefault()
      this.disabledBtn = true
      this.loadingBtn = true
      const currentUser = useCurrentUserStore()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            if (!values.password) {
              await this.$api.loginByOtp(values)
              notification(
                this.$notification,
                'success',
                this.$t('homepage.signinSuccess'),
                this.$t('homepage.signinSuccessOtp')
              )
            } else {
              const res = await this.$api.login(values)
              currentUser.setCurrentUser(res.data.user)
              this.$router.push({ path: this.localePath('/') })
              notification(
                this.$notification,
                'success',
                this.$t('homepage.signinSuccess'),
                ''
              )
              this.form.resetFields()
            }
          } catch (e) {
            if (e.response.data.error.includes(30001)) {
              this.$router.push({ path: this.localePath('/') })
              const messageError = [this.$t('error.30001')]
              notification(
                this.$notification,
                'error',
                this.$t('homepage.signinError'),
                messageError
              )
            } else {
              const messageError = []
              for (let i = 0; i < e.response.data.error.length; i++) {
                if (e.response.data.error !== 30001) {
                  messageError.push(
                    this.$t(`error.${e.response.data.error[i]}`)
                  )
                }
              }
              notification(
                this.$notification,
                'error',
                this.$t('homepage.signinError'),
                messageError
              )
            }
          }
        }
        this.disabledBtn = false
        this.loadingBtn = false
      })
    },
    handleUsePassword() {
      this.usePassword = !this.usePassword
    },
  },
}
</script>
