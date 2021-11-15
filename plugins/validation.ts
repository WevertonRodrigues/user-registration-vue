import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
  extend,
  localize,
} from 'vee-validate'

import ptBR from 'vee-validate/dist/locale/pt_BR.json'
import * as rules from 'vee-validate/dist/rules'
import * as customRules from '@/customRules'

localize('pt', ptBR)

setInteractionMode('eager')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}

// Custom rules
for (const [rule, validation] of Object.entries(customRules)) {
  extend(rule, {
    ...validation,
  })
}
