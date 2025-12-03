import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Identifiants invalides');
  }

  try {
    const isValid = await bcrypt.compare(password, user.mdp);
    if (!isValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }
  } catch (e) {
    // Cas où user.mdp n'est PAS un hash bcrypt valide
    throw new UnauthorizedException('Identifiants invalides');
  }

  const payload = {
    sub: user.id,
    email: user.email,
    pseudo: user.pseudo,
    role: user.role,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
