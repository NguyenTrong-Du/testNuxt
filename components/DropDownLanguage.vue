<template>
  <div :class="classProp">
    <MdGlobeIcon w="25px" h="25px" />
    <a-dropdown class="ml-1 flex items-center gap-1">
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        {{ $i18n.locale === 'en' ? 'English' : '日本語' }}
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="() => $i18n.setLocale(locale.code)"
        >
          {{ locale.name }}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'

export default {
  components: {
    MdGlobeIcon,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['classProp'],
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
  methods: {
    handleChangeLanguage(locale) {
      localStorage.setItem('locale', locale)
    },
  },
}
</script>

<style></style>
