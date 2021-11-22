<template>
  <v-card class="forms-container-card" :loading="loading" width="100%">
    <v-card-title class="accent">
      <v-container fluid class="text-center">
        <h4 class="font-weight-medium">{{ title }}</h4>
      </v-container>
    </v-card-title>

    <v-responsive class="overflow-y-auto" max-height="70vh">
      <v-container
        class="forms-container-body d-flex flex-column gap px-4 px-sm-6"
      >
        <slot></slot>
      </v-container>
    </v-responsive>

    <v-divider class="mb-4"></v-divider>

    <v-card-actions class="d-flex flex-column flex-sm-row pb-4 px-6">
      <v-spacer />
      <div class="mb-4 mb-sm-0 mr-sm-4">
        <slot name="footer-area"></slot>
      </div>
      <v-btn
        class="px-8"
        :loading="loading"
        :disabled="disabledBtnAction"
        @click="$emit('btnAction')"
      >
        {{ textBtnAction }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ContainerCardForm extends Vue {
  @Prop(String)
  title!: string

  @Prop({ type: String, default: 'Realizar ação' })
  textBtnAction!: string

  @Prop(Boolean)
  loading!: boolean

  @Prop(Boolean)
  disabledBtnAction!: boolean
}
</script>
<style lang="scss">
.forms-container-body {
  .gap {
    gap: 1em;
  }
}
</style>
