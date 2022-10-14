<template>
  <a-spin :spinning="isLoadingEditInfo">
    <div>
      <h3 class="text-2xl">{{ $t('editprofile.editBasicProfile') }}</h3>
    </div>
    <div class="mt-10">
      <BasicInfo
        class="bg-gray-800 w-10/12 m-auto py-4 px-3 shadow-2xl"
        :is-edit="true"
        :form-data="form"
        :list-file-image="listFileImage"
        :chosen-region="chosenRegion"
        :chosen-nationaly="chosenNationality"
        :list-countries-in-chosen-region="listCountriesInChosenRegion"
        :nationality-sum="nationalitySum"
        @submit="submit"
      />
    </div>
  </a-spin>
</template>
<script>
import BasicInfo from '~/components/BasicInfo.vue'
import { useCurrentUserStore } from '~/store/user'
import useMessage from '@/composables/useMessage'
import { useRefetchUser } from '~/store/refetch'
export default {
  name: 'EditCompany',
  components: { BasicInfo },
  layout: 'editprofile',
  data() {
    return {
      nationalitySum: 0,
      form: {},
      isLoadingEditInfo: false,
      listFileImage: null,
      chosenNationality: [],
      chosenRegion: [],
      listCountriesInChosenRegion: [],
      currentUser: useCurrentUserStore(),
      userId: [],
    }
  },
  async created() {
    const allCountries = await this.$api.getAllCountry()
    const allCountriesData = [...allCountries.data]
    this.currentUser.$subscribe((_mutation, state) => {
      this.setNationality(state.nationalities, allCountriesData)
    })
    this.setNationality(this.currentUser.nationalities, allCountriesData)
    if (this.currentUser?.email) {
      this.form.first_name = this.currentUser?.firstName
      this.form.last_name = this.currentUser?.lastName
      this.form.display_name = this.currentUser?.displayName
      this.form.phone_number = this.currentUser?.phoneNumber
      this.form.nationalities = this.currentUser?.nationalities
    }
  },
  methods: {
    setNationality(nationalities, allCountriesData) {
      if (nationalities) {
        let indexOfListCountry = 0
        for (const nationality of nationalities) {
          for (const country of allCountriesData) {
            const countryIndex = country.countries.findIndex(
              (value) => value.id === nationality
            )
            if (countryIndex >= 0) {
              this.chosenRegion.push(country.region)
              this.chosenNationality.push(country.countries[countryIndex].name)
              this.listCountriesInChosenRegion[indexOfListCountry] =
                country.countries.map((value) => {
                  if (value.id === nationality) {
                    return {
                      ...value,
                      isShow: true,
                    }
                  }
                  return {
                    ...value,
                    isShow: false,
                  }
                })
              indexOfListCountry++
            }
          }
        }
      }
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
    submit(formData, nationalities) {
      const { errorMessage } = useMessage()
      const refetchUser = useRefetchUser()
      const currentUser = useCurrentUserStore()
      formData.validateFields(async (err, values) => {
        if (!err) {
          const data = new FormData()
          const listAttribute = []
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
          for (const key in values) {
            if (values[key]) {
              data.append(key, values[key])
            }
          }
          if (nationalities?.length) {
            data.append('nationalities[]', nationalities)
          }
          for (const attribute of currentUser.attributes) {
            listAttribute.push({
              attributeIds: JSON.parse(attribute.attributeIds),
              value: attribute.value,
            })
          }
          data.append('company_name', currentUser.companyName)
          data.append('company_url', currentUser.companyUrl)
          data.append('company_description', currentUser.companyDescription)
          data.append('attributes', JSON.stringify(listAttribute))
          data.append('self_introduction', currentUser.selfIntroduction)
          try {
            this.isLoadingEditInfo = true
            let userAfterUpdate
            if (currentUser.accountType === 'company') {
              userAfterUpdate = await this.$api.updateInfoCompany(
                currentUser.id,
                data
              )
            } else {
              userAfterUpdate = await this.$api.updateInfoIndividual(
                currentUser.id,
                data
              )
            }
            refetchUser.changeRefetch()
            currentUser.setCurrentUser(userAfterUpdate.data)
            currentUser.setPercentCompleteProfile(
              userAfterUpdate.data.percent_complete_profile
            )
            this.$router.push({ path: this.localePath('/profile') })
            this.$message.success(this.$t('info.editInfoSuccess'))
          } catch (e) {
            errorMessage(e.response.data.error)
          }
          formData.resetFields()
          this.isLoadingEditInfo = false
        }
      })
    },
  },
}
</script>
<style scoped></style>
