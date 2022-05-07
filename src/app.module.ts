import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { FacultiesModule } from './faculties/faculties.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, FacultiesModule],
})
export class AppModule {}
