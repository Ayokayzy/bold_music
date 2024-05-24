import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
}