<template>
  <v-container
    class="login-page d-flex flex-column align-center justify-center"
    fluid
  >
    <FormsContainerCard
      title="Entre no sistema"
      text-btn-action="Entrar"
      :loading="loading"
      @btnAction="submit"
    >
      <template #footer-area>
        <nuxt-link to="/register" class="mr-6">Não possui conta?</nuxt-link>
      </template>

      <ValidationObserver
        ref="loginObserver"
        tag="v-form"
        class="d-flex flex-column mt-6"
      >
        <FormsLogin
          v-model="form"
          :loading="loading"
          :filter-fields="filterFields"
        />
      </ValidationObserver>
    </FormsContainerCard>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import { User } from '~/models/user'

@Component({
  layout: 'blank',
})
export default class LoginPage extends Vue {
  @Ref('loginObserver')
  loginObserver!: any

  form: Partial<User> = {}

  loading = false

  get user() {
    return this.$store.state.user
  }

  filterFields(item: Field) {
    return item.prop !== 'passwordRepeat'
  }

  async submit() {
    const valid = await this.loginObserver.validate()

    if (valid) {
      this.loading = true

      await this.$fire.auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.replace('/'))
        .catch((err: any) => {
          console.log(err)
        })

      this.loading = false
    }
  }
}
</script>
