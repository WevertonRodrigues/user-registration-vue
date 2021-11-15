import { ValidationRule } from 'vee-validate/dist/types/types'

export const passwordStrength: ValidationRule = {
  message() {
    return 'Sua senha deve conter pelo menos um caractere, um número e um dos caracteres especiais @!#$%'
  },
  validate(value) {
    const regexStrength = /^(?=.*[\w])(?=.*[\d])(?=.*[@!#$])/gm
    return regexStrength.test(value)
  },
}
