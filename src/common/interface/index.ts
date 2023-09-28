import { Request } from '@nestjs/common'

import { AuthPayload } from '@models/auth'

export interface AuthRequest extends Request {
  user: AuthPayload
}
