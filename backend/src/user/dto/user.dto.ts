import { UserRole } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @Expose()
  @IsNotEmpty()
  id: number

  @IsString()
  @Expose()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @Expose()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @Expose()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty()
  roles: UserRole[];

  @IsInt()
  @Expose()
  @IsNotEmpty()
  facultyId: number;

  @IsInt()
  @Expose()
  @IsNotEmpty()
  semesterId: number;
}
