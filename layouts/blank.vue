<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col md="10" lg="8" xl="8">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BlankLayout extends Vue {}
</script>

<style lang="scss">
.v-main {
  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
