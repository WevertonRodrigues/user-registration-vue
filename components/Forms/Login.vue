<template>
  <FormsBase v-model="form" v-bind="{ fields: fieldsFiltered, loading }" />
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsLogin extends FormMixin {
  @Prop({ type: Function, default: () => true })
  filterFields!: (item: any) => boolean

  @Prop(Boolean)
  addPasswordStrengthRule!: boolean

  fields: Field[] = [
    {
      label: 'E-mail',
      prop: 'email',
    },
    {
      label: 'Senha',
      prop: 'password',
      type: 'password',
      appendIcon: this.appendIcon,
    },
    {
      label: 'Repita a senha',
      prop: 'passwordRepeat',
      type: 'password',
      appendIcon: this.appendIcon,
    },
  ]

  get fieldsFiltered() {
    return this.fields.filter(this.filterFields)
  }

  get appendIcon() {
    return {
      icon: 'mdi-eye',
      click: (field: Field) => {
        if (field.type === 'password') {
          field.type = 'text'
          if (field.appendIcon) {
            field.appendIcon.icon = 'mdi-eye-off'
          }
        } else {
          field.type = 'password'
          if (field.appendIcon) {
            field.appendIcon.icon = 'mdi-eye'
          }
        }
      },
    }
  }
}
</script>
