<template>
  <v-row class="forms-main">
    <!-- Col 1 -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6">
      <!-- Basic info, Login -->
      <div class="mb-6">
        <h3 class="d-flex align-center mb-2">
          <v-icon class="mr-2">mdi-card-account-details</v-icon> Informações
          básicas
        </h3>
        <v-divider />
      </div>
      <div
        :class="['gap-between', { 'gap-between-skeleton': skeletonLoading }]"
      >
        <FormsBasicInfo
          v-model="form"
          v-bind="{ loading, skeletonLoading }"
          @enter="$emit('enter')"
        />
        <FormsLogin
          v-model="form"
          v-bind="{
            loading,
            filterLoginFields,
            config: normalizedLoginConfig,
            skeletonLoading,
          }"
          @enter="$emit('enter')"
        />
      </div>
    </v-col>

    <!-- Col 2 -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6">
      <!-- Address -->
      <div class="mb-6">
        <h3 class="d-flex align-center mb-2">
          <v-icon class="mr-2">mdi-home-map-marker</v-icon>Endereço
        </h3>
        <v-divider />
      </div>
      <FormsAddress
        v-model="form.address"
        :loading="loading"
        :skeleton-loading="skeletonLoading"
        @enter="$emit('enter')"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { Field } from '~/mixins/formBaseMixin'
import FormMixin from '~/mixins/formMixin'

@Component
export default class FormsMain extends FormMixin {
  @Prop({ type: Function, default: () => true })
  filterLoginFields!: (item: Field) => boolean

  @Prop({ type: Object, default: () => null })
  loginConfig!: Record<string, Partial<Field>> | null

  normalizedLoginConfig: any = {}

  removeIconsLoginConfig: Record<string, Partial<Field>> = {
    email: {
      prependIcon: null as any,
    },
    password: {
      prependIcon: null as any,
    },
  }

  @Watch('loginConfig', { deep: true })
  onLoginConfigChange(value: Record<string, Partial<Field>>) {
    for (const v in this.removeIconsLoginConfig) {
      if (v in value) {
        Object.assign(value[v], this.removeIconsLoginConfig[v])
      } else {
        this.$set(value, v, this.removeIconsLoginConfig[v])
      }
    }

    this.normalizedLoginConfig = value
  }

  created() {
    this.onLoginConfigChange(this.loginConfig ?? {})
  }
}
</script>
<style lang="scss">
.forms-main {
  .gap {
    &-between {
      display: flex;
      flex-direction: column;
      gap: 1em !important;
      &-skeleton {
        gap: 2.885em !important;
      }
    }
  }
}
</style>
