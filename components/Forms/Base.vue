<template>
  <div>
    <!-- Fields -->
    <ValidationProvider
      v-for="field in fields"
      :key="field.prop"
      v-slot="{ errors }"
      tag="div"
      :vid="field.prop"
      :rules="normalizeRules(field)"
      :name="field.label"
      :custom-messages="field.customMessages"
    >
      <v-text-field
        v-mask="field.mask"
        :value="getValue()[field.prop]"
        :label="field.label"
        :error-messages="errors.concat(field.errors || [])"
        :type="field.type"
        :disabled="loading"
        :append-icon="field.appendIcon && field.appendIcon.icon"
        outlined
        @keydown="keydowEmit"
        @click:append="field.appendIcon.click(field)"
        @input="setValue({ propName: field.prop, value: $event })"
        @change="$emit('input', getValue())"
      >
      </v-text-field>
    </ValidationProvider>
  </div>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FormBaseMixin, { Field } from '~/mixins/formBaseMixin'

@Component
export default class FormsBase extends FormBaseMixin {
  normalizeRules(field: Field) {
    return !field.rules?.length ? field.rules : (field?.rules || ['']).join('|')
  }

  keydowEmit(evt: KeyboardEvent) {
    if (evt.code === 'Enter') {
      this.$emit('enter')
    }
  }
}
</script>
