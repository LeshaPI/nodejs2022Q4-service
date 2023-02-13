import { IsNotEmpty, IsString, IsBoolean } from "class-validator";


export class ArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}