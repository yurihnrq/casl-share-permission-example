import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/shared/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET ?? 'secret';

  constructor(private readonly prisma: PrismaService) {}

  async generateToken(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isSamePassword = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!isSamePassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(authDto, this.secret);

    return {
      token,
    };
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secret) as User;
  }
}
