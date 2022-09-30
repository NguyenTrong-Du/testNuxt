<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 14 }"
    class="w-full"
  >
    <a-form-item :label="$t('info.accountType')" class="flex gap-8">
      <a-radio-group
        v-decorator="[
          'account_type',
          {
            initialValue: 'company',
          },
        ]"
      >
        <a-radio value="company">
          {{ $t('info.company') }}
        </a-radio>
        <a-radio value="individual">
          {{ $t('info.individual') }}
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label="$t('info.name')" class="mb-0 flex gap-8">
      <div class="flex justify-between">
        <a-form-item
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :label="$t('info.firstName')"
        >
          <a-input
            v-decorator="[
              'first_name',
              {
                rules: [{ required: true, message: $t('info.firstNameEmtry') }],
              },
            ]"
            class="sm:w-1/2 md:w-1/2 lg:w-full"
          />
        </a-form-item>
        <a-form-item
          :label="$t('info.lastName')"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'last_name',
              {
                rules: [{ required: true, message: $t('info.lastNameEmtry') }],
              },
            ]"
            class="sm:w-1/2 md:w-1/2 lg:w-full"
          />
        </a-form-item>
      </div>
    </a-form-item>
    <a-form-item :label="$t('info.displayName')" class="mb-4 flex gap-8">
      <a-input v-decorator="['display_name']" />
    </a-form-item>
    <a-form-item :label="$t('info.profileImage')" class="mb-4 flex gap-8">
      <a-upload
        v-decorator="[
          'profile_image_file',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        name="logo"
        list-type="picture"
      >
        <a-button>
          <a-icon type="upload" /> {{ $t('info.uploadFile') }}
        </a-button>
      </a-upload>
      <div class="text-rose-800">{{ $t('info.valiFile') }}</div>
    </a-form-item>
    <a-form-item :label="$t('info.email')" class="mb-4 flex gap-8">
      <div v-if="currentUser.email">{{ currentUser.email }}</div>
      <div v-else class="text-rose-800">{{ $t('info.noEmail') }}</div> </a-form-item
    ><a-form-item :label="$t('info.phoneNumber')" class="mb-4 flex gap-8">
      <a-input v-decorator="['phone_number']" />
    </a-form-item>
    <a-form-item :label="$t('info.nationality')" class="mb-4 flex gap-8">
      <div
        v-for="nationality in nationalityNumber"
        :key="nationality"
        class="flex"
      >
        <a-form-item
          class="mr-3"
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
        >
          <a-select v-model = "choseRegions[nationality-1]" @change = "handleRegionChange">
            <a-select-option v-for="nationality in allCountries" :key="nationality.region">
            {{ nationality.region }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          class="ml-3"
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
        >
          <a-select v-model = "choseNationalities[nationality-1]">
              <a-select-option  v-for="country in listCountriesInChoseRegion" :key="country.id" :value="country.id">
                {{ country.name }}
              </a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div
        class="steps-content flex justify-center items-center cursor-pointer"
        @click="handleAddNationality()"
      >
        <MdAddIcon w="25px" h="25px" />
      </div>
    </a-form-item>
    <a-form-item :label="$t('info.refferalUserEmail')" class="mb-4 flex gap-8">
      <a-input v-decorator="['refferal_user_email']" />
    </a-form-item>
    <div class="flex justify-center">
      <a-button type="primary" @click="$emit('next', form)"> {{ $t('info.next')}} </a-button>
    </div>
  </a-form>
</template>

<script>
import MdAddIcon from 'vue-ionicons/dist/md-add.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  components: {
    MdAddIcon,
  },
  //eslint-disable-next-line vue/require-prop-types
  props: ['formData'],
  data() {
    return {
      first_name: this.formData.first_name,
      nationalityNumber: 1,
      allCountries: [],
      choseRegions: [],
      listCountriesInChoseRegion: [],
      choseNationalities: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      headers: {
        authorization: 'authorization-text',
      },
      currentUser: useCurrentUserStore(),
    }
  },
   async created () {
    const countryData = await this.$api.getAllCountry();
    this.allCountries = [...countryData.data];
  },
  mounted() {
    this.form.setFieldsValue(this.formData)
  },
  methods: {
    handleRegionChange(value) {
        for(const region of this.allCountries) {
          if (region.region === value) {
            this.listCountriesInChoseRegion =  [...region.countries];
          }
        }
    },
    handleAddNationality() {
      this.nationalityNumber++
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
  },
}
</script>
<style scoped>
.steps-content {
  border: 1px dashed #e9e9e98e;
  border-radius: 6px;
}
.ion {
  fill: #e9e9e98e;
}
</style>
