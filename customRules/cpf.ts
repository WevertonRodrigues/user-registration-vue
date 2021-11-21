import { ValidationRule } from 'vee-validate/dist/types/types'
import { isValid as isValidCpf } from '@fnando/cpf'

export const cpf: ValidationRule = {
  validate(value: string) {
    return isValidCpf(value)
  },
  message: 'O campo {_field_} possui um valor inválido.',
}
