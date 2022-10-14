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
                country.countries.filter((value) => value.id !== nationality)
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
            }
          }
          for (const key in values) {
            if (values[key]) {
              data.append(key, values[key])
            }
          }
          if (nationalities?.length) {
            data.append('nationalities[]', nationalities)
          }
          try {
            data.append('company_name', currentUser.companyName)
            this.isLoadingEditInfo = true
            const response = await this.$api.updateInfoCompany(
              currentUser.id,
              data
            )
            refetchUser.changeRefetch()
            currentUser.setCurrentUser(response.data)
            currentUser.setPercentCompleteProfile(
              response.data.percent_complete_profile
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
