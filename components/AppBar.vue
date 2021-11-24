<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="syncedOpenSideBar = !syncedOpenSideBar" />
    <v-toolbar-title class="d-flex align-center">
      <span class="mr-2">Olá,</span>
      <v-skeleton-loader type="text" :loading="!title" width="20em">{{
        title
      }}</v-skeleton-loader></v-toolbar-title
    >
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'

@Component
export default class AppBar extends Vue {
  @Prop(String)
  title!: string

  @PropSync('openSideBar', Boolean)
  syncedOpenSideBar!: boolean
}
</script>
<style lang="scss">
.v-app-bar {
  .v-skeleton-loader__bone {
    height: 22px;
    margin-bottom: 0 !important;
  }
}
</style>
