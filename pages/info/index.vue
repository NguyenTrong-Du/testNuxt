<template>
  <div class="ml-10 mt-3">
    <div class="text-2xl">{{ $t('info.titleInfo') }}</div>
    <div class="flex justify-center mt-3">
      <div class="w-2/3">
        <a-steps progress-dot :current="current">
          <a-step
            v-for="item in steps"
            :key="item.title"
            :title="item.title"
            :description="item.description"
          />
        </a-steps>
        <div class="steps-content">
          <div v-if="current === 1" class="w-full">
            <BasicInfo :form-data="form" @next="next" />
          </div>
          <div v-if="current === 2">
            <div v-if="form.account_type === 'company'">
            <CompanyInfo @prev="prev" @done="done" />
            </div>
            <div v-if="form.account_type === 'individual'">
            <PersonInfo @prev="prev" @done="done" />
            </div>
          </div>
        </div>
        <div class="steps-action"></div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicInfo from '~/components/BasicInfo.vue'
import CompanyInfo from '~/components/CompanyInfo.vue'
import { useCurrentUserStore } from '~/store/user'
import useNotification from '@/composables/useNotification'
export default {
  name: 'InfoAccount',
  components: { BasicInfo, CompanyInfo },
  layout: 'homepage',
  data() {
    return {
      current: 1,
      form: {},
      steps: [
        {
          title: this.$t('info.login'),
          description: this.$t('info.descLogin'),
        },
        {
          title: this.$t('info.profile'),
          description: this.$t('info.descProfile'),
        },
        {
          title: this.$t('info.otherInfo'),
          description: this.$t('info.descOtherInfo'),
        },
      ],
    }
  },
    created(){
    const currentUser = useCurrentUserStore()
    if(currentUser.email){
      this.form.email = currentUser.email
    }
  },
  methods: {
    next(form) {
      form.validateFields((err, values) => {
        if (!err) {
          this.current++
          this.form = { ...values }
        }
      })
    },
    prev() {
      this.current--
    },
    done(form) {
      const { notification } = useNotification()
      const currentUser = useCurrentUserStore()
      form.validateFields(async (err, values) => {
        if (!err) {
          const data = new FormData()
          if (this.form.profile_image_file) {
            data.append(
              'profile_image_file',
              this.form.profile_image_file[0].originFileObj
            )
          }
          for (const key in this.form) {
            if (key !== 'profile_image_file' && this.form[key]) {
              data.append(key, this.form[key])
            }
          }
          for (const key in values) {
            if (values[key]) {
              data.append(key, values[key])
            }
          }
          this.form = data
          try {
            await this.$api.editInfo(currentUser.id, data)
            this.$router.push({ path: this.localePath('/') })
            notification(
              this.$notification,
              'success',
              this.$t('homepage.signinSuccess'),
              ''
            )
          } catch (e) {
            const messageError = []
            for (let i = 0; i < e.response.data.error.length; i++) {
              messageError.push(this.$t(`error.${e.response.data.error}`))
            }
            notification(
              this.$notification,
              'error',
              this.$t('homepage.signinError'),
              messageError
            )
          }
        }
      })
    },
  },
}
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  min-height: 200px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.steps-action {
  margin-top: 24px;
}
</style>
