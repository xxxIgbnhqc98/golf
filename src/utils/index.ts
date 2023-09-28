import * as bcrypt from 'bcrypt'
import config from '@config'

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, config.server.salt_or_round)
}
