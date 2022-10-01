<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item :label="$t('info.companyName')" class="flex gap-8">
      <a-input
        v-decorator="[
          'company_name',
          {
            rules: [{ required: true, message: $t('info.companyNameEmtry') }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item :label="$t('info.companyUrl')" class="flex gap-8">
      <a-input v-decorator="['companyUrl']" />
    </a-form-item>
    <a-form-item :label="$t('info.companyDescription')" class="flex gap-8">
      <a-textarea v-decorator="['companyDescription']" :rows="4" />
    </a-form-item>
    <div class="flex justify-center">
      <a-button type="primary" @click="$emit('done', form)">
        {{ $t('info.save') }}
      </a-button>
      <a-button style="margin-left: 8px" @click="$emit('prev')">
        {{ $t('info.previous') }}
      </a-button>
    </div>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
}
</script>
