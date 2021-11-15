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
    },
    {
      label: 'País',
      prop: 'nation',      
    },
    {
      label: 'Estado',
      prop: 'state',      
    },
    {
      label: 'Cidade',
      prop: 'city',      
    },
    {
      label: 'Rua',
      prop: 'street',      
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
