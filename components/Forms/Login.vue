<template>
  <FormsBase
    v-model="form"
    v-bind="{ fields: fieldsFiltered, loading, skeletonLoading }"
    v-on="{ ...$listeners }"
  />
</template>
<script lang="ts">
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsLogin extends FormMixin {
  @Prop({ type: Function, default: () => true })
  filterFields!: (item: any) => boolean

  @Prop({ type: Object, default: () => null })
  config!: Record<string, Partial<Field>> | null

  @Watch('config', { deep: true })
  onConfigChange(value: Record<string, Partial<Field>>) {
    this.fields.map((field) =>
      Object.assign(field, value?.[field?.prop ?? ''] ?? {})
    )
  }

  fields: Field[] = [
    {
      label: 'E-mail',
      prop: 'email',
      rules: ['required', 'email'],
    },
    {
      label: 'Senha',
      prop: 'password',
      type: 'password',
      rules: ['required', 'min:8', 'passwordStrength'],
      appendIcon: this.appendIcon,
    },
    {
      label: 'Repita a senha',
      prop: 'passwordRepeat',
      type: 'password',
      rules: ['required', 'confirmed:password'],
      appendIcon: this.appendIcon,
    },
  ]

  created() {
    if (this.config) {
      this.onConfigChange(this.config)
    }
  }

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
