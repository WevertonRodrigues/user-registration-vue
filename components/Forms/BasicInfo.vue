<template>
  <FormsBase
    v-model="form"
    v-bind="{ fields, loading, skeletonLoading }"
    v-on="{ ...$listeners }"
  />
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsBasicInfo extends FormMixin {
  fields: Field[] = [
    {
      label: 'Nome',
      prop: 'displayName',
      rules: ['required'],
    },
    {
      label: 'CPF',
      prop: 'cpf',
      rules: ['required', 'cpf'],
      mask: '###.###.###-##',
    },
    {
      label: 'PIS',
      prop: 'pis',
      type: 'number',
      rules: ['required'],
    },
  ]
}
</script>
