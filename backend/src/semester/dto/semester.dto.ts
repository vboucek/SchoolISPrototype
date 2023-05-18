import { SemesterType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class SemesterDto {
  @IsInt()
  @Expose()
  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  @Expose()
  @IsEnum(SemesterType)
  semesterType: SemesterType;

  @IsNumber()
  @Expose()
  id: number;
}
