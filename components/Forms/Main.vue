<template>
  <v-row class="forms-main">
    <!-- Col 1 -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6">
      <!-- Basic info, Login -->
      <div class="mb-6">
        <h3 class="mb-2">Informações básicas</h3>
        <v-divider />
      </div>
      <FormsBasicInfo
        v-model="form"
        :loading="loading"
        @enter="$emit('enter')"
      />
      <FormsLogin
        v-model="form"
        :loading="loading"
        :filter-fields="filterLoginFields"
        :config="loginConfig"
        @enter="$emit('enter')"
      />
    </v-col>

    <!-- Col 2 -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6">
      <!-- Address -->
      <div class="mb-6">
        <h3 class="mb-2">Endereço</h3>
        <v-divider />
      </div>
      <FormsAddress
        v-model="form.address"
        :loading="loading"
        @enter="$emit('enter')"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsMain extends FormMixin {
  @Prop({ type: Function, default: () => true })
  filterLoginFields!: (item: Field) => boolean

  @Prop({ type: Object, default: () => null })
  loginConfig!: Record<string, Partial<Field>> | null
}
</script>
