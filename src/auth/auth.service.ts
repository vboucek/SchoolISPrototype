import { Injectable, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";

import { AuthDto } from "./dto";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
    constructor(private prismaServ: PrismaService, private config: ConfigService) { }

    public async signup(dto: SignUpDto) {
        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prismaServ.user.create({
                data: {
                    email: dto.email,
                    passwdHash: hash,

                    firstName: dto.firstName,
                    lastName: dto.lastName,

                    roles: [UserRole.user]
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    public async validateUser(dto: AuthDto) {
        const user = await this.prismaServ.user.findFirst({
            where: {
                email: dto.email,
                deletedAt: null
            }
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