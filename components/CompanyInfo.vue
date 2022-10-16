<template>
  <a-form
    v-if="!isEdit"
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
  >
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyName') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <a-input
        v-decorator="[
          'company_name',
          {
            initialValue: currentUser?.companyName,
            rules: [
              { transform: (value) => value?.trim() },
              { required: true, message: $t('info.companyNameEmtry') },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyUrl') }}
        <span>:</span>
      </span>
      <a-input
        v-decorator="[
          'company_url',
          {
            initialValue: currentUser?.companyUrl,
            rules: [
              { transform: (value) => value?.trim() },
              {
                pattern: new RegExp(regex),
                message: $t('info.valiUrl'),
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyDescription') }}
        <span>:</span>
      </span>
      <a-textarea v-decorator="['company_description']" :rows="4" />
    </a-form-item>
    <div class="flex justify-center">
      <a-button
        type="primary"
        :disabled="hasErrors(form.getFieldsError())"
        @click="$emit('submit', form)"
      >
        {{ $t('info.save') }}
      </a-button>
      <a-button style="margin-left: 8px" @click="$emit('prev', form)">
        {{ $t('info.previous') }}
      </a-button>
    </div>
  </a-form>
  <a-form
    v-else
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
  >
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyName') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <a-input
        v-decorator="[
          'company_name',
          {
            initialValue: currentUser?.companyName,
            rules: [
              { transform: (value) => value?.trim() },
              { required: true, message: $t('info.companyNameEmtry') },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyUrl') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <a-input
        v-decorator="[
          'company_url',
          {
            initialValue: currentUser?.companyUrl,
            rules: [
              { transform: (value) => value?.trim() },
              {
                pattern: new RegExp(regex),
                message: $t('info.valiUrl'),
              },
              { required: true, message: $t('editprofile.companyUrlRequired') },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item class="flex gap-8 form-icon-required">
      <span slot="label" class="mr-2"
        >{{ $t('info.companyDescription') }}
        <span class="text-red-600">*</span>
        <span>:</span>
      </span>
      <a-textarea
        v-decorator="[
          'company_description',
          {
            rules: [
              {
                required: true,
                message: $t('editprofile.companyDescriptionRequired'),
              },
            ],
          },
        ]"
        :rows="4"
      />
    </a-form-item>
    <div class="flex justify-center">
      <a-button
        type="primary"
        :disabled="hasErrors(form.getFieldsError())"
        @click="$emit('submit', form)"
      >
        {{ $t('editprofile.editInfoCompany') }}
      </a-button>
    </div>
  </a-form>
</template>

<script>
import regex from '@/composables/regex'
import { useCurrentUserStore } from '~/store/user'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['formData', 'isValidateFail', 'isEdit', 'isLoadingEditInfo'],
  data() {
    return {
      formLayout: 'horizontal',
      regex,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      currentUser: useCurrentUserStore(),
    }
  },
  mounted() {
    this.form.setFieldsValue(this.formData)
    this.currentUser.$subscribe((_mutation, state) => {
      if (!this.isLoadingEditInfo) {
        this.form.setFieldsValue({
          company_description: state.companyDescription,
        })
      }
    })
  },
  methods: {
    hasErrors(fieldsError) {
      return Object.keys(fieldsError).some((field) => fieldsError[field])
    },
  },
}
</script>
