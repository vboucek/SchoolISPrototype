import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserTimetableFilterDto {
  @IsNotEmpty()
  @IsNumber()
  semesterId: number;
}
