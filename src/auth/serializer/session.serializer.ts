import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private prismaService: PrismaService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, { id: user.id });
    }

    async deserializeUser(payload: { id: number }, done: Function) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: payload.id
            }
        });
        done(null, user);
    }
}