import { ValidationRule } from 'vee-validate/dist/types/types'

export const confirmed: ValidationRule = {
  message: (field: string, params: Record<string, any>) =>
    `O valor do campo ${field} deve ser valor igual a ${params.target}`,
}
