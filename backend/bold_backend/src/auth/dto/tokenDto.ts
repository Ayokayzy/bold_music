import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    token: string
}