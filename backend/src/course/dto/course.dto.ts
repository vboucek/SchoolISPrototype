import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { Day, EndType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(EndType)
  endType: EndType;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  credits: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startSign: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endSign: Date;

  @IsNotEmpty()
  @IsEnum(Day)
  lectureDay: Day;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  lectureStartTimeMin: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  lectureDurationMin: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  semesterId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  facultyId: number;
}
