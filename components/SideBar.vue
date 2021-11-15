<template>
  <v-navigation-drawer v-model="openSideBar" clipped fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block @click="logout"> Sair </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

export interface MenuItem {
  id: number | string
  icon: string
  title: string
  to: string
}


@Component
export default class SideBar extends Vue {
  @Prop({ type: Array, default: () => [] })
  items!: MenuItem[]

  @VModel({ type: Boolean, default: false })
  openSideBar!: boolean

  async logout() {
    await this.$fire.auth.signOut().then(() => this.$router.replace('/login'))
  }
}
</script>
