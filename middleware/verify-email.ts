import { Context, Middleware } from '@nuxt/types'

const verifyEmail: Middleware = ({ redirect, app }: Context) => {
  if (!app.$fire.auth.currentUser?.emailVerified) {
    return redirect('/verify-email')
  }
}

export default verifyEmail
