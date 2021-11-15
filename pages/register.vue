<template>
  <v-container
    class="register-page d-flex flex-column align-center justify-center"
    fluid
  >
    <Alert v-model="alert.open" :text="alert.text" />

    <FormsContainerCard
      title="Olá visitante"
      text-btn-action="Criar conta"
      :loading="loading"
      @btnAction="submit"
    >
      <template #footer-area>
        <nuxt-link to="/login" class="mr-6">Já possui conta?</nuxt-link>
      </template>
      <ValidationObserver ref="registerObserver" class="mx-2" tag="v-form">
        <FormsMain
          v-model="form"
          :loading="loading"
          add-password-strength-rule
        />
      </ValidationObserver>
    </FormsContainerCard>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import { User } from '~/models/user'
import { firebaseError } from '~/util/firebaseError'

@Component({
  layout: 'blank',
  middleware: ['ensure-unauth'],
})
export default class LoginPage extends Vue {
  @Ref('registerObserver')
  registerObserver!: any

  form: Partial<User> = {}

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

      let user: any = {}

      console.log(user)

      Promise.all([
        // Insert user info in db
        this.$fire.firestore
          .collection('users')
          .doc(this.form.email)
          .set(this.form),
        // Insert profile
        this.$fire.auth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            user = this.$fire.auth.currentUser

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
          }),
      ])
        .then(() => {
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

          const text = firebaseError(err.code)

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
