import { Address } from './address'

export interface User {
  displayName: string
  password: string
  email: string
  cpf: string
  pis: string
  address: Address
}
