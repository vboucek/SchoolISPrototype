import { IsOptional, IsString } from 'class-validator';

export class TeacherFilterDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
