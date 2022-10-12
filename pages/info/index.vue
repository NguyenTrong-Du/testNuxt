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
              class="step-custom"
            />
          </a-steps>

          <div v-if="current === 1" class="w-full">
            <div class="steps-content overflow-auto max-h-[550px] bg-slate-800">
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
          </div>
          <div v-if="current === 2" class="w-full">
            <div v-if="form.account_type === 'company'">
              <div
                class="steps-content overflow-auto max-h-[550px] bg-slate-800"
              >
                <CompanyInfo :form-data="form" @prev="prev" @submit="submit" />
              </div>
            </div>
            <div v-else>
              <PersonInfo
                :data-individual="dataIndividual"
                :form-data="form"
                @prev="prev"
                @submit="submit"
              />
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
import useMessage from '@/composables/useMessage'
import { useRefetchUser } from '~/store/refetch'
export default {
  name: 'InfoAccount',
  components: { BasicInfo, CompanyInfo },
  layout: 'homepage',
  data() {
    return {
      nationalitySum: 0,
      current: 1,
      form: {},
      isLoadingUpdateInfo: false,
      listFileImage: null,
      chosenNationaly: [],
      chosenRegion: [],
      listCountriesInChosenRegion: [],
      dataIndividual: {},
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
      listFileImage,
      choseRegions,
      choseNationalities,
      listCountriesInChosenRegion,
      nationalitySum,
      choseNationalityIds
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
              nationalities: [...choseNationalityIds],
            }
          }
        }
      })
    },
    prev(formData, data) {
      this.dataIndividual = data
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
    submit(formData, listAttributes) {
      this.isLoadingUpdateInfo = true
      const { errorMessage } = useMessage()
      const refetchUser = useRefetchUser()
      const currentUser = useCurrentUserStore()
      formData.validateFields(async (err, values) => {
        if (!err) {
          const data = new FormData()
          if (
            this.form.profile_image_file?.length &&
            this.form.profile_image_file[0].shouldUpload
          ) {
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
          try {
            if (this.form.account_type === 'company') {
              await this.$api.updateInfoCompany(currentUser.id, data)
            } else {
              data.append('attributes', JSON.stringify(listAttributes))
              await this.$api.updateInfoIndividual(currentUser.id, data)
            }
            refetchUser.changeRefetch()
            this.isLoadingUpdateInfo = false
            currentUser.setHasFinishedBasicInfo(true)
            if (!currentUser.emailVerifiedAt) this.success()
            this.$router.push({ path: this.localePath('/') })
            if (currentUser.emailVerifiedAt) {
              this.$message.success(this.$t('info.editInfoSuccess'))
            }
          } catch (e) {
            errorMessage(e.response.data.error)
            this.current--
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
