<template>
  <a-spin :spinning="isLoadingUpdateInfo">
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
          <div class="steps-content overflow-auto max-h-[550px]">
            <div v-if="current === 1" class="w-full">
              <BasicInfo
                :form-data="form"
                :list-file-image="listFileImage"
                :chosen-region="chosenRegion"
                :chosen-nationaly="chosenNationaly"
                :list-countries-in-chosen-region="listCountriesInChosenRegion"
                :nationality-sum="nationalitySum"
                @next="next"
              />
            </div>
            <div v-if="current === 2">
              <div v-if="form.account_type === 'company'">
                <CompanyInfo :form-data="form" @prev="prev" @submit="submit" />
              </div>
              <div v-if="form.account_type === 'individual'">
                <PersonInfo @prev="prev" @submit="submit" />
              </div>
            </div>
          </div>
          <div class="steps-action" />
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script>
import BasicInfo from '~/components/BasicInfo.vue'
import CompanyInfo from '~/components/CompanyInfo.vue'
import { useCurrentUserStore } from '~/store/user'
import useNotification from '@/composables/useNotification'
import { useRefetchUser } from '~/store/refetch'
export default {
  name: 'InfoAccount',
  components: { BasicInfo, CompanyInfo },
  layout: 'homepage',
  data() {
    return {
      nationalitySum: 1,
      current: 1,
      form: {},
      isLoadingUpdateInfo: false,
      listFileImage: [],
      chosenNationaly: [],
      chosenRegion: [],
      listCountriesInChosenRegion: [],
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
  created() {
    const currentUser = useCurrentUserStore()
    if (currentUser?.email) {
      this.form.first_name = currentUser?.firstName
      this.form.last_name = currentUser?.lastName
      this.form.display_name = currentUser?.displayName
    }
  },
  methods: {
    next(
      formData,
      nationalities,
      listFileImage,
      choseRegions,
      choseNationalities,
      listCountriesInChosenRegion,
      nationalitySum
    ) {
      formData.validateFields((err, values) => {
        this.listFileImage = listFileImage
        this.chosenRegion = choseRegions
        this.chosenNationaly = choseNationalities
        this.listCountriesInChosenRegio = listCountriesInChosenRegion
        this.nationalitySum = nationalitySum
        if (!err) {
          if (this.current < 2) {
            this.current++
            this.form = {
              ...this.form,
              ...values,
              nationalities: [...nationalities],
            }
          }
        }
      })
    },
    prev(formData) {
      formData.validateFields((_, values) => {
        this.current--
        this.form = { ...this.form, ...values }
      })
    },
    success() {
      const h = this.$createElement
      this.$success({
        title: this.$t('info.editInfoSuccess'),
        content: h('div', {}, [
          h('p', this.$t('info.editInfoWithEmailSuccess')),
        ]),
        onOk() {},
      })
    },
    submit(formData) {
      this.isLoadingUpdateInfo = true
      const { notification } = useNotification()
      const refetchUser = useRefetchUser()
      const currentUser = useCurrentUserStore()
      formData.validateFields(async (err, values) => {
        if (!err) {
          const data = new FormData()
          if (this.form.profile_image_file) {
            data.append(
              'profile_image_file',
              this.form.profile_image_file[0].originFileObj
            )
          }
          if (!this.form.email && currentUser.email) {
            data.append('email', currentUser.email)
          }
          for (const key in this.form) {
            if (
              !['profile_image_file', 'nationalities'].includes(key) &&
              this.form[key]
            ) {
              data.append(key, this.form[key])
            } else if (key === 'nationalities' && this.form.nationalities) {
              this.form[key].forEach((nationality) => {
                data.append('nationalities[]', nationality)
              })
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
            refetchUser.changeRefetch()
            this.isLoadingUpdateInfo = false
            if (!currentUser.emailVerifiedAt) this.success()
            this.$router.push({ path: this.localePath('/') })
            if (currentUser.emailVerifiedAt) {
              notification(
                this.$notification,
                'success',
                this.$t('info.editInfoSuccess'),
                ''
              )
            }
          } catch (e) {
            const messageError = []
            for (let i = 0; i < e.response.data.error.length; i++) {
              messageError.push(this.$t(`error.${e.response.data.error[i]}`))
            }
            notification(
              this.$notification,
              'error',
              this.$t('info.editInfoFailed'),
              messageError
            )
            this.current = 2
          }
        }
        this.isLoadingUpdateInfo = false
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
