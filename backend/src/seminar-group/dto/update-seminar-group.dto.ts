import { PartialType } from '@nestjs/mapped-types';
import { CreateSeminarGroupDto } from './create-seminar-group.dto';

export class UpdateSeminarGroupDto extends PartialType(CreateSeminarGroupDto) {}
