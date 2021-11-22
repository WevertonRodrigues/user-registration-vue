<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <Alert v-model="alert.open" :text="alert.text" type="success" />

    <FormsContainerCard
      title="Altere seus dados"
      text-btn-action="Salvar alterações"
      :disabled-btn-action="!hasDiff"
      @btnAction="openPasswordConfirm"
    >
      <ValidationObserver
        ref="settingsObserver"
        tag="v-form"
        @submit.prevent="checkCanCall(hasDiff, openPasswordConfirm)"
      >
        <FormsMain
          v-model="form"
          v-bind="{ loginConfig, skeletonLoading }"
          @enter="checkCanCall(hasDiff, openPasswordConfirm)"
        />
      </ValidationObserver>
    </FormsContainerCard>

    <!-- Dialog password confirm -->
    <v-dialog
      v-model="passwordConfirm.openDialog"
      @click:outside="resetPasswordConfirm()"
    >
      <ValidationObserver
        ref="confirmObserver"
        v-slot="{ invalid }"
        tag="v-form"
        @submit.prevent="submit"
      >
        <FormsContainerCard
          title="Confirme a senha atual"
          text-btn-action="Confirmar alterações"
          :loading="loading"
          :disabled-btn-action="invalid"
          @btnAction="checkCanCall(invalid === false, submit)"
        >
          <FormsBase
            v-model="passwordConfirm"
            class="mt-6"
            :loading="loading"
            :fields="fieldPasswordConfirm"
            @enter="checkCanCall(invalid === false, submit)"
          />
        </FormsContainerCard>
      </ValidationObserver>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { isEqual } from 'lodash'
import { Vue, Component, Ref, Watch } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import { User } from '~/models/user'

@Component({
  middleware: ['verify-email'],
})
export default class SettingsPage extends Vue {
  @Ref('settingsObserver')
  settingsObserver!: any

  @Ref('confirmObserver')
  confirmObserver!: any

  loading = false
  hasDiff = false
  skeletonLoading = true

  alert = {
    text: '',
    open: false,
  }

  form: User = {} as User
  originalForm: User = {} as User

  passwordConfirm = {
    openDialog: false,
    value: '',
  }

  fieldPasswordConfirm: Field[] = [
    {
      label: 'Senha atual',
      prop: 'value',
      type: 'password',
      rules: ['required'],
      customMessages: {
        is: 'Valor da senha atual inválido',
      },
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

  @Watch('form', { deep: true })
  onWatchChange(value: User) {
    this.hasDiff = isEqual(this.originalForm, value) !== true
  }

  get user() {
    return this.$store.state.user.user
  }

  get loginConfig() {
    return {
      password: {
        label: 'Nova senha',
        rules: ['min:8', 'passwordStrength'],
      },
      passwordRepeat: {
        label: 'Repita a nova senha',
        rules: [this.form.password ? 'required' : '', 'confirmed:password'],
      },
    }
  }

  async created() {
    await this.loadForm()
  }

  async loadForm() {
    // Get document ref base in actual user
    const usersRef = this.$fire.firestore.collection('users')

    // Get document based in previous ref
    await usersRef
      .where('email', '==', this.user.email)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          if (doc.exists) {
            // Save doc to form variable
            this.form = { ...doc.data(), password: '' }

            // Save doc in a 'original' variable
            Object.assign(this.originalForm, { ...doc.data(), password: '' })

            // Save currentPassword
            this.$set(
              this.fieldPasswordConfirm[0].rules ?? {},
              1,
              `is:${doc.data().password}`
            )

            // Disable skeleton loader
            this.skeletonLoading = false
          }
        })
      })
  }

  async updateAuth(user: any, options: any[]) {
    // If password was changed, update
    return await Promise.all(
      options.map((opt: any) => this.triggerAuthMethod(user, opt))
    ).catch(async () => {
      // In error case reauthenticate current user with old credentials
      const credential = this.$fireModule.auth.EmailAuthProvider.credential(
        this.originalForm.email,
        this.passwordConfirm.value
      )

      await user.reauthenticateWithCredential(credential)
    })
  }

  setVuexUser(user: any) {
    const { uid, email, emailVerified } = user

    // Set vuex user
    this.$store.dispatch('user/onAuthStateChangedAction', {
      authUser: {
        uid,
        email,
        emailVerified,
        displayName: this.form.displayName,
      },
    })
  }

  async openPasswordConfirm() {
    const valid = await this.settingsObserver.validate()

    if (valid) {
      this.passwordConfirm.openDialog = true
    }
  }

  triggerAuthMethod(user: any, { value, method }: any) {
    return this.checkCanCall(value, user[method](value)) ?? Promise.resolve()
  }

  checkCanCall(condition: boolean, method: () => null) {
    if (condition) method()

    return false
  }

  resetPasswordConfirm() {
    this.passwordConfirm = { value: '', openDialog: false }
    this.confirmObserver.reset()
  }

  async submit() {
    // Set the card loading
    this.loading = true

    const valid = await this.confirmObserver.validate()

    if (valid) {
      delete (this.form as any).passwordRepeat

      // Get document ref base in actual user
      const docRef = this.$fire.firestore
        .collection('users')
        .doc(this.form.uuid)

      // Get firebase current logged user
      const user = this.$fire.auth.currentUser

      await Promise.all([
        // Update email and password
        this.updateAuth(user, [
          {
            value:
              this.form.email !== this.originalForm.email
                ? this.form.email
                : null,
            method: 'updateEmail',
          },
          {
            value: this.form.password,
            method: 'updatePassword',
          },
        ]),
        // Update profile
        user.updateProfile({
          displayName: this.form.displayName,
          email: this.form.email,
        }),
        // Update document
        docRef.update({
          ...this.form,
          password:
            this.form.password !== ''
              ? this.form.password
              : this.passwordConfirm.value,
        }),
        // Reload form
        this.loadForm(),
      ]).then(() => {
        this.setVuexUser(this.$fire.auth.currentUser)

        this.resetPasswordConfirm()

        this.alert = {
          text: 'Perfil atualizado com sucesso.',
          open: true,
        }

        if (this.form.email !== this.originalForm.email) {
          user
            .sendEmailVerification({
              url: window.document.location.origin,
            })
            .then(() => this.$router.replace('/verify-email'))
        }
      })
    }
    this.loading = false
  }
}
</script>
