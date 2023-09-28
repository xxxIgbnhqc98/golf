import { UserRole } from '@constants'
export interface AuthPayload {
  id: string
  role: UserRole
}
