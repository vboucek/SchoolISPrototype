import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Day } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SeminarGroupPreviewDto {
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsEnum(Day)
  @IsNotEmpty()
  @Expose()
  seminarGroupDay: Day;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  seminarGroupDurationStartTimeMins: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  room: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  tutors: string[];
}
