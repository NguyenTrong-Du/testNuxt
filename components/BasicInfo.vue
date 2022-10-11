<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 14 }"
    class="w-full"
  >
    <a-form-item class="flex gap-8 form-icon-required" required>
      <span slot="label" class="mr-2"
        >{{ $t('info.accountType') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
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
    <a-form-item class="mb-0 flex gap-8 form-icon-required" required>
      <span slot="label" class="mr-2"
        >{{ $t('info.name') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <div id="div_name_id" class="flex justify-between">
        <a-form-item
          id="first_name_1"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :label="$t('info.firstName')"
        >
          <a-input
            v-decorator="[
              'first_name',
              {
                rules: [
                  { transform: (value) => value?.trim() },
                  { required: true, message: $t('info.firstNameEmpty') },
                ],
                initialValue: currentUser?.firstName,
              },
            ]"
            class="sm:w-1/2 md:w-1/2 lg:w-full"
          />
        </a-form-item>
        <a-form-item
          id="last_name"
          :label="$t('info.lastName')"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'last_name',
              {
                rules: [
                  { transform: (value) => value?.trim() },
                  { required: true, message: $t('info.lastNameEmtry') },
                ],
                initialValue: currentUser?.lastName,
              },
            ]"
            class="sm:w-1/2 md:w-1/2 lg:w-full"
            required-mark="optional"
          />
        </a-form-item>
      </div>
    </a-form-item>
    <a-form-item :label="$t('info.displayName')" class="mb-4 flex gap-8">
      <a-input
        v-decorator="[
          'display_name',
          {
            initialValue: currentUser?.displayName,
          },
        ]"
      />
    </a-form-item>
    <a-form-item :label="$t('info.profileImage')" class="mb-4 flex gap-8">
      <a-upload
        v-decorator="[
          'profile_image_file',
          {
            getValueFromEvent: normFile,
          },
        ]"
        accept="image/*"
        :before-upload="beforeUpload"
        name="logo"
        list-type="picture"
        :file-list="listFileAvata"
        @change="handleSelectImage"
      >
        <a-button>
          <a-icon type="upload" /> {{ $t('info.uploadFile') }}
        </a-button>
      </a-upload>
      <div class="text-rose-800">{{ $t('info.valiFile') }}</div>
    </a-form-item>
    <a-form-item class="mb-4 flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.email') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <div v-if="currentUser?.email">{{ currentUser?.email }}</div>
      <div v-else class="text-rose-800">
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
      </div>
    </a-form-item>
    <a-form-item :label="$t('info.phoneNumber')" class="mb-4 flex gap-8">
      <a-input
        v-decorator="[
          'phone_number',
          {
            rules: [
              { transform: (value) => value?.trim() },
              {
                pattern: new RegExp('^[0-9]{10,11}$'),
                message: $t('info.valiPhoneNumber'),
              },
            ],
          },
        ]"
      />
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
          <a-select
            v-model="choseRegions[nationality - 1]"
            @change="(value) => handleRegionChange(nationality, value)"
          >
            <a-select-option
              v-for="region in allCountries"
              :key="region.region"
            >
              {{ $t(`region.${region.region}`) }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          class="ml-3"
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
        >
          <a-select v-model="choseNationalities[nationality - 1]">
            <span slot="notFoundContent"
              ><a-empty :description="$t('info.noData')"
            /></span>
            <a-select-option
              v-for="country in listCountriesInChoseRegion[nationality - 1]"
              :key="country.id"
              :value="country.name"
            >
              {{
                country.name.split(' ').length >= 2
                  ? $t(`country.${country.name.split(' ')[0]}`)
                  : $t(`country.${country.name}`)
              }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <div v-if="nationality > 1" class="ml-2 mb-4">
          <a-icon
            type="delete"
            :style="{ fontSize: '25px', color: 'red' }"
            @click="deleteNationality(nationality)"
          />
        </div>
        <div v-else class="mr-8"></div>
      </div>
      <div
        class="steps-content flex justify-center items-center cursor-pointer"
        @click="handleAddNationality()"
      >
        <MdAddIcon w="25px" h="25px" />
      </div>
    </a-form-item>
    <a-form-item :label="$t('info.refferalUserEmail')" class="mb-4 flex gap-8">
      <a-input
        v-decorator="[
          'refferal_user_email',
          {
            rules: [
              { transform: (value) => value?.trim() },
              {
                type: 'email',
                message: $t('homepage.validEmail'),
              },
            ],
          },
        ]"
        disabled
      />
    </a-form-item>
    <div class="flex justify-center">
      <a-button type="primary" @click="handleNext()">
        {{ $t('info.next') }}
      </a-button>
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
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'formData',
    // eslint-disable-next-line vue/require-prop-types
    'listFileImage',
    // eslint-disable-next-line vue/require-prop-types
    'chosenRegion',
    // eslint-disable-next-line vue/require-prop-types
    'listCountriesInChosenRegion',
    // eslint-disable-next-line vue/require-prop-types
    'chosenNationaly',
    // eslint-disable-next-line vue/require-prop-types
    'nationalitySum',
  ],
  data() {
    return {
      nationalityNumber: this.nationalitySum || 1,
      allCountries: [],
      choseRegions: this.chosenRegion || [],
      listCountriesInChoseRegion: this.listCountriesInChosenRegion || [],
      choseNationalities: this.chosenNationaly || [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      headers: {
        authorization: 'authorization-text',
      },
      currentUser: useCurrentUserStore(),
      nationalities: [],
      listFileAvata: this.listFileImage || [],
    }
  },
  async created() {
    const countryData = await this.$api.getAllCountry()
    this.allCountries = [...countryData.data]
    for (const country of this.allCountries) {
      this.nationalities = [...this.nationalities, ...country.countries]
    }
  },
  mounted() {
    this.form.setFieldsValue(this.formData)
  },
  methods: {
    handleRegionChange(nationality, value) {
      this.choseNationalities[nationality - 1] = null
      for (const region of this.allCountries) {
        if (region.region === value) {
          const listCountry = []
          for (const country of region.countries) {
            if (!this.choseNationalities.includes(country.name)) {
              listCountry.push(country)
            }
          }
          this.listCountriesInChoseRegion[nationality - 1] = [...listCountry]
        }
      }
    },

    handleAddNationality() {
      if (this.nationalityNumber < 2) {
        this.nationalityNumber++
      } else {
        this.$message.warning(this.$t('info.maxNationality'))
      }
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error(this.$t('info.errorTypeImage'))
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error(this.$t('info.sizeImage'))
      }
      return isJpgOrPng && isLt5M
    },
    handleSelectImage(info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.listFileAvata = fileList
    },
    deleteNationality(nationality) {
      this.choseRegions.splice(nationality - 1, 1)
      this.choseNationalities.splice(nationality - 1, 1)
      this.nationalities.splice(nationality - 1, 1)
      this.nationalityNumber--
    },
    handleNext() {
      const choseNationalityIds = []
      for (const choseNationality of this.choseNationalities) {
        if (!choseNationality) {
          return this.$message.warning(this.$t('info.nationalityEmpty'))
        }
        for (const country of this.nationalities) {
          if (choseNationality === country.name) {
            choseNationalityIds.push(country.id)
          }
        }
      }
      this.$emit(
        'next',
        this.form,
        this.listFileAvata,
        this.choseRegions,
        this.choseNationalities,
        this.listCountriesInChoseRegion,
        this.nationalityNumber,
        choseNationalityIds
      )
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
