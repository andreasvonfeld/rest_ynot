import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'YN0T_SUPER_SECRET', // pareil que dans JwtModule
    });
  }

  async validate(payload: any) {
    // Ce qui sera injecté dans req.user
    return { userId: payload.sub, email: payload.email };
  }
}
