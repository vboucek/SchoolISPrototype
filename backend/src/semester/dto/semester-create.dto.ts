import { SemesterType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class SemesterCreateDto {
  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  @IsEnum(SemesterType)
  semesterType: SemesterType;
}
