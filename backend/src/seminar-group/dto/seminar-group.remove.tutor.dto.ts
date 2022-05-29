import { IsNotEmpty, IsNumber } from 'class-validator';

export class SeminarGroupRemoveTutorDto {
  @IsNotEmpty()
  @IsNumber()
  tutorId: number;
}
