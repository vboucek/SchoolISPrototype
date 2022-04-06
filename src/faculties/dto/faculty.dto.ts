import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class FacultyDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    logoPath: string
}
