import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserSubjectsFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  semesterId: number;
}
