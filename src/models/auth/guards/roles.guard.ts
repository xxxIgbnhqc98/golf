import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRole } from '@constants'
import { AuthPayload, AuthenticationGuard } from '@models/auth'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requireRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])
    if (!requireRoles) {
      return true
    }
    const user: AuthPayload = context.switchToHttp().getRequest().user
    return requireRoles.some((role) => user?.role === role)
  }
}
