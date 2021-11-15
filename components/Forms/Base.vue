<template>
  <v-container class="pa-0">
    <!-- Fields -->
    <ValidationProvider
      v-for="(field, index) in fields"
      :key="index"
      v-slot="{ errors }"
      class="mb-4"
      tag="div"
      :vid="field.prop"
      :rules="field.rules ? field.rules.join('|') : ''"
      :name="field.label"
    >
      <v-text-field
        :value="getValue()[field.prop]"
        :label="field.label"
        :error-messages="errors"
        :type="field.type"
        :disabled="loading"
        :append-icon="field.appendIcon && field.appendIcon.icon"
        outlined
        @click:append="field.appendIcon.click(field)"
        @input="setValue({ propName: field.prop, value: $event })"
      >
      </v-text-field>
    </ValidationProvider>
  </v-container>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FormBaseMixin from '~/mixins/formBaseMixin'

@Component
export default class FormsBase extends FormBaseMixin {}
</script>
