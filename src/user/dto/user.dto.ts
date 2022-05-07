import { UserRole } from "@prisma/client"
import { Exclude, Expose } from "class-transformer";
import { IsOptional, IsArray, ArrayMinSize, ArrayMaxSize, IsEnum, IsEmail, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    @Expose()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @Expose()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsEmail()
    @Expose()
    @IsNotEmpty()
    email: string

    @IsString()
    @Expose()
    @IsNotEmpty()
    password: string

    @IsArray()
    @Expose()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @IsEnum(UserRole, { each: true })
    @IsNotEmpty()
    roles: UserRole[]

    @IsInt()
    @Expose()
    @IsOptional()
    facultyId: number

    @IsInt()
    @Expose()
    @IsOptional()
    semesterId: number
}