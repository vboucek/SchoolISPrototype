import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SessionSerializer } from "./serializer";
import { LocalStrategy } from "./strategy/local.strategy";


@Module({
    imports: [PassportModule.register({session: true})],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}