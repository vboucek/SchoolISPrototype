import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Day } from '@prisma/client';

export class SeminarGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @IsNotEmpty()
  @IsEnum(Day)
  seminarGroupDay: Day;

  @IsNotEmpty()
  @IsNumber()
  seminarGroupDurationStartTimeMins: number;

  @IsNotEmpty()
  @IsNumber()
  seminarGroupDurationMins: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
