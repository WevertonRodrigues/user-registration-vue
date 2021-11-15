<template>
  <h3 class="text-center">
    Um e-mail foi enviado para {{ user.email }}. Verifique sua caixa de entrada.
  </h3>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class VerifyEmailPage extends Vue {
  get user() {
    return this.$store.state.user.user
  }
}
</script>
