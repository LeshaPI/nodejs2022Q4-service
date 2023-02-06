import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import DB from '../DB/DB';
import { albumDto } from './types/album.dto';
import { Album } from './types/album.shema';

@Injectable()
export class AlbumsService {
    constructor(private database: DB) {}

    async getAll(): Promise<Album[]> {
        return this.database.albums;
    }

    async getAlbum(id: string): Promise<Album> {

        const album = this.database.getOneAlbum(id)
        
        if (!album) {
            throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
        }

        return album;
    }

    async createAlbum( albumDto: albumDto): Promise< Album > {
        return this.database.setAlbum( albumDto );
    }

    async updateAlbum(id: string, updatedAlbumDto: albumDto): Promise<Album> {

        const album = this.database.getOneAlbum(id);
        if (!album) {
          throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
        }
        
        if (album.id === id) {
            album.name = updatedAlbumDto.name;
            album.year = updatedAlbumDto.year;
            album.artistId = updatedAlbumDto.artistId;
        } 
    
        this.database.udateAlbum(album);
        return album;
    }

    async deleteAlbum(id: string) {
        const deleted = this.database.deleteAlbum(id);
        if (!deleted) {
            throw new HttpException("album doesn't exist", HttpStatus.NOT_FOUND);
        }
    }

}
