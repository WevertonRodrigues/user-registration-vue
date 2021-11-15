<template>
  <v-app dark>
    <v-main>
      <Nuxt />
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
    width: 100%;
  }
}
</style>
