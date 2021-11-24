<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <Alert v-model="alert.open" :text="alert.text" />

    <FormsContainerCard
      title="Entre no sistema"
      text-btn-action="Entrar"
      :loading="loading"
      @btnAction="submit"
    >
      <template #footer-area>
        <nuxt-link to="/signin">Não possui conta?</nuxt-link>
      </template>

      <ValidationObserver
        ref="loginObserver"
        tag="v-form"
        class="d-flex flex-column mt-6"
        @submit.prevent="submit"
      >
        <FormsLogin
          v-model="form"
          :loading="loading"
          :filter-fields="filterFields"
          :config="loginConfig"
          @enter="submit"
        />
        <nuxt-link class="text-center align-self-center mb-4" to="/recovery">
          Esqueceu a senha?
        </nuxt-link>
      </ValidationObserver>
    </FormsContainerCard>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import { User } from '~/models/user'
import { alertError } from '~/util/alertError'

@Component({
  layout: 'blank',
  middleware: ['ensure-unauth'],
})
export default class LoginPage extends Vue {
  @Ref('loginObserver')
  loginObserver!: any

  form: Partial<User> = {}

  loading = false

  alert = {
    text: '',
    open: false,
  }

  loginConfig: Record<string, Partial<Field>> = {
    password: {
      rules: ['required'],
    },
  }

  get user() {
    return this.$store.state.user
  }

  filterFields(item: Field) {
    return item.prop !== 'passwordRepeat'
  }

  async submit() {
    this.loading = true
    const valid = await this.loginObserver.validate()

    if (valid) {
      await this.$fire.auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.replace('/'))
        .catch((err: any) => {
          console.log(err.code, err.message)

          const text = alertError(err.code)

          this.alert = {
            text,
            open: true,
          }
        })
    }
    this.loading = false
  }
}
</script>
