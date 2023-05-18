import { IsNotEmpty, IsNumber } from 'class-validator';

export class SeminarGroupRemoveStudentDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
