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
import { Component, Vue } from 'nuxt-property-decorator'
import { MenuItem } from '~/components/SideBar.vue'

@Component
export default class DefaultLayout extends Vue {
  openSideBar = true

  items: MenuItem[] = [
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
  ]

  get title() {
    return this.$fire.auth.currentUser
      ? `Olá, ${this.user.displayName}`
      : 'Olá visitante'
  }

  get user() {
    return this.$store.state.user.user
  }
}
</script>
<style lang="scss">
.v-main {
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
