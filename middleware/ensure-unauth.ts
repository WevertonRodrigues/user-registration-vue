import { Context, Middleware } from '@nuxt/types'

const ensureUnauth: Middleware = ({ app, redirect }: Context) => {
  if (app.$fire.auth.currentUser) {
    return redirect('/')
  }
}

export default ensureUnauth
