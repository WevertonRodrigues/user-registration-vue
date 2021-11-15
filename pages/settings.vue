<template>
  <v-container
    class="register-page d-flex flex-column align-center justify-center"
    fluid
  >
    <Alert v-model="alert.open" :text="alert.text" type="success" />

    <FormsContainerCard
      title="Altere seus dados"
      text-btn-action="Salvar alterações"
      @btnAction="openConfirmationDialog"
    >
      <ValidationObserver ref="settingsObserver" tag="v-form">
        <FormsMain v-model="form" :filter-login-fields="filterLoginFields" />
      </ValidationObserver>
      {{ user }}
    </FormsContainerCard>

    <v-dialog v-model="passwordConfirm.openDialog">
      <FormsContainerCard
        title="Confirme a senha"
        text-btn-action="Confirmar alterações"
        :loading="loading"
        @btnAction="submit"
      >
        {{ passwordConfirm }}
        <FormsBase
          v-model="passwordConfirm"
          :loading="loading"
          :fields="fieldPasswordConfirm"
        />
      </FormsContainerCard>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import { User } from '~/models'

@Component({
  middleware: ['verify-email'],
})
export default class SettingsPage extends Vue {
  @Ref('settingsObserver')
  settingsObserver!: any

  loading = false

  alert = {
    text: '',
    open: false,
  }

  form: Partial<User> = {
    address: {
      cep: '',
      nation: '',
      state: '',
      city: '',
      street: '',
      number: '',
      complement: '',
    },
  }

  passwordConfirm = {
    openDialog: false,
    value: '',
    oldValue: '',
  }

  fieldPasswordConfirm: Field[] = [
    {
      label: 'Confirme a senha atual',
      prop: 'value',
      type: 'password',
      rules: ['required', 'confirmed:oldValue'],
      appendIcon: {
        icon: 'mdi-eye',
        click: (field: Field) => {
          if (field.type === 'password') {
            field.type = 'text'
            if (field.appendIcon) {
              field.appendIcon.icon = 'mdi-eye-off'
            }
          } else {
            field.type = 'password'
            if (field.appendIcon) {
              field.appendIcon.icon = 'mdi-eye'
            }
          }
        },
      },
    },
  ]

  get user() {
    return this.$store.state.user.user
  }

  filterLoginFields(item: Field) {
    return item.prop === 'email'
  }

  async created() {
    const docRef = this.$fire.firestore.collection('users').doc(this.user.email)

    await docRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          this.form = { ...doc.data(), password: '' }
          console.log(doc.data())

          this.passwordConfirm.oldValue = doc.data().password
        }
      })
      .catch((err: any) => {
        console.log('Error getting document:', err)
      })
  }

  openConfirmationDialog() {
    this.passwordConfirm.openDialog = true
  }

  async submit() {
    const valid = await this.settingsObserver.validate()

    if (valid) {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const docRef = this.$fire.firestore
        .collection('users')
        .doc(this.user.email)

      const user = this.$fire.auth.currentUser

      Promise.all([
        docRef.update({
          ...this.form,
          password: this.passwordConfirm.oldValue,
        }),
        user.updateProfile({
          displayName: this.form.displayName,
          email: this.form.email,
        }),
      ])
        .then(() => {
          const { uid, email, emailVerified } = user

          this.$store.dispatch('user/onAuthStateChangedAction', {
            authUser: {
              uid,
              email,
              emailVerified,
              displayName: this.form.displayName,
            },
          })

          this.passwordConfirm.openDialog = false

          this.alert = {
            text: 'Perfil atualizado com sucesso.',
            open: true,
          }
        })
        .catch((err: any) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', err)
        })

      this.loading = false
    }
  }
}
</script>
