import { Context, Middleware } from '@nuxt/types'

const auth: Middleware = ({ app, redirect }: Context) => {
  if (!app.$fire.auth.currentUser) {
    return redirect('/login')
  }
}

export default auth
