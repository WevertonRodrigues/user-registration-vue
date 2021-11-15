// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: {},
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: (state: RootState) => state.user,
}

export const mutations: MutationTree<RootState> = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, authUser) => {
    if (!authUser) {
      state.user = {}
    } else {
      const { uid, email, emailVerified, displayName } = authUser
      state.user = { uid, email, emailVerified, displayName }
    }
  },
}

export const actions: ActionTree<RootState, any> = {
  onAuthStateChangedAction(ctx, { authUser }) {
    ctx.commit('ON_AUTH_STATE_CHANGED_MUTATION', authUser)
  },
}
