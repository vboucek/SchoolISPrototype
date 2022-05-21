import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseNewTeacherDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  teacherId: number;

  @IsNotEmpty()
  @Type(() => Boolean)
  isHelper: boolean;

  @IsNotEmpty()
  @Type(() => Boolean)
  isLecturer: boolean;
}
