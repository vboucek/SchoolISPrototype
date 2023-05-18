import { IsOptional, IsString } from 'class-validator';

export class TutorFilterDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
