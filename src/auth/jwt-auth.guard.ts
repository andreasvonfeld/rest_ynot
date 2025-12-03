import { AuthGuard, } from '@nestjs/passport';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log('JwtAuthGuard - Authorization header =', req.headers.authorization);
    return super.canActivate(context);
  }
}