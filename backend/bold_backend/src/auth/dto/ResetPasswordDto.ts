import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty()
    newPassword: string
}