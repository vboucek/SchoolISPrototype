import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../user/dto';

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

  public async getUserDto(email: string) {
    const user = await this.prismaServ.user.findFirst({
      where: {
        email: email,
        deletedAt: null
      },
    });

    if (!user) {
      return new NotFoundException('User not found');
    }

    return plainToInstance<UserDto, User>(
      UserDto,
      { ...user },
      { excludeExtraneousValues: true },
    );
  }
}
