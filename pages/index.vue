<template>
  <v-container class="d-flex text-center flex-column justify-center" fluid>
    Esta é a página inicial do perfil:
    <span>
      - Nome: <strong>{{ user.displayName }}</strong>
    </span>
    <span>
      - E-mail: <strong>{{ user.email }}</strong>
    </span>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  middleware: ['verify-email'],
})
export default class IndexPage extends Vue {
  get user() {
    return this.$store.state.user.user
  }
}
</script>
