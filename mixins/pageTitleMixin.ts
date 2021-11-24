import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageTitleMixin extends Vue {
  items: any[] = []

  head() {
    return {
      title: { n: 'Registro de Usuários', r: this.currentRoute },
      titleTemplate: ({ n, r }: any) => {
        return `${n} - ${r}`
      },
    }
  }

  get currentRoute() {
    return this.items.find((i) => i.to === this.$route.fullPath)?.title
  }
}
