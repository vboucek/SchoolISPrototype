import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { FacultiesModule } from './faculties/faculties.module';
import { SemesterModule } from './semester/semester.module';
import { CourseModule } from './course/course.module';
import { SeminarGroupModule } from './seminar-group/seminar-group.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    FacultiesModule,
    SemesterModule,
    CourseModule,
    SeminarGroupModule,
  ],
})
export class AppModule {}
