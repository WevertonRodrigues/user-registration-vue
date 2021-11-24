<template>
  <v-navigation-drawer v-model="openSideBar" clipped fixed app>
    <v-list>
      <template v-for="(item, i) in items">
        <v-list-item v-if="!item.hide" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block @click="logout">
          <span class="mr-2">Sair</span> <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

export interface SideBarItem {
  id: number | string
  icon?: string
  title: string
  to: string
  hide?: boolean
}

@Component
export default class SideBar extends Vue {
  @Prop({ type: Array, default: () => [] })
  items!: SideBarItem[]

  @VModel({ type: Boolean, default: false })
  openSideBar!: boolean

  async logout() {
    await this.$fire.auth.signOut().then(() => this.$router.replace('/login'))
  }
}
</script>
