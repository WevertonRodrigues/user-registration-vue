<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <Alert v-model="alert.open" :text="alert.text" />

    <FormsContainerCard
      title="Olá, visitante"
      text-btn-action="Criar conta"
      :loading="loading"
      @btnAction="submit"
    >
      <template #footer-area>
        <nuxt-link to="/login">Já possui conta?</nuxt-link>
      </template>
      <ValidationObserver ref="registerObserver" class="mx-2" tag="v-form">
        <FormsMain v-model="form" :loading="loading" />
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
  @Ref('registerObserver')
  registerObserver!: any

  form: User = {
    address: {
      cep: '',
      nation: '',
      state: '',
      city: '',
      street: '',
      district: '',
      number: '',
      complement: '',
    },
  } as User

  loading = false

  alert = {
    text: '',
    open: false,
  }

  get user() {
    return this.$store.state.user
  }

  filterFields(item: Field) {
    return item.prop !== 'passwordRepeat'
  }

  async submit() {
    const valid = await this.registerObserver.validate()

    if (valid) {
      this.loading = true
      delete (this.form as any).passwordRepeat

      const ref = this.$fire.firestore.collection('users').doc()

      this.form.uuid = ref.id

      await Promise.all([
        // Insert user info in db
        ref.set(this.form),
        // Insert profile
        this.$fire.auth.createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        ),
      ])
        .then(() => {
          const user = this.$fire.auth.currentUser

          Promise.all([
            // Update profile
            user.updateProfile({
              displayName: this.form.displayName,
            }),
            // Send email verification
            user.sendEmailVerification({
              url: window.document.location.origin,
            }),
          ])

          // Dispatch user store
          this.$store.dispatch('user/onAuthStateChangedAction', {
            authUser: {
              ...user,
              displayName: this.form.displayName,
            },
          })
          // Replace route to 'verify-email'
          this.$router.replace('/verify-email')
        })
        .catch((err: any) => {
          console.log(err.code, err.message)

          const text = alertError(err.code)

          this.alert = {
            text,
            open: true,
          }
        })
      this.loading = false
    }
  }
}
</script>
