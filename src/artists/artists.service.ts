import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import DB from '../DB/DB';
import { ArtistDto } from './types/artist.dto';
import { Artist } from './types/artist.shema';

@Injectable()
export class ArtistsService {
    constructor(private database: DB) {}

    async getAll(): Promise<Artist[]> {
       return this.database.artists;
    }

    async getArtist(id): Promise<Artist> {

        const artist = this.database.getOneArtist(id)
        
        if (!artist) {
            throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
        }

        return artist;
    }

    async createArtists( artistsDto: ArtistDto ): Promise<Artist> { 
        return this.database.setArtists(artistsDto);
    }

    async updateArtist(id: string, updatedArtistDto: ArtistDto): Promise<Artist> {

        const artist = this.database.getOneArtist(id);
        if (!artist) {
          throw new HttpException("artist doesn't exist", HttpStatus.NOT_FOUND);
        }
    
    
        if (artist.id === id) {
          artist.name = updatedArtistDto.name;
          artist.grammy = updatedArtistDto.grammy;
        } 
    
        this.database.udateArtist(artist);
        return artist;
    }

    async deleteArtist(id: string) {
        const deleted = this.database.deleteArtist(id);
        if (!deleted) {
            throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
        }
    }

}
