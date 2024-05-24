import { IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    newPassword: string
}