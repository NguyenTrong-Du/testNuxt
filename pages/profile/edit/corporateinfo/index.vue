<template>
  <a-spin :spinning="isLoadingEditInfo">
    <div>
      <h3 class="text-2xl">{{ $t('editprofile.editCorporateProfile') }}</h3>
    </div>
    <div class="mt-10">
      <CompanyInfo
        class="bg-gray-800 w-10/12 m-auto py-4 px-3 shadow-2xl"
        :form-data="form"
        :is-edit="true"
        :is-loading-edit-info="isLoadingEditInfo"
        @submit="submit"
      />
    </div>
  </a-spin>
</template>
<script>
import CompanyInfo from '../../../../components/CompanyInfo.vue'
import { useCurrentUserStore } from '~/store/user'
import useMessage from '~/composables/useMessage'
import { useRefetchUser } from '~/store/refetch'
export default {
  name: 'CorporateInfo',
  components: { CompanyInfo },
  layout: 'editprofile',
  data() {
    return {
      form: {},
      isLoadingEditInfo: false,
      currentUser: useCurrentUserStore(),
    }
  },
  created() {
    this.currentUser.$subscribe((_mutation, state) => {
      this.setFormData(state)
    })
    if (this.currentUser?.id) {
      this.setFormData(this.currentUser)
    }
  },
  methods: {
    setFormData(currentUser) {
      this.form.company_name = currentUser?.companyName
      this.form.company_url = currentUser?.companyUrl
      this.form.company_description = currentUser?.companyDescription
    },
    submit(formData) {
      const { errorMessage } = useMessage()
      const refetchUser = useRefetchUser()
      formData.validateFields(async (err, values) => {
        if (!err) {
          const data = new FormData()
          for (const key in values) {
            if (values[key]) {
              data.append(key, values[key])
            }
          }

          data.append('first_name', this.currentUser.firstName)
          data.append('last_name', this.currentUser.lastName)
          data.append('account_type', this.currentUser.accountType)
          data.append('email', this.currentUser.email)
          data.append('display_name', this.currentUser.displayName)
          data.append('phone_number', this.currentUser.phoneNumber)
          if (this.currentUser.nationalities?.length) {
            data.append('nationalities[]', this.currentUser.nationalities)
          }

          try {
            this.isLoadingEditInfo = true
            const response = await this.$api.updateInfoCompany(
              this.currentUser.id,
              data
            )
            refetchUser.changeRefetch()
            this.currentUser.setCurrentUser(response.data)
            this.$router.push({ path: this.localePath('/profile') })
            this.$message.success(this.$t('info.editInfoSuccess'))
          } catch (e) {
            errorMessage(e.response.data.error)
          }
          this.isLoadingEditInfo = false
        }
      })
    },
  },
}
</script>
<style scoped></style>
