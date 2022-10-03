<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item class="flex justify-center w-screen">
      <a-button type="primary" @click="$emit('submit', form)">
        {{ $t('info.save') }}
      </a-button>
      <a-button style="margin-left: 8px" @click="$emit('prev')">
        {{ $t('info.previous') }}
      </a-button>
    </a-form-item>
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
