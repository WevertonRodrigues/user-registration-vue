<template>
  <v-card :loading="loading" width="90%">
    <v-card-title class="accent">
      <v-container fluid class="text-center">
        <h4 class="font-weight-medium">{{ title }}</h4>
      </v-container>
    </v-card-title>

    <v-responsive class="px-6 overflow-y-auto" max-height="70vh">
      <slot></slot>
    </v-responsive>

    <v-divider class="mx-6 mb-4"></v-divider>

    <v-card-actions class="px-6 pb-4">
      <v-spacer />
      <slot name="footer-area"></slot>
      <v-btn class="px-8" :loading="loading" @click="$emit('btnAction')">
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
}
</script>
