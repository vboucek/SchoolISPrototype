import { IsNotEmpty, IsString } from 'class-validator';

export class FacultyCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
