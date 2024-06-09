import { ApiProperty } from "@nestjs/swagger";
import { PrismaClient } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString, IsUUID, IsUrl } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    artistId: string

    @IsUUID()
    @ApiProperty()
    albumId?: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    genre: string

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    duration: number

    @IsString()
    @IsUrl()
    @ApiProperty()
    coverImage: string

    @IsString()
    @IsUrl()
    @ApiProperty()
    fileUrl: string

}
