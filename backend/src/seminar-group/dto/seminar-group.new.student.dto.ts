import { IsNotEmpty, IsNumber } from 'class-validator';

export class SeminarGroupNewStudentDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
