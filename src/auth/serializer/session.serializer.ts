import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { DummyUser } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private prismaService: PrismaService) {
        super();
    }

    serializeUser(user: DummyUser, done: Function) {
        done(null, { id: user.id });
    }
    async deserializeUser(payload: {id : number}, done: Function) {
        const user = await this.prismaService.dummyUser.findFirst({
            where:{
                id: payload.id
            }
        });

        console.log("Deserialiser");

        done(null, user);
    }
}