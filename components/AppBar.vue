<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="syncedOpenSideBar = !syncedOpenSideBar" />
    <v-toolbar-title v-text="title" />
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
