import { ApiProperty } from "@nestjs/swagger"
import { Prisma, PrismaClient } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator"

export class CreateUserDto extends PrismaClient {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string
}