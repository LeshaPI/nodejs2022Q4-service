import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf} from "class-validator";


export class albumDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    year: number;
    @ValidateIf((a) => a.artistId !== null)
    @IsNotEmpty()
    @IsUUID()
    artistId: string | null; // refers to Artist
}