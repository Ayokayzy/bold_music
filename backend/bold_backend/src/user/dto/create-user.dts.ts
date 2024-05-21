import { Prisma, PrismaClient } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator"

export class CreateUserDto extends PrismaClient {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string
}