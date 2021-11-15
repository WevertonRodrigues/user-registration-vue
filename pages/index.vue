<template>
  <v-container class="d-flex text-center flex-column justify-center" fluid>
    Esta é a página inicial do perfil:
    <span>
      - Nome: <strong>{{ user.displayName }}</strong>
    </span>
    <span>
      - E-mail: <strong>{{ user.email }}</strong>
    </span>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  middleware: ['verify-email'],
})
export default class IndexPage extends Vue {
  get user() {
    return this.$store.state.user.user
  }

  mounted() {
    // const db = this.$fire.firestore
    /* db.collection('cities')
      .add({ name: 'Tokyo', country: 'Japan' })
      .then((docRef: any) => {
        console.log('Document written with ID: ', docRef)
        // docRef.update({ id: docRef.id })
      })
      .catch((error: any) => {
        console.error('Error adding document: ', error)
      }) */
    /* db.collection('cities')
      .get()
      .then((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(data)
      }) */
  }
}
</script>
