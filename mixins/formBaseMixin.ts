import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'
import FormMixin from './formMixin'

export interface Field {
  label: string
  prop?: string
  type?: string
  rules?: string[] | Record<string, any>
  mask?: string
  customMessages?: Record<string, any>
  appendIcon?: {
    icon: string
    click?: (field: Field) => void
  }
  prependIcon?: {
    icon: string
  }
}

@Component
export default class FormBaseMixin extends FormMixin {
  @VModel({ type: Object, default: () => {} })
  form!: any

  @Prop({
    type: Function,
    default(this: FormBaseMixin) {
      return this.form
    },
  })
  getValue!: () => any

  @Prop({
    type: Function,
    default(this: FormBaseMixin, { propName, value }: any) {
      Vue.set(this.getValue(), propName, value)
    },
  })
  setValue!: (data: any) => void

  @Prop({ type: Array, default: () => [] })
  fields!: Field[]

  normalizeRules(field: Field) {
    return !field.rules?.length ? field.rules : (field?.rules || ['']).join('|')
  }

  keydowEmit(evt: KeyboardEvent) {
    if (evt.code === 'Enter') {
      this.$emit('enter')
    }
  }
}
