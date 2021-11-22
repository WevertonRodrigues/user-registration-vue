import { Vue, Component, VModel, Prop } from 'nuxt-property-decorator'

@Component
export default class FormMixin extends Vue {
  @VModel({ type: Object, default: () => {} })
  form!: any

  @Prop(Boolean)
  loading!: boolean

  @Prop({ type: Boolean, default: false })
  skeletonLoading!: boolean
}
