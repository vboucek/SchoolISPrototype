import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { SemesterModule } from './semester/semester.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, SemesterModule],
})
export class AppModule {}
