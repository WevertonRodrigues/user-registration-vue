import { Address } from './address'

export interface User {
  uuid: string
  displayName: string
  password: string
  email: string
  cpf: string
  pis: string
  address: Address
}
