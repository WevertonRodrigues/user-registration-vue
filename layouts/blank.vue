<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col md="10" lg="8" xl="8">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { SideBarItem } from '~/components/SideBar.vue'
import PageTitleMixin from '~/mixins/pageTitleMixin'

@Component
export default class BlankLayout extends PageTitleMixin {
  items: SideBarItem[] = [
    {
      id: 0,
      title: 'Login',
      to: '/login',
    },
    {
      id: 1,
      title: 'Signin',
      to: '/signin',
    },
    {
      id: 2,
      title: 'Recuperar senha',
      to: '/recovery',
    },
  ]
}
</script>

<style lang="scss">
html {
  overflow-y: auto;
}

.v-main {
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    a:hover {
      color: #757575;
    }
  }
}
</style>
