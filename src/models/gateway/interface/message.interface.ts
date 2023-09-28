export interface MessageInterface {
  message: string
  conversation_id: string
  user_id: string
  createdAt: Date | string | null
  updatedAt: Date | string | null
  user: any
}