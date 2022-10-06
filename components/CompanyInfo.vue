<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
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
            rules: [
              { transform: (value) => value?.trim() },
              { required: true, message: $t('info.companyNameEmtry') },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item :label="$t('info.companyUrl')" class="flex gap-8">
      <a-input
        v-decorator="[
          'company_url',
          {
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
    <a-form-item :label="$t('info.companyDescription')" class="flex gap-8">
      <a-textarea v-decorator="['company_description']" :rows="4" />
    </a-form-item>
    <div class="flex justify-center">
      <a-button type="primary" @click="$emit('submit', form)">
        {{ $t('info.save') }}
      </a-button>
      <a-button style="margin-left: 8px" @click="$emit('prev', form)">
        {{ $t('info.previous') }}
      </a-button>
    </div>
  </a-form>
</template>

<script>
import regex from '@/composables/regex'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['formData'],
  data() {
    return {
      formLayout: 'horizontal',
      regex,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  mounted() {
    this.form.setFieldsValue(this.formData)
  },
}
</script>
