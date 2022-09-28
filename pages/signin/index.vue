<template>
  <div>
    <div class="flex justify-center m-5 text-xl font-bold">
      {{ $t('homepage.titleLogin') }}
    </div>
    <TheSns />
    <div class="flex justify-center m-5">
      {{ $t('homepage.or') }}
    </div>
    <div class="w-1/3 ml-[33%]">
      <a-form
        :form="form"
        :layout="formLayout"
        class="w-full"
        @submit="handleSubmit"
      >
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
        <a-form-item class="flex justify-center">
          <a-button
            type="text"
            shape="round"
            class="bg-white text-black mr-2"
            :disabled="disabledBtn"
          >
            {{ $t('homepage.signUpUseLink') }}
          </a-button>
          <a-button
            type="primary"
            html-type="submit"
            shape="round"
            class="bg-green-700 text-white ml-2"
            :disabled="disabledBtn"
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
              this.$t('homepage.signupError'),
              e.response.data.error
            )
          }
        }
        this.disabledBtn = false
      })
    },
  },
}
</script>