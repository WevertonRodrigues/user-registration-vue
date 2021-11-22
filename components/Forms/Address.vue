<template>
  <FormsBase
    :value="form"
    v-bind="{ fields, loading, skeletonLoading }"
    v-on="{ ...$listeners }"
    @input="handleAddressChange"
  />
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Address } from '~/models/address'
import { Field } from '~/mixins/formBaseMixin'
import { alertError } from '~/util/alertError'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsAddress extends FormMixin {
  fields: Field[] = [
    {
      label: 'CEP',
      prop: 'cep',
      rules: { required: true, regex: /^[0-9]{5}-[0-9]{3}$/ },
      mask: '#####-###',
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
      label: 'Bairro',
      prop: 'district',
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

  async handleAddressChange(address: Address) {
    if (address?.cep !== '') {
      const { data, errors } = await this.getAddress(address?.cep)
        .then((res) => ({ data: res, errors: [] }))
        .catch((err: Error) => {
          const errMsg = alertError(err.message)

          return {
            data: {
              nation: '',
              state: '',
              city: '',
              street: '',
              district: '',
            } as Address,
            errors: [errMsg],
          }
        })

      this.$set(this.fields[0], 'errors', errors)

      if (data) {
        Object.assign(address, data)
      }
    }

    this.$emit('input', address)
  }

  async getAddress(cep: string) {
    const cepNormalized = cep?.replace(/-/, '') ?? null

    if (cepNormalized.length === 8) {
      return await this.$axios(
        `https://viacep.com.br/ws/${cepNormalized}/json/`
      ).then(({ data }) => {
        return !data.erro
          ? {
              cep: data.cep,
              state: data.uf,
              city: data.localidade,
              street: data.logradouro,
              district: data.bairro,
              complement: data.complemento,
            }
          : Promise.reject(new Error('cep-not-found'))
      })
    }

    return Promise.reject(new Error('cep-not-found'))
  }
}
</script>
