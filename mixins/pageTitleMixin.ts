import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageTitleMixin extends Vue {
  items: any[] = []

  head() {
    return {
      title: { d: 'Registro de Usuários', n: this.currentRoute },
      titleTemplate: ({ d, n }: any) => {
        return `${d} - ${n}`
      },
    }
  }

  get currentRoute() {
    return this.items.find((i) => i.to === this.$route.fullPath)?.title
  }
}
