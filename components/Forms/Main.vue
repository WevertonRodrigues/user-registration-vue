<template>
  <v-container>
    <v-row>
      <!-- Col 1 -->
      <v-col>
        <div>
          <!-- Basic info, Login -->
          <div class="mx-2 mb-6">
            <h3 class="mb-2">Informações básicas</h3>
            <v-divider />
          </div>
          <FormsBasicInfo v-model="form" :loading="loading" />
          <FormsLogin
            v-model="form"
            :loading="loading"
            :filter-fields="filterLoginFields"
            :config="loginConfig"
          />
        </div>
      </v-col>

      <!-- Col 2 -->
      <v-col>
        <!-- Address -->
        <div class="mx-2 mb-6">
          <h3 class="mb-2">Endereço</h3>
          <v-divider />
        </div>
        <FormsAddress v-model="form.address" :loading="loading" />
      </v-col>
    </v-row>
  </v-container>
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
