import { IsNotEmpty, IsNumber } from 'class-validator';

export class SeminarGroupSignUpDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
