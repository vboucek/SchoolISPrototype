import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseSignupDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  courseId: number;
}
