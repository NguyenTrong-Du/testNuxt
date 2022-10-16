<script>
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
import TheBody from '~/components/TestPage/TheBody.vue'

export default {
  name: 'TestPage',
  components: { TheBody, MdGlobeIcon },
  data() {
    return {
      availableLocales: [
        { code: 'en', name: 'English' },
        { code: 'ja', name: 'Japanese' },
      ],
    }
  },
}
</script>

<template>
  <div>
    <div class="test-tailwind">hello</div>
    <div>hello</div>
    <div>{{ $t('homepage.password') }}</div>
    <div>{{ $i18n.locale }}</div>
    <the-body />
    <a-dropdown class="ml-1 flex items-center gap-1">
      <a class="ant-dropdown-link">
        <MdGlobeIcon w="25px" h="25px" />
        {{ $t(`language.${$i18n.locale}`) }}
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="$i18n.setLocale(locale.code)"
        >
          {{ $t(`language.${locale.name}`) }}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
