<template>
  <FormsBase v-model="form" v-bind="{ fields, loading }" />
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsAddress extends FormMixin {
  fields: Field[] = [
    {
      label: 'CEP',
      prop: 'cep',
      rules: ['required'],
    },
    {
      label: 'País',
      prop: 'nation',
      rules: ['required'],
    },
    {
      label: 'Estado',
      prop: 'state',
      rules: ['required'],
    },
    {
      label: 'Cidade',
      prop: 'city',
      rules: ['required'],
    },
    {
      label: 'Rua',
      prop: 'street',
      rules: ['required'],
    },
    {
      label: 'Número',
      prop: 'number',
    },
    {
      label: 'Complemento',
      prop: 'complement',
    },
  ]
}
</script>
