import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseFilterDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  creditsMin: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  creditsMax: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  semesterId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  facultyId: number;
}
