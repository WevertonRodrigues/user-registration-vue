<template>
  <div :class="['forms-base', { 'gap-skeleton': skeletonLoading }]">
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
      <v-skeleton-loader v-if="skeletonLoading" class="rounded" type="button">
      </v-skeleton-loader>
      <v-text-field
        v-else
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
import FormBaseMixin from '~/mixins/formBaseMixin'

@Component
export default class FormsBase extends FormBaseMixin {}
</script>
<style lang="scss">
.forms-base {
  &.gap-skeleton {
    display: flex;
    flex-direction: column;
    gap: 1.885em !important;
  }
  .v-skeleton-loader {
    &__bone {
      width: 100%;
      height: 56px;
    }
  }
}
</style>
