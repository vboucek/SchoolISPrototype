import { UserRole } from "@prisma/client";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty()
  roles: UserRole[];

  @IsInt()
  @IsNotEmpty()
  facultyId: number;

  @IsInt()
  @IsNotEmpty()
  semesterId: number;
}