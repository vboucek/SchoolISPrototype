import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UserSubjectsDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  semesterId: number;
}
