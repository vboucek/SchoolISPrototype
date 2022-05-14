import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaServ: PrismaService,
    private config: ConfigService,
  ) {}

  public async validateUser(dto: AuthDto) {
    const user = await this.prismaServ.user.findFirst({
      where: {
        email: dto.email,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    const pwMatches = await argon.verify(user.passwdHash, dto.password);

    if (!pwMatches) {
      return null;
    }

    delete user.passwdHash;
    return user;
  }
}
