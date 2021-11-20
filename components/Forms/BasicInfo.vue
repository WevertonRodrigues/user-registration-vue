<template>
  <FormsBase v-model="form" v-bind="{ fields, loading }" />
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
      rules: ['required'],
      mask: '###.###.###-##',
    },
    {
      label: 'PIS',
      prop: 'pis',
      rules: ['required'],
    },
  ]
}
</script>
