<template>
  <v-container class="d-flex text-center flex-column justify-center" fluid>
    Esta é a página inicial do perfil:
    <span
      v-for="info in initialInfo"
      :key="info.title"
      class="d-flex align-center justify-center"
    >
      <span class="mr-2">- {{ info.title }}:</span>
      <v-skeleton-loader
        class="rounded"
        type="text"
        width="100%"
        max-width="20em"
        max-height="12px"
        :loading="!info.value"
        ><strong>{{ info.value }}</strong></v-skeleton-loader
      >
    </span>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  middleware: ['verify-email'],
})
export default class IndexPage extends Vue {
  get initialInfo() {
    return [
      {
        title: 'Nome',
        value: this.user.displayName,
      },
      {
        title: 'E-mail',
        value: this.user.email,
      },
    ]
  }

  get user() {
    return this.$store.state.user.user
  }
}
</script>
