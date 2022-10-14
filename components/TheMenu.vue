<template>
  <a-menu
    class="menu-light"
    style="width: 100%; height: 100%; background-color: rgb(107, 114, 128)"
    :default-selected-keys="current"
    :open-keys.sync="openKeys"
    mode="inline"
    @click="handleClick"
    ><a-menu-item key="1">
      <nuxt-link :to="localePath('/profile/edit')">
        {{ $t('editprofile.editBasicProfile') }}</nuxt-link
      >
    </a-menu-item>
    <a-menu-item key="2">
      {{ $t('editprofile.editMailProfile') }}
    </a-menu-item>
    <a-menu-item key="3">
      {{ $t('editprofile.alignmentProfile') }}
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title">
        <span>{{ $t('editprofile.menuProfile') }}</span></span
      >
      <a-menu-item key="4" class="!pl-6 flex items-center">
        <a-icon type="right" />
        {{ $t('editprofile.editPersonProfile') }}
      </a-menu-item>
      <a-menu-item key="5" class="!pl-6 flex items-center">
        <nuxt-link :to="localePath('/profile/edit/corporateinfo')">
          <a-icon type="right" />
          {{ $t('editprofile.editCompanyProfile') }}</nuxt-link
        >
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  name: 'TheMenu',
  data() {
    return {
      current: ['1'],
      openKeys: [],
      path: $nuxt.$route.path,
    }
  },
  watch: {
    path() {
      if (this.path.includes('/profile/edit/corporateinfo')) {
        this.openKeys = ['sub1']
        this.current = ['5']
      } else if (this.path.includes('/profile/edit')) {
        this.current = ['1']
      }
    },
    openKeys(val) {
      // eslint-disable-next-line no-console
      console.log('openKeys', val)
    },
  },
  created() {
    if (this.path.includes('/profile/edit/corporateinfo')) {
      this.openKeys = ['sub1']
      this.current = ['5']
    }
  },
  methods: {
    handleClick(e) {
      // eslint-disable-next-line no-console
      console.log('click', e)
    },
    titleClick(e) {
      // eslint-disable-next-line no-console
      console.log('titleClick', e)
    },
  },
}
</script>
