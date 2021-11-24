<template>
  <v-app dark>
    <AppBar :title="title" :open-side-bar.sync="openSideBar" />

    <SideBar v-model="openSideBar" :items="items" />

    <v-main>
      <v-container class="d-flex justify-center">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { SideBarItem } from '~/components/SideBar.vue'
import PageTitleMixin from '~/mixins/pageTitleMixin'

@Component({
  middleware: ['auth'],
})
export default class DefaultLayout extends PageTitleMixin {
  openSideBar = true

  items: SideBarItem[] = [
    {
      id: 0,
      icon: 'mdi-home',
      title: 'Página inicial',
      to: '/',
    },
    {
      id: 1,
      icon: 'mdi-cog',
      title: 'Configurações',
      to: '/settings',
    },
    {
      id: 2,
      title: 'Verificar E-mail',
      to: '/verify-email',
      hide: true,
    },
  ]

  get title() {
    return this.user?.displayName ?? null
  }

  get user() {
    return this.$store.state.user.user
  }
}
</script>
<style lang="scss">
html {
  overflow-y: auto;
}

.v-main {
  &__wrap {
    width: 100%;
  }
}
</style>
