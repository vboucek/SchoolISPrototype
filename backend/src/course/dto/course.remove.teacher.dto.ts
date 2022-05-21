import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseRemoveTeacherDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  teacherId: number;
}
