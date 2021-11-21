<template>
  <v-container
    class="login-page d-flex flex-column align-center justify-center"
  >
    <Alert v-model="alert.open" :text="alert.text" :type="alert.type" />

    <FormsContainerCard
      title="Recupere sua senha"
      text-btn-action="Solicitar recuperação"
      :loading="loading"
      @btnAction="submit"
    >
      <template #footer-area>
        <nuxt-link class="text-center mr-6" to="/login">
          Já possui conta?
        </nuxt-link>
      </template>

      <ValidationObserver
        ref="recoveryObserver"
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
import { User } from '~/models'
import { alertError } from '~/util/alertError'

@Component({
  layout: 'blank',
  middleware: ['ensure-unauth'],
})
export default class RecoveryPage extends Vue {
  @Ref('recoveryObserver')
  recoveryObserver!: any

  loading = false

  form: Partial<User> = {}

  alert = {
    text: '',
    open: false,
    type: 'error',
  }

  filterFields(item: Field) {
    return !item.prop?.includes('password')
  }

  async submit() {
    this.loading = true
    const valid = await this.recoveryObserver.validate()

    if (valid) {
      this.$fire.auth
        .sendPasswordResetEmail(this.form.email, {
          url: window.document.location.origin,
        })
        .then(() => {
          this.alert = {
            text: 'Um link com recuperação da senha foi enviado para o e-mail fornecido.',
            open: true,
            type: 'success',
          }
        })
        .catch((err: any) => {
          const text = alertError(err.code)

          this.alert = {
            text,
            open: true,
            type: 'error',
          }
        })
    }

    this.loading = false
  }
}
</script>
