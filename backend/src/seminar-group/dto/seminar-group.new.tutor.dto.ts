import { IsNotEmpty, IsNumber } from 'class-validator';

export class SeminarGroupNewTutorDto {
  @IsNotEmpty()
  @IsNumber()
  tutorId: number;
}
