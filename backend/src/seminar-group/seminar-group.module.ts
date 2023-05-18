import { Module } from '@nestjs/common';
import { SeminarGroupService } from './seminar-group.service';
import { SeminarGroupController } from './seminar-group.controller';

@Module({
  controllers: [SeminarGroupController],
  providers: [SeminarGroupService],
})
export class SeminarGroupModule {}
