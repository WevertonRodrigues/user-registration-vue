<template>
  <v-alert
    v-model="opened"
    class="alert mt-8"
    :type="type"
    icon="mdi-alert-circle"
    border="left"
    dismissible
  >
    {{ text }}
  </v-alert>
</template>
<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

@Component
export default class Alert extends Vue {
  @VModel({ type: Boolean, default: false })
  opened!: boolean

  @Prop(String)
  text!: string

  @Prop({ type: String, default: 'error' })
  type!: string
}
</script>

<style lang="scss">
.alert {
  width: 100%;
}
</style>
