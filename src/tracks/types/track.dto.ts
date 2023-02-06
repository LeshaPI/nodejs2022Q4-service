import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf} from "class-validator";


export class createTrackDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @ValidateIf((a) => a.artistId !== null)
    @IsUUID()
    @IsNotEmpty()
    artistId: string | null; // refers to Artist
    @ValidateIf((a) => a.albumId !== null)
    @IsUUID()
    @IsNotEmpty()
    albumId: string | null; // refers to Album
    @IsNotEmpty()
    @IsNumber()
    duration: number; // integer number
}