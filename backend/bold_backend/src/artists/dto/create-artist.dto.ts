import { Prisma, PrismaClient } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateArtistDto extends PrismaClient {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    bio: string
}
