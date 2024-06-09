import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID, IsUrl } from "class-validator";

export class CreateAlbumDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    artistId: string

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    releaseDate: string

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    coverPhoto: string
}
